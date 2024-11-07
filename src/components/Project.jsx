import { Button, Card, Fade, FormControl, InputLabel, MenuItem, Paper, Popper, Select, sliderClasses, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import CustomBox from "./CustomBox";

function Project(req) {

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");
    const pid = pathSegments[pathSegments.length - 1]; 
    const [projectData, setProjectData] = useState({});
    const [projectEquipments, setProjectEquipments] = useState([]);
    const [projectVisitors, setProjectVisitors] = useState([]);
    const [projectAdmins, setProjectAdmins] = useState([]);
    const [projectWorkers, setProjectWorkers] = useState([]);
    const [projectMaterials, setProjectMaterials] = useState([]);

    useEffect(() => {
        function callback2(data) {
            setProjectEquipments(data.equipment);
            setProjectVisitors(data.visitors);
            setProjectMaterials(data.materials);
            setProjectWorkers(data.workers);
            setProjectData(data.project);
            // setProjectAdmins(data.admins);
            console.log(data.project);
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:8080/auth/admin/project/details/" + pid, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);
    return <div>
    <div>
        <Typography textAlign={"center"} variant="h2">{projectData.name}</Typography>
        </div>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {/* <ProjectAdmins projectData = {projectAdmins}/> */}
        <ProjectWorkers projectWorkers = {projectWorkers} setProjectWorkers = {setProjectWorkers} pid = {pid}/>
        <ProjectMaterials projectMaterials = {projectMaterials} setProjectMaterials = {setProjectMaterials} pid = {pid}/>
        <ProjectEquipments projectEquipments = {projectEquipments} setProjectEquipments = {setProjectEquipments} pid = {pid}/>
        <ProjectVisitors projectVisitors = {projectVisitors} setProjectVisitors = {setProjectVisitors} pid = {pid}/>
    </div>
    </div>
}

export function ProjectAdmins({projectAdmins}) {
    return <Card style={{
        margin: 10,
        width: 500,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">Admins</Typography>
    </Card>
}


export function ProjectWorkers({projectWorkers, setProjectWorkers, pid}) {
    const [workers, setWorkers] = useState([]);
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
    
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
    
        fetch("http://localhost:8080/auth/admin/workers", requestOptions)
          .then((response) => response.json()) 
          .then((result) => {
            setWorkers(result);
          })
          .catch((error) => console.error(error));
      }, []);

      
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);

    let wid = -1;

    return <Card style={{
        margin: 10,
        width: 500,
        minHeight: 200,
        padding: 20
    }}>
        <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={"right-start"}
                transition
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:4, margin: 1}}>
                    <CustomBox>
                    <Typography fontFamily='Roboto Mono' variant="h6" sx={{ p: 2 }}>Add Worker</Typography>
                    </CustomBox>
                    <FormControl sx = {{width:400}}>
                        <InputLabel id="demo-simple-select-label" >Select Worker</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Worker"
                        onChange={(e) => {
                            wid = e.target.value;
                        }}
                        >
                        {workers.map((worker) => (
                        <MenuItem key={worker.id} value={worker.id}>
                            {worker.firstName + " " + worker.lastName}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <div style = {{display: "flex",
                        justifyContent: "center",
                        }} >
                            <Button color="codGray" variant="contained" sx = {{m:2}} onClick={() => {
                                const myHeaders = new Headers();
                                myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                                myHeaders.append("Content-Type", "application/json");
                                
                               const raw = JSON.stringify({
                                 "projectId": pid,
                                 "workerId": wid
                               });
                               
                               const requestOptions = {
                                 method: "POST",
                                 headers: myHeaders,
                                 body: raw,
                                 redirect: "follow"
                               };
                               
                               fetch("http://localhost:8080/auth/admin/addprojectworker", requestOptions)
                                 .then((response) => response.json())
                                 .then((result) => {
                                    let workerObject = {};
                                    for (let i = 0; i < workers.length; i++){
                                        if(workers[i].id == wid){
                                            workerObject = workers[i];
                                        }
                                    }
                                    console.log(workerObject);
                                    setProjectWorkers([...projectWorkers,workerObject ])
                                    console.log(result.projectId);
                                 })
                                 .catch((error) => console.error(error));
                            }}>Add</Button>
                        </div>
                    </Paper>
                </Fade>
                )}
            </Popper>
        <Typography textAlign={"center"} variant="h5">Workers</Typography>
        <div style = {{marginBottom:20}}>
        {projectWorkers && projectWorkers && projectWorkers.length > 0 ? (
                    projectWorkers.map((obj, index) => (
                        <Typography textAlign={"center"} sx={{ fontFamily: "Roboto Mono" }}>{obj.firstName + " "}{obj.lastName}</Typography>
                    ))
                ) : (
                    <Typography textAlign={"center"} variant="h6"  sx={{ fontFamily: "Roboto Mono" }}>No workers added</Typography>
                    )}
        
        </div>
        <div style = {{display: "flex",
            justifyContent: "space-between",
            }} >
                <Button color="codGray" variant="contained" onClick={() => {
                    navigate("/workerhome")
                }}>View Details</Button>
                <Button color="codGray" variant="contained" onClick={handleClick}
                >Add Worker</Button>
            </div>
    </Card>
}



export function ProjectMaterials({projectMaterials, setProjectMaterials, pid}) {
    const [materials, setMaterials] = useState([]);
    const [mid, setMid] = useState(-1);
    const [isClick, setIsClick] = useState(false);
    const [materialQuantity, setMaterialQuantity] = useState(1);
    console.log(projectMaterials);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
    
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
    
        fetch("http://localhost:8080/auth/admin/material", requestOptions)
          .then((response) => response.json()) 
          .then((result) => {
            setMaterials(result);
          })
          .catch((error) => console.error(error));
      }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const materialsMap = materials.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});

    function addMaterial(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
            "projectId": pid,
            "materialReq": mid,
            "quantityReq" : materialQuantity,
        });
        
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/addprojectmaterialrequired", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsClick(false);
                const newMaterial = {
                    "material": materialsMap[mid].name, // Correctly retrieve the name
                    "quantity" : materialQuantity
                };
    
                setProjectMaterials(prevMaterials => [...prevMaterials, newMaterial]);
    
                // Clear the fields
                setMid(-1);
                setMaterialQuantity(1);
            })
            .catch((error) => console.error(error));
    }

    return <Card style={{
        margin: 10,
        width: 500,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">Materials</Typography>
        <Table sx={{ minWidth: 650}} aria-label="simple table" >
                <TableHead>
                    <TableRow >
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Name</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Quantity</TableCell>                   
                    </TableRow>
                </TableHead>
                <TableBody>
                {projectMaterials && projectMaterials && projectMaterials.length > 0 && (
                    projectMaterials.map((obj, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ fontFamily: "Roboto Mono" }}>
                                {obj.material}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Roboto Mono" }}>
                                {obj.quantity}
                            </TableCell>
                        </TableRow>
                    ))
                )}

                </TableBody>
            </Table>
            <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={"right-start"}
                transition
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:4, margin: 1}}>
                    <CustomBox>
                    <Typography fontFamily='Roboto Mono' variant="h6" sx={{ p: 2 }}>Add Materials</Typography>
                    </CustomBox>
                    {!isClick ? (
                        <FormControl sx={{ width: 400 }}>
                            <InputLabel id="demo-simple-select-label">Select Materials</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Materials"
                                onChange={(e) => {
                                    setIsClick(true);
                                    setMid(e.target.value)
                                }}
                            >
                                {materials.map((material) => (
                                    <MenuItem key={material.id} value={material.id}>
                                        {material.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ): (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                                    {materialsMap[mid].name}
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button color="codGray" sx={{ fontSize: '2rem', p: 0.5 }} type="contained" onClick={() => setMaterialQuantity(materialQuantity - 1)} disabled={materialQuantity <= 1}>-</Button>
                                    <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>{materialQuantity}</Typography>
                                    <Button color="codGray" disabled={materialQuantity >= materialsMap[mid].quantity} sx={{ fontSize: '1.5rem', p: 0.5 }} type="contained" onClick={() => setMaterialQuantity(materialQuantity + 1)}>+</Button>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                <Button color="codGray" variant="contained" onClick={addMaterial}>Add</Button>
                            </div>
                        </div>
                    )}
                    </Paper>
                </Fade>
                )}
            </Popper>
            <div align="center">
                <Button color="codGray" variant="contained" onClick={handleClick}>Add Materials</Button>
            </div>
    </Card>
}
export function ProjectEquipments({projectEquipments, setProjectEquipments, pid}) {
    const [equipments, setEquipments] = useState([]);
    const [eid, setEid] = useState(-1);
    const [isClick, setIsClick] = useState(false);
    const [equipQuantity, setEquipQuantity] = useState(1);

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
    
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
    
        fetch("http://localhost:8080/auth/admin/equipment", requestOptions)
          .then((response) => response.json()) 
          .then((result) => {
            setEquipments(result);
          })
          .catch((error) => console.error(error));
      }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const equipmentsMap = equipments.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});

    console.log(projectEquipments);

    function addEquipment(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
            "projectId": pid,
            "equipId": eid,
            "quantityRequired" : equipQuantity,
            "durationReq" : 1
        });
        
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/addprojectequiprequired", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsClick(false);
                const newEquipment = {
                    "equipment": equipmentsMap[eid].name,
                    "quantity" : equipQuantity
                };
    
                setProjectEquipments(prevEquipments => [...prevEquipments, newEquipment]);
                    setEid(-1);
                setEquipQuantity(1);
            })
            .catch((error) => console.error(error));
    }

    return <Card style={{
        margin: 10,
        width: 500,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">Equipments</Typography>
        <Table sx={{ minWidth: 650}} aria-label="simple table" >
                <TableHead>
                    <TableRow >
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Name</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Quantity</TableCell>                   
                    </TableRow>
                </TableHead>
                <TableBody>
                {projectEquipments && projectEquipments && projectEquipments.length > 0 && (
                    projectEquipments.map((obj, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ fontFamily: "Roboto Mono" }}>
                                {obj.equipment?obj.equipment:""}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Roboto Mono" }}>
                                {obj.quantity}
                            </TableCell>
                        </TableRow>
                    ))
                )}

                </TableBody>
            </Table>
            <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={"right-start"}
                transition
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:4, margin: 1}}>
                    <CustomBox>
                    <Typography fontFamily='Roboto Mono' variant="h6" sx={{ p: 2 }}>Add Equipments</Typography>
                    </CustomBox>
                    {!isClick ? (
                        <FormControl sx={{ width: 400 }}>
                            <InputLabel id="demo-simple-select-label">Select Equipments</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Equipments"
                                onChange={(e) => {
                                    setIsClick(true);
                                    setEid(e.target.value)
                                }}
                            >
                                {equipments.map((equipment) => (
                                    <MenuItem key={equipment.id} value={equipment.id}>
                                        {equipment.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ): (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
                                    {equipmentsMap[eid].name}
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Button color="codGray" sx={{ fontSize: '2rem', p: 0.5 }} type="contained" onClick={() => setEquipQuantity(equipQuantity - 1)} disabled={equipQuantity <= 1}>-</Button>
                                    <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>{equipQuantity}</Typography>
                                    <Button color="codGray" disabled={equipQuantity >= equipmentsMap[eid].quantity} sx={{ fontSize: '1.5rem', p: 0.5 }} type="contained" onClick={() => setEquipQuantity(equipQuantity + 1)}>+</Button>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                <Button color="codGray" variant="contained" onClick={addEquipment}>Add</Button>
                            </div>
                        </div>
                    )}
                    </Paper>
                </Fade>
                )}
            </Popper>
            <div align="center">
                <Button color="codGray" variant="contained" onClick={handleClick}>Add Equipment</Button>
            </div>
    </Card>
}

function ProjectVisitors({projectVisitors, setProjectVisitors, pid}){
    const [visitors, setVisitors] = useState([]);
    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
    
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
    
        fetch("http://localhost:8080/auth/admin/visitors", requestOptions)
          .then((response) => response.json()) 
          .then((result) => {
            setVisitors(result);
          })
          .catch((error) => console.error(error));
      }, []);

      
    const navigate = useNavigate(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);

    let vid = -1;

    return <Card style={{
        margin: 10,
        width: 500,
        minHeight: 200,
        padding: 20
    }}>
        <Popper
                sx={{ zIndex: 1200 }}
                open={open}
                anchorEl={anchorEl}
                placement={"right-start"}
                transition
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:4, margin: 1}}>
                    <CustomBox>
                    <Typography fontFamily='Roboto Mono' variant="h6" sx={{ p: 2 }}>Add Visitor</Typography>
                    </CustomBox>
                    <FormControl sx = {{width:400}}>
                        <InputLabel id="demo-simple-select-label" >Select Visitor</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Visitor"
                        onChange={(e) => {
                            vid = e.target.value;
                        }}
                        >
                        {visitors.map((visitor) => (
                        <MenuItem key={visitor.id} value={visitor.id}>
                            {visitor.firstName + " " + visitor.lastName}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <div style = {{display: "flex",
                        justifyContent: "center",
                        }} >
                            <Button color="codGray" variant="contained" sx = {{m:2}} onClick={() => {
                                const myHeaders = new Headers();
                                myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                                myHeaders.append("Content-Type", "application/json");
                                
                               const raw = JSON.stringify({
                                 "projectId": pid,
                                 "visitorId": vid
                               });
                               
                               const requestOptions = {
                                 method: "POST",
                                 headers: myHeaders,
                                 body: raw,
                                 redirect: "follow"
                               };
                               
                               fetch("http://localhost:8080/auth/admin/addprojectvisitor", requestOptions)
                                 .then((response) => response.json())
                                 .then((result) => {
                                    let visitorObject = {};
                                    for (let i = 0; i < visitors.length; i++){
                                        if(visitors[i].id == vid){
                                            visitorObject = visitors[i];
                                        }
                                    }
                                    setProjectVisitors([...projectVisitors,visitorObject ])
                                 })
                                 .catch((error) => console.error(error));
                            }}>Add</Button>
                        </div>
                    </Paper>
                </Fade>
                )}
            </Popper>
        <Typography textAlign={"center"} variant="h5">Visitors</Typography>
        <div style = {{marginBottom:20}}>
        {projectVisitors && projectVisitors && projectVisitors.length > 0 ? (
                    projectVisitors.map((obj, index) => (
                        <Typography textAlign={"center"} sx={{ fontFamily: "Roboto Mono" }}>{obj.firstName + " "}{obj.lastName}</Typography>
                    ))
                ) : (
                    <Typography textAlign={"center"} variant="h6"  sx={{ fontFamily: "Roboto Mono" }}>No visitors added</Typography>
                    )}
        
        </div>
        <div style = {{display: "flex",
            justifyContent: "space-between",
            }} >
                <Button color="codGray" variant="contained" onClick={() => {
                    // navigate("/workerhome")
                }}>View Details</Button>
                <Button color="codGray" variant="contained" onClick={handleClick}
                >Add Visitor</Button>
            </div>
    </Card>
}

export default Project;
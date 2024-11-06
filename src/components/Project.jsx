import { Button, Card, Fade, FormControl, InputLabel, MenuItem, Paper, Popper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import CustomBox from "./CustomBox";

function Project(req) {

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 1]; 
    const [projectData, setProjectData] = useState([]);
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
            // setProjectAdmins(data.admins);
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:8080/auth/admin/project/details/" + id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {/* <ProjectAdmins projectData = {projectAdmins}/> */}
        <ProjectWorkers projectWorkers = {projectWorkers}/>
        <ProjectMaterials projectMaterials = {projectMaterials}/>
        <ProjectEquipments projectEquipments = {projectEquipments}/>
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
export function ProjectWorkers({projectWorkers}) {
    const [workers, setWorkers] = useState([]);
    const [selworker, setSelWorker] = useState();
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
                        onChange={(e) => setSelWorker(e.target.value)}
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
                                 "projectId": 1,
                                 "workerId": 3
                               });
                               
                               const requestOptions = {
                                 method: "POST",
                                 headers: myHeaders,
                                 body: raw,
                                 redirect: "follow"
                               };
                               
                               fetch("http://localhost:8080/auth/admin/addprojectworker", requestOptions)
                                 .then((response) => response.text())
                                 .then((result) => console.log(result))
                                 .catch((error) => console.error(error));
                            }}>Submit</Button>
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
export function ProjectMaterials({projectMaterials}) {
    return <Card style={{
        margin: 10,
        width: 500,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">Materials</Typography>

    </Card>
}
export function ProjectEquipments({projectEquipments}) {
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
                {projectEquipments && projectEquipments && projectEquipments.length > 0 ? (
                    projectEquipments.map((obj, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ fontFamily: "Roboto Mono" }}>
                                {obj.equipment}
                            </TableCell>
                            <TableCell align="left" sx={{ fontFamily: "Roboto Mono" }}>
                                {obj.quantity}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={2} align="center">No equipment data available</TableCell>
                    </TableRow>
                    )}

                </TableBody>
            </Table>
            <div align="center">
                <Button color="codGray" variant="contained" onClick={() => {
                    console.log("hello")
                }}>Add Equipment</Button>
            </div>
    </Card>
}


export default Project;
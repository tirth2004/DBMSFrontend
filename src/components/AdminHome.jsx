/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CustomBox from "./CustomBox";
import { Container, Popper, Fade, Paper, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


function AdminHome(){

    const [anchorEl, setAnchorEl] = useState(null);
    const [equip, setEquip] = useState([{
        "id": 2,
        "name": "Tirth"
    }, 
    {
        "id": 3,
        "name": "Bhayani"
    }])

    const navigate = useNavigate();
    
    

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");
        

        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));



    }, [])

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/equipment", requestOptions)
          .then((response) => {
            
            return response.json()
          })
          .then((result) => {console.log(result)
            let arr = []
            for(let i = 0; i<result.length; i++){
                arr.push(result[i])
            }
            setEquip(arr)
          })
          .catch((error) => console.error(error));
    }, [])

    return (
        <Container>
            <CustomBox>
            <Typography variant="h5" fontFamily="Roboto Mono" sx={{marginBottom:8}}>Welcome to Admin Panel!</Typography>
            
            
            

            </CustomBox>
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
                    <Typography fontFamily='Roboto Mono' variant="h6" sx={{ p: 2 }}>Equipments</Typography>
                    </CustomBox>
                    {equip.map((obj, index)=>{
                        return <EquipmentCard key={index} obj= {obj}  ></EquipmentCard>
                    })}
                    <AddEquipment setEquip = {setEquip}></AddEquipment> 
                    
                    </Paper>
                </Fade>
                )}
            </Popper>
            <div style={{display:"flex"}} >
            <Button color="codGray" variant="contained" onClick={handleClick} sx={{marginRight:2}}>Equipments</Button>
            <h4>Add your equipments from here</h4>
            </div>
            <br/>
            <div style={{display:"flex"}} >
            <Button color="codGray" variant="contained" onClick={()=>{
                navigate("./clients")
            }} sx={{marginRight:2, paddingRight:4, paddingLeft:4}}>Clients</Button>
            <h4>Add your clients from here</h4>
            </div>
        </Container>
        
    );
}

function EquipmentCard(props){
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return <div>
    <Button sx={{marginBottom:1, fontFamily:"Roboto Mono", textTransform: 'none'}} color="codGray" onClick={handleClick} >{props.obj.name} </Button>
    <Popper
                sx={{ zIndex: 1200}}
                open={open}
                anchorEl={anchorEl}
                placement={"right-start"}
                transition
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:4, margin: 1, paddingTop:2}}>
                    <p>ID: {props.obj.id}</p>
                    <p>Name: {props.obj.name}</p>
                    <p>Quantity: {props.obj.quantity}</p>
                    <p>Rate per hour: {props.obj.costPerHr}</p>

                    
                    
                    </Paper>
                </Fade>
                )}
            </Popper>
    </div>
}

function AddEquipment(props){

    const [anchorEl, setAnchorEl] = useState(null);
    const [name, setName] = useState("")
    const [qty, setQty] = useState("")
    const [rate, setRate] = useState("")

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function sendData(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "name": name,
          "quantity": qty,
          "costPerHr": rate
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/addEquipment", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setName("")
            setQty("")
            setRate("")
            let newObj = result
            props.setEquip(prevEquip => [...prevEquip, newObj]);
          })
          .catch((error) => console.error(error));       
    }

    return <div>
        <Button color = "codGray" variant="contained" onClick={handleClick} > {!open ? "Add a new Equipment" : "Close popper"}</Button>
        <Popper
                sx={{ zIndex: 1200}}
                open={open}
                anchorEl={anchorEl}
                placement={"right-start"}
                transition
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{padding:4, margin: 1, paddingTop:2}}>
                    <CustomBox>
                    <TextField id="filled-basic" label="Name" variant="filled" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <TextField id="filled-basic" label="Quantity" variant="filled" value={qty} onChange={(e)=>setQty(e.target.value)}  />
                    <TextField id="filled-basic" label="Rate per hour" variant="filled" value={rate} onChange={(e)=>setRate(e.target.value)} />
                    <Button color = "codGray" variant="contained" onClick={()=>{sendData()}} > Add</Button>
                    </CustomBox>

                    
                    
                    </Paper>
                </Fade>
                )}
            </Popper>
    </div>
}

export default AdminHome;
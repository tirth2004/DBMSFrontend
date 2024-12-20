/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import CustomBox from "./CustomBox";
import { useNavigate } from "react-router-dom";

function LoginCard(props){

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let status = 403;

    function generateToken(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "username": username,
          "password": password
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/generateToken", requestOptions)
          .then((response) => {
            status = response.status
            return response.json()})
          .then((result) => {
            console.log(result)
            
            
            if(props.title==="Admin" && status===200 && result.role==="ROLE_ADMIN"){
              localStorage.setItem("token", result.token);
                props.setLogged("admin")
                navigate('./home')
            } else if(props.title==="Client" && status===200 && result.role==="ROLE_CLIENT"){
              localStorage.setItem("token", result.token);
              props.setLogged("client")
              navigate('./home')
            } else if(props.title==="Worker" && status===200 && result.role==="ROLE_WORKER"){
              localStorage.setItem("token", result.token);
              props.setLogged("worker")
              navigate('./home')
            }
            
          })
          .catch((error) => console.error(error));   
        
    }

    return (
    <Card sx={{ minWidth: 400
     }}>
        <CardContent>
            
        <CustomBox>
            <Typography fontFamily='Roboto Mono' variant="h6" sx ={{marginBottom:4}}>Welcome back {props.title}</Typography>
            
            
            <TextField id="filled-basic" label="Username" variant="filled" sx={{marginBottom:4}} value={username} onChange={(e)=>{setUsername(e.target.value) }}/>
            <TextField id="filled-basic" label="Password" variant="filled" sx={{marginBottom:4}} value={password} onChange={(e)=>{setPassword(e.target.value) }}/>
            <Button color="codGray" variant="contained" onClick={()=>{generateToken()}}>Login</Button>
            
        </CustomBox>
        </CardContent>
    </Card>
    )

}

export default LoginCard;
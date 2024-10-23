/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import CustomBox from "./CustomBox";

function LoginCard(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
          .then((response) => response.text())
          .then((result) => {
            console.log(result)
            localStorage.setItem("token", result, 5000);
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
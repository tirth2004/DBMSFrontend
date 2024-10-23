/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import CustomBox from "./CustomBox";
import {TextField, Button} from "@mui/material";
import { useState } from "react";

function Home (){
    return (
        <Container>
            <CustomBox

            >
                <h1>Welcome to singla construction company</h1>
                
                <LoginCard title = "Admin"></LoginCard>
                
                
            </CustomBox>


            
        </Container>
    )
}

function LoginCard(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
    <Card sx={{ minWidth: 400
     }}>
        <CardContent>
            
        <CustomBox>
            <Typography fontFamily='Roboto Mono' variant="h6" sx ={{marginBottom:4}}>Welcome back {props.title}</Typography>
            
            
            <TextField id="filled-basic" label="Username" variant="filled" sx={{marginBottom:4}} value={username}/>
            <TextField id="filled-basic" label="Password" variant="filled" sx={{marginBottom:4}} />
            <Button color="codGray" variant="contained">Login</Button>
        </CustomBox>
        </CardContent>
    </Card>
    )

}

export default Home;
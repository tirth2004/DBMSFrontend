/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {Container } from "@mui/material";
import CustomBox from "./CustomBox";
import LoginCard from "./LoginCard";
import FixedBottomNavigation from "./BottomNavbar";



function ClientLogin (){
    return (
        <Container>
            <CustomBox

            >
                
                <LoginCard title = "Client"></LoginCard>
                
                
            </CustomBox>
            <FixedBottomNavigation></FixedBottomNavigation>


            
        </Container>
    )
}

export default ClientLogin;
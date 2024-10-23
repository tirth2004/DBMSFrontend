/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {Container } from "@mui/material";
import CustomBox from "./CustomBox";
import LoginCard from "./LoginCard";
import FixedBottomNavigation from "./BottomNavbar";



function AdminLogin (){
    return (
        <Container>
            <CustomBox

            >
                
                <LoginCard title = "Admin"></LoginCard>
                
                
            </CustomBox>
            <FixedBottomNavigation></FixedBottomNavigation>


            
        </Container>
    )
}

export default AdminLogin;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {Container } from "@mui/material";
import CustomBox from "./CustomBox";
import LoginCard from "./LoginCard";
import FixedBottomNavigation from "./BottomNavbar";



function ClientLogin (props){
    return (
        <Container>
            <CustomBox

            >
                
                <LoginCard title = "Client" logged = {props.logged} setLogged = {props.setLogged}></LoginCard>
                
                
            </CustomBox>
            <FixedBottomNavigation></FixedBottomNavigation>


            
        </Container>
    )
}

export default ClientLogin;
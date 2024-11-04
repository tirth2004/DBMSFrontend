import { Container } from "@mui/material";
import CustomBox from "./CustomBox";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccessDenied(){

    const navigate = useNavigate()

    return(
        <Container>
            <CustomBox>
            <h2>Access Denied, please login</h2>
            
            <Button color = "codGray" variant={"contained"} sx = {{textTransform:"None", fontFamily:"Roboto Mono", marginTop:4,}} onClick={()=>{
                navigate("/")
            }}>Go back to login</Button>
            </CustomBox>
        </Container>
    );
}
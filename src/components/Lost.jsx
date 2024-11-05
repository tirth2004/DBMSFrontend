import { Container } from "@mui/material";
import CustomBox from "./CustomBox";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Lost(){

    const navigate = useNavigate();

    return(
        <Container>
            <CustomBox>
            <h2>Route not found</h2>
            
            <Button color = "codGray" variant={"contained"} sx = {{textTransform:"None", fontFamily:"Roboto Mono", marginTop:4,}} onClick={()=>{
                navigate("./")
            }}>Go back</Button>
            </CustomBox>
        </Container>
    );
}
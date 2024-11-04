import { Container } from "@mui/material";
import CustomBox from "./CustomBox";
import {Button} from "@mui/material";

export default function Lost(){

    return(
        <Container>
            <CustomBox>
            <h2>Route not found</h2>
            
            <Button color = "codGray" variant={"contained"} sx = {{textTransform:"None", fontFamily:"Roboto Mono", marginTop:4,}}>Go Home</Button>
            </CustomBox>
        </Container>
    );
}
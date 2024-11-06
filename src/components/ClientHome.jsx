import { Container, Box } from "@mui/material";
import CustomBox from "./CustomBox";
import ProjectClient from "./clientComponents/ProjectClient";

function ClientHome(){

    return(
        <Container sx={{height: "100%"}}>
            <CustomBox>
            <h2>Client dashboard</h2>
            </CustomBox>
            <Box sx={{backgroundColor:"#f4f5f4", paddingTop: 5, paddingBottom: 50, borderRadius: 4}}>

                <ProjectClient></ProjectClient>
                
            </Box>
        </Container>
    )
}

export default ClientHome;
import { Container, Box} from "@mui/material";
import CustomBox from "./CustomBox";
import WorkerTable from "./workerComponents/WorkerTable";


function WorkerHome(){

    return(
        <Container sx={{height: "100%"}}>
            <CustomBox>
            <h2>Worker dashboard</h2>
            </CustomBox>
            <Box sx={{backgroundColor:"#f4f5f4", paddingTop: 5, paddingBottom: 50, borderRadius: 4}}>

                <WorkerTable></WorkerTable>
                
            </Box>
            
        </Container>
    )
}

export default WorkerHome;
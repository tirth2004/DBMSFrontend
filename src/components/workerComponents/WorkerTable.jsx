/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid2, Box, Typography, Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import CustomBox from "../CustomBox";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from "react-router-dom";

function WorkerTable(){

    const [projects, setProjects] = useState([])
    

    useState(()=>{

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/worker/projects", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            let arr = []
            for(let i = 0; i<result.length; i++){
                arr.push(result[i]);
            }
            setProjects(arr);
          })
          .catch((error) => console.error(error));

    }, [])




    return(
        <>
        <Box sx={{ margin:2, marginLeft:4,marginRight:4, padding:2, borderRadius:4}}>
        <Grid2 container spacing={2} sx={{padding:1}}>
            <Grid2 size={4}>
                <CustomBox>Name</CustomBox>
            </Grid2>
            <Grid2 size={4}>
                <CustomBox>Location</CustomBox>
            </Grid2>
            <Grid2 size={3}>
                <CustomBox>Budget</CustomBox>
            </Grid2>

            

        </Grid2>
        </Box>
        {projects.map((obj)=>{
            return <ProjectCard key={obj.id} obj={obj}></ProjectCard>
        })}
        </>
    )
}

function ProjectCard({obj}){

    const navigate = useNavigate();

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme }) => ({
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        variants: [
          {
            props: ({ expand }) => !expand,
            style: {
              transform: 'rotate(0deg)',
            },
          },
          {
            props: ({ expand }) => !!expand,
            style: {
              transform: 'rotate(180deg)',
            },
          },
        ],
    }));

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return(
    <Box sx={{backgroundColor:"white", margin:2, marginLeft:4,marginRight:4, padding:2, borderRadius:4}}>
    <Grid2 container spacing={2} sx={{padding:1}}>
    <Grid2 size={4}>
        <CustomBox>{obj.name}</CustomBox>
    </Grid2>
    <Grid2 size={4}>
        <CustomBox>{obj.location}</CustomBox>
    </Grid2>
    <Grid2 size={3}>
        <CustomBox>{obj.budget}</CustomBox>
    </Grid2>
    <Grid2 size={1}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
    </Grid2>
    </Grid2>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid2 container spacing={2}>
            <Grid2 size={4}>
                <CustomBox>
                <Typography sx={{fontFamily:"Roboto Mono", fontSize:14}}>Start date: {obj.startDate}</Typography>
                
                </CustomBox>
            </Grid2>
            <Grid2 size={4}>
                <CustomBox>
                    
                </CustomBox>
            </Grid2>
            <Grid2 size={4}>
                    
            </Grid2>
            <Grid2 size={4}>
                <CustomBox>
                <Typography sx={{fontFamily:"Roboto Mono", fontSize:14}}>End date: {obj.endDate}</Typography>
                
                </CustomBox>
            </Grid2>
            <Grid2 size={4}>
                <CustomBox>
                    
                </CustomBox>
            </Grid2>
        </Grid2>
        </Collapse>

    </Box>
    );
    
}



export default WorkerTable;
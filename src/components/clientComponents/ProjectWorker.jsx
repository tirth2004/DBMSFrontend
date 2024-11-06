/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectWorker(){
    const {id} = useParams();
    const [worker, setWorkers] = useState([])
    

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch(`http://localhost:8080/auth/client/project/details/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log(result)
            
            let arr = [];
            for(let i = 0; i<result.workers.length; i++){
                arr.push(result.workers[i])
            }
            setWorkers(arr);
          })
          .catch((error) => console.error(error));


    }, [])

    return(
        
    <WorkerTable worker={worker}></WorkerTable>
        
    )
}

function WorkerTable({worker, projectName}){

    return (
        <>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontFamily:"Roboto Mono"}}>Worker ID</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Username</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>First Name</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {worker.map((obj)=>{
                        return(
                            <TableRow key={obj.id}>
                                <TableCell sx={{fontFamily:"Roboto Mono"}}>{obj.id}</TableCell>
                                <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.username}</TableCell>
                                <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.firstName}</TableCell>
                                <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.lastName}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ProjectWorker;
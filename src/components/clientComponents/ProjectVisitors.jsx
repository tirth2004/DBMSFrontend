/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectVisitors(){
    const {id} = useParams();
    const [visitors, setVisitors] = useState([])
    const [allVisitor, setAllVisitor] = useState([])
    
    

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
            for(let i = 0; i<result.visitors.length; i++){
                arr.push(result.visitors[i])
            }
            setVisitors(arr);
          })
          .catch((error) => console.error(error));


    }, [])

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/client/visitors", requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log("Visitors: ", result)
            let arr = [];
            for(let i = 0; i<result.length; i++){
                arr.push(result[i])
            }
            setAllVisitor(arr);
               
          })
          .catch((error) => console.error(error));
    },[])

    

    return(
        
    <VisitorTable visitors={visitors} allVisitor={allVisitor}></VisitorTable>
        
    )
}

function VisitorTable({visitors, allVisitor}){
    
    
    
    return (
        <>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontFamily:"Roboto Mono"}}>Worker ID</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>First Name</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visitors.map((obj)=>{
                        const visitor = allVisitor.find((item) => item.id === obj.visitorId);

                        return(
                            <TableRow key={obj.id}>
                                <TableCell sx={{fontFamily:"Roboto Mono"}}>{obj.visitorId}</TableCell>
                                <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{visitor.firstName}</TableCell>
                                <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{visitor.lastName}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        
        </>
    )
}

export default ProjectVisitors;
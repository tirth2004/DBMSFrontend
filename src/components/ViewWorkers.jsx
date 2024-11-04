/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function ViewWorkers() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8080/auth/admin/workers", requestOptions)
      .then((response) => response.json()) 
      .then((result) => {
        setWorkers(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style ={{height: '100vh', display:"flex", justifyContent:"center", alignItems:"center", marginTop:-200}}>
      <DeptTable workers={workers} setWorkers={setWorkers}/>
    </div>
  );
}

function DeptTable({ workers, setWorkers }) {
  function handleDelete(id){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch(`http://localhost:8080/auth/admin/deleteWorker/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
        setWorkers(workers.filter((worker)=>worker.id!=id))
      })
      .catch((error) => console.error(error));
}
  return (
   
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow >
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}} >First Name </TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Last Name</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Gender</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>DoB</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Email</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Phone</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Address</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Salary</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Position</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Department</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Name of Manager</TableCell>
                <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {workers.map((worker) => (
                    <TableRow key={worker.id}>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.firstName}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.lastName}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.gender}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.dob}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.email}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.phone}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.address}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.salary}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.position}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.dept}</TableCell>
                    <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>{worker.managedBy}</TableCell>
                    <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><DeleteOutlinedIcon sx={{ "&:hover": { color: "red" } }} onClick={()=>{
                                handleDelete(worker.id)
                    }}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    

    )
}

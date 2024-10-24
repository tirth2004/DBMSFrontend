import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function viewWorkers() {
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
      <DeptTable workers={workers} />
    </div>
  );
}

export function DeptTable({ workers }) {
  return (
   <div style = {{width:1100, padding:10}}>
         <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, padding:10 }} aria-label="simple table">
            <TableHead>
              <TableRow sx = {{backgroundColor:"black"}}>
                <TableCell sx = {{fontSize: '1.2rem', color : 'white'}}>First Name </TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Last Name</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Gender</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>DoB</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Email</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Phone</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Address</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Salary</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Position</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Department</TableCell>
                <TableCell align="left" sx = {{fontSize: '1.2rem', color : 'white'}}>Name of Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {workers.map((worker) => (
                    <TableRow key={worker.id}>
                    <TableCell>{worker.firstName}</TableCell>
                    <TableCell align = "center">{worker.lastName}</TableCell>
                    <TableCell align = "center">{worker.gender}</TableCell>
                    <TableCell align = "center">{worker.dob}</TableCell>
                    <TableCell align = "center">{worker.email}</TableCell>
                    <TableCell align = "center">{worker.phone}</TableCell>
                    <TableCell align = "center">{worker.address}</TableCell>
                    <TableCell align = "center">{worker.salary}</TableCell>
                    <TableCell align = "center">{worker.position}</TableCell>
                    <TableCell align = "center">{worker.dept}</TableCell>
                    <TableCell align = "center">{worker.managedBy}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>

    )
}

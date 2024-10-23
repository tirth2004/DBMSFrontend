import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function ViewDepartments() {
  const [departments, setDepartments] = useState([]);

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

    fetch("http://localhost:8080/auth/admin/department", requestOptions)
      .then((response) => response.json()) // Parse the response as JSON
      .then((result) => {
        setDepartments(result); // Update state with the result
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style ={{height: '100vh', display:"flex", justifyContent:"center", alignItems:"center", marginTop:-30}}>
      <DeptTable departments={departments} />
    </div>
  );
}

export function DeptTable({ departments }) {
  return (
   <div style = {{width:600, padding:10}}>
        <TableContainer component={Paper} sx={{width: '100%', maxHeight: '80vh'}}>
        <Table size="small" aria-label="a dense table">
            <TableHead>
            <TableRow sx = {{
                backgroundColor:"black"
            }}>
                <TableCell align="center"sx= {{
                    color:"white",
                    fontWeight: "bold",
                    fontSize: '1.5rem'
                }}>Departments</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {departments.map((department) => (
                <TableRow key={department.id}>
                <TableCell align = "center" sx = {{
                    fontSize: '1.2rem'
                }}>{department.name}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>

    )
}

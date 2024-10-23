import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export default function ViewDepartments() {
    const [departments, setDepartments] = useState([]);
    
    useEffect(() => {
        function callback2(data) {
            console.log(data)
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/departments/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6ImhpZ2giLCJpYXQiOjE3Mjk3MDYxNDcsImV4cCI6MTcyOTcwNzk0N30.blakHNDqUuIPrU22jh7G4W77AnwRF5KyrABY3Ht7w_A"
            }
        }).then(callback1)
    }, []);
    return (
        <div>
            console.log(data)
        </div>
    )
}

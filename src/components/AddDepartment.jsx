import { Button, Container, TextField } from '@mui/material'
import { useState } from 'react'
import CustomBox from './CustomBox'

export default function AddDepartment
() {
  const[department, setDepartment] = useState("");
  return (
    <div>
         <Container>
            <CustomBox>
                
            <TextField  color = "black" id="filled-basic" label="Department Name" variant="filled" sx={{marginBottom:4}} value={department} onChange={(e)=>{setDepartment(e.target.value) }}/>
              <Button color = "black" variant = "contained" onClick={() => {
                const myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                myHeaders.append("Content-Type", "application/json");
                
                const raw = JSON.stringify({
                  "name": department
                });
                
                const requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow"
                };
                
                fetch("http://localhost:8080/auth/admin/adddepartment", requestOptions)
                  .then((response) => response.text())
                  .then((result) => console.log(result))
                  .catch((error) => console.error(error));
              }}>+Add</Button>                
            </CustomBox>
            
        </Container>
    </div>
  )
}

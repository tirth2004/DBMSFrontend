import { Container, TextField } from '@mui/material'
import React, { useState } from 'react'
import CustomBox from './CustomBox'

export default function 
() {
  const[department, setDepartment] = useState("");
  return (
    <div>
         <Container>
            <CustomBox>
                
            <TextField id="filled-basic" label="Department Name" variant="filled" sx={{marginBottom:4}} value={department} onChange={(e)=>{setDepartment(e.target.value) }}/>                
            </CustomBox>
            
        </Container>
    </div>
  )
}

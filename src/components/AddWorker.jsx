import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import CustomBox from './CustomBox';

export default function AddWorker() {
  const [departments, setDepartments] = useState([]);
  const [admin, setAdmin] = useState();

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
      .then((response) => response.json()) 
      .then((result) => {
        setDepartments(result);
      })
      .catch((error) => console.error(error));
  }, []);


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

    fetch("http://localhost:8080/auth/admin/details", requestOptions)
      .then((response) => response.json()) 
      .then((result) => {
        setAdmin(result);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <Container>
        <CustomBox>
          <AddCard departments = {departments} admin = {admin}/>
        </CustomBox>
      </Container>
    </div>
  );
}

function AddCard({departments, admin}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null); 
  const [email, setEmail] = useState(null); 
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [salary, setSalary] = useState(0); 
  const [position, setPosition] = useState(''); 
  const [dept, setDept] = useState(0); 

  function onSubmit(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "address": address,
      "dept": dept,
      "dob": dob,
      "email": email,
      "firstName": fName,
      "gender": gender,
      "lastName": lName,
      "managedBy": admin.id,
      "password": password,
      "phone": phone,
      "position": position,
      "salary": salary,
      "username": username
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  fetch("http://localhost:8080/auth/admin/addworker", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  
  return (
    <Card sx={{ minWidth: 800 }}>
      <CardContent>
        <CustomBox>
          <Typography fontFamily="Roboto Mono" variant="h6" sx={{ marginBottom: 4 }}>
            Enter worker details
          </Typography>

          <TextField
            label="Username"
            variant="filled"
            sx={{ marginBottom: 1, width: 400 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            sx={{ marginBottom: 1, width: 400}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="FirstName"
            variant="filled"
            sx={{ marginBottom: 1, width: 400}}
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <TextField
            label="LastName"
            variant="filled"
            sx={{ marginBottom: 1, width: 400 }}
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <TextField
            label="Gender"
            variant="filled"
            sx={{ marginBottom: 1, width: 100 }}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          
          <TextField 
            id="dob" 
            label="Date of Birth" 
            type="date" 
            variant="filled" 
            sx={{ marginBottom: 1, width: 300 }} 
            InputLabelProps={{
              shrink: true,  
            }}
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
          />
          <TextField
            label="Email"
            variant="filled"
            sx={{ marginBottom: 1, width: 400 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            variant="filled"
            sx={{ marginBottom: 1, width: 400 }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Address"
            variant="filled"
            sx={{ marginBottom: 1, width: 400 }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Salary"
            variant="filled"
            type="number"
            sx={{ marginBottom: 1, width: 200 }}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <TextField
            label="Position"
            variant="filled"
            sx={{ marginBottom: 1, width: 400 }}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <FormControl sx = {{width:400}}>
            <InputLabel id="demo-simple-select-label" >Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Department"
              onChange={(e) => setDept(e.target.value)}
            >
             {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
          <Button color="codGray" variant="contained" onClick={()=>{onSubmit()}}>Submit</Button>
        </CustomBox>
      </CardContent>
    </Card>
  );
}

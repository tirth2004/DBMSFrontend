/* eslint-disable no-unused-vars */
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import CustomBox from "./CustomBox";
import { useEffect, useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function Clients(){

    const [clients, setClients] = useState([]);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([])

    
    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`)
        myHeaders.append("Content-Type", "application/json");
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/clients", requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log(result)
            let arr = []
            for(let i = 0; i<result.length; i++){
                arr.push(result[i])
            }
            console.log(arr);
            setClients(arr);
            setFiltered(arr);
          })
          .catch((error) => console.error(error));      
    }, [])

    function sendData(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')} `);
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "username": username,
          "firstName": firstName,
          "lastName":lastName,
          "email": email, 
          "address": address, 
          "phoneNo": phone, 
          "password": password
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/addclient", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setClients([...clients,result ])
            setFiltered([...filtered,result ])
            setUsername("")
            setFirstName("")
            setLastName("")
            setEmail("")
            setAddress("")
            setPhone("")
            setPassword("")
          })
          .catch((error) => console.error(error));

    }

    function handleSearch(e){
        setSearch(e.target.value)
        const data = clients.filter((item)=> item.username.includes(e.target.value))
        setFiltered(data)
        console.log(data)
    }

    function handleDelete(id){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch(`http://localhost:8080/auth/admin/deleteClient/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {console.log(result)
            setClients(clients.filter((client)=>client.id!=id))
            setFiltered(filtered.filter((client)=>client.id!=id))
          })
          .catch((error) => console.error(error));
    }





    return <Container>
        <CustomBox>
            <h2>Clients</h2>
            
        </CustomBox>
        <TextField id="standard-basic" variant="standard" sx={{marginBottom:4}} label="Search for username" value={search} onChange={(e)=>{handleSearch(e)}}/>
        <TableContainer component={Paper}  >
            
            <Table sx={{ minWidth: 650}} aria-label="simple table" >
                <TableHead>
                    <TableRow >
                        <TableCell sx={{fontFamily:"Roboto Mono"}}>Username </TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>First name</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Last name</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Email</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Address</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Phone number</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {filtered.map((obj, index) =>{
                    return (
                        <TableRow key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                           <TableCell component="th" scope="row" sx={{fontFamily:"Roboto Mono"}}>
                                {obj.username}
                            </TableCell> 
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.firstName}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.lastName}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.email}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.address}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.phoneNo}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><DeleteOutlinedIcon sx={{ "&:hover": { color: "red" } }} onClick={()=>{
                                handleDelete(obj.id)
                            }}/></TableCell>

                        </TableRow>
                    )
                })}
                    <TableRow 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       <TableCell component="th" scope="row" sx={{fontFamily:"Roboto Mono"}}>
                       <TextField id="standard-basic" variant="standard" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                        </TableCell> 
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} /></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={address} onChange={(e)=>{setAddress(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/></TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </TableContainer>
        <Button color = "codGray" variant={"contained"} sx = {{textTransform:"None", fontFamily:"Roboto Mono", marginTop:4,}} onClick={()=>{
            sendData()
        }}>Add client</Button>
        <TextField id="standard-basic"  variant="standard" label="Password" sx={{marginTop:4, marginLeft:4}} value={password} onChange={(e)=>{setPassword(e.target.value)}} />
    </Container>
}
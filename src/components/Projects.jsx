/* eslint-disable no-unused-vars */
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import CustomBox from "./CustomBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Proejcts(){

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("Ongoing");
    const [client, setClient] = useState();
    const [budget, setBudget] = useState();
    const [location, setLocation] = useState("");
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
        
        fetch("http://localhost:8080/auth/admin/projects", requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log(result)
            let arr = []
            for(let i = 0; i<result.length; i++){
                arr.push(result[i])
            }
            setProjects(arr);
            setFiltered(arr);
          })
          .catch((error) => console.error(error));      
    }, [])

    function sendData(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')} `);
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "name": name,
          "startDate": startDate,
          "endDate":endDate,
          "soldTo": client, 
          "budget": budget, 
          "location": location, 
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/addproject", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            setProjects([...projects,result ])
            setFiltered([...filtered,result ])
            setName("")
            setStartDate("")
            setEndDate("Ongoing")
            setClient(0)
            setBudget(0)
            setLocation("")
          })
          .catch((error) => console.error(error));

    }

    function handleSearch(e){
        setSearch(e.target.value)
        const data = projects.filter((item)=> item.name.includes(e.target.value))
        setFiltered(data)
        console.log(data)
    }





    return <Container>
        <CustomBox>
            <h2>Manage your projects here!</h2>
            
        </CustomBox>
        <TextField id="standard-basic" variant="standard" sx={{marginBottom:4}} label="Search for project name" value={search} onChange={(e)=>{handleSearch(e)}}/>
        <TableContainer component={Paper}  >
            
            <Table sx={{ minWidth: 650}} aria-label="simple table" >
                <TableHead>
                    <TableRow >
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Name</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Start Date</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>End Date</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Client</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Budget</TableCell>
                        <TableCell align="left" sx={{fontFamily:"Roboto Mono"}}>Location</TableCell>                        
                    </TableRow>
                </TableHead>
                <TableBody>
                {filtered.map((obj, index) =>{
                    return (
                        <TableRow key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                           <TableCell component="th" scope="row" sx={{fontFamily:"Roboto Mono"}}>
                                {obj.name}
                            </TableCell> 
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.startDate}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.endDate}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.soldTo}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.budget}</TableCell>
                            <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.location}</TableCell>
                            <TableCell align="center" sx={{fontFamily:"Roboto Mono"}}>
                            <Button color = "codGray" variant={"contained"} sx = {{textTransform:"None", fontFamily:"Roboto Mono", marginTop:4,}} onClick={()=>{
                                navigate(`${obj.id}`);
                            }}>Details</Button>
                            </TableCell>

                        </TableRow>
                    )
                })}
                    <TableRow 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       <TableCell component="th" scope="row" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic" variant="standard" value={name} onChange={(e)=>{setName(e.target.value)}}/></TableCell> 
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={client} onChange={(e)=>{setClient(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={budget} onChange={(e)=>{setBudget(e.target.value)}}/></TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}><TextField id="standard-basic"  variant="standard" value={location} onChange={(e)=>{setLocation(e.target.value)}}/></TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </TableContainer>
        <Button color = "codGray" variant={"contained"} sx = {{textTransform:"None", fontFamily:"Roboto Mono", marginTop:4,}} onClick={()=>{
            sendData()
        }}>Add Project</Button>
        {/* <TextField id="standard-basic"  variant="standard" label="Password" sx={{marginTop:4, marginLeft:4}} value={password} onChange={(e)=>{setPassword(e.target.value)}} /> */}
    </Container>
}
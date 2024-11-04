/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fade, Paper, Typography, Popper, Button, TextField, Container } from "@mui/material"
import { useEffect, useState } from "react"
import CustomBox from "./CustomBox";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function DepartmentPopper(props){
    const [depts, setDepts] = useState([])

    //Popper for adding department fields
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/department", requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log(result)
            let arr = []
            for(let i = 0; i<result.length; i++){
                arr.push(result[i])
            }
            setDepts(arr)
          })
          .catch((error) => console.error(error));
    }, [])

    function deleteDept(id){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch(`http://localhost:8080/auth/admin/deleteDepartment/${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {console.log(result)
            setDepts(depts.filter((dept)=>dept.id!=id))
          })
          .catch((error) => console.error(error));
    }
    
    

    return(
        <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={props.open}
        anchorEl={props.anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div>
              
              {depts.map((obj)=>{
                return(
                <div key={obj.id} style={{display:"flex", justifyContent:"left", alignItems:"left", position:"relative"}} >
                <Typography sx={{ p: 2, fontFamily:"Roboto Mono", marginRight:4 }}>{obj.name}</Typography>
                
                <DeleteOutlinedIcon onClick={()=>{deleteDept(obj.id)}} sx={{ "&:hover": { color: "red" }, p: 2, fontFamily:"Roboto Mono", position:"absolute", right:0 }} />
                
                </div>
                );
              })}
              <Button color="codGray" variant="contained" onClick={handleClick} sx={{margin:2}}>{!open?"Add department":"close"}</Button>
              <PopperField open={open} anchorEl={anchorEl} setDepts={setDepts}></PopperField>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    )
}

function PopperField(props){
    const [name, setName] = useState("")
    function handleAddDepartment(){
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "name": name
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:8080/auth/admin/adddepartment", requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log(result)
            props.setDepts((prevDepts) => [...prevDepts, result]);
            setName("")
          })
          .catch((error) => console.error(error));   
    }

    return (
    
        <Popper
    // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
    sx={{ zIndex: 1200 }}
    open={props.open}
    anchorEl={props.anchorEl}
    transition
  >
    {({ TransitionProps }) => (
      <Fade {...TransitionProps} timeout={350}>
        <Paper sx={{padding: 2}}>
            
          <CustomBox>
            <TextField id="filled-basic" label="Name" variant="filled" value={name} onChange={(e)=>{setName(e.target.value)}} />
            
            <Button color="codGray" variant="contained" onClick={handleAddDepartment} sx={{margin:2}}>Add department</Button>
          </CustomBox>
          
        </Paper>
      </Fade>
    )}
  </Popper>
  
    );
}
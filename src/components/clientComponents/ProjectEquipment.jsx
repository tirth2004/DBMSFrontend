/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectEquipment(){
    const {id} = useParams();
    const [equip, setEquip] = useState([])
    

    useEffect(()=>{
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch(`http://localhost:8080/auth/client/project/details/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {console.log(result)
            
            let arr = [];
            for(let i = 0; i<result.equipment.length; i++){
                arr.push(result.equipment[i])
            }
            setEquip(arr);
          })
          .catch((error) => console.error(error));


    }, [])

    return(
        
    <EquipTable equip={equip}></EquipTable>
        
    )
}

function EquipTable({equip}){

    return (
        <>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontFamily:"Roboto Mono"}}>Equipment Name</TableCell>
                        <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {equip.map((obj, index)=>{
                        return(
                            <TableRow key={index}>
                                <TableCell sx={{fontFamily:"Roboto Mono"}}>{obj.equipment}</TableCell>
                                
                                <TableCell align="right" sx={{fontFamily:"Roboto Mono"}}>{obj.quantity}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default ProjectEquipment;
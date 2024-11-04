/* eslint-disable no-unused-vars */
import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import DepartmentPopper from './DepartmentPopper';

export default function Navbar(props) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const navigate = useNavigate();
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1,
            marginBottom:30
        }}>
            <div style={{marginLeft: 10}}>
                <Typography variant={"h6"} fontFamily="Roboto Mono" color = "codGray">Singla Construction Company</Typography>
            </div>

            <div style={{display: "flex"}}>
                <div style={{marginRight: 10, display: "flex"}}>
                
                {(props.logged=="admin") ?  <Button color="codGray" variant="contained" onClick={handleClick} sx={{marginRight:2, paddingRight:3, paddingLeft:3}}>Department</Button>:""}
                <DepartmentPopper open={open} anchorEl={anchorEl}></DepartmentPopper>

                    <Button color = "codGray"
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    )
}

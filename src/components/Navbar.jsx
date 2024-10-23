import { Button, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
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
                <Typography variant={"h6"} color = "codGray">Singla Construction Company</Typography>
            </div>

            <div style={{display: "flex"}}>
                <div style={{marginRight: 10, display: "flex"}}>
                <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                navigate("/department")
                            }}
                        >Departments</Button>
                    </div>

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

/* eslint-disable no-unused-vars */
import './App.css'
import AdminLogin from './components/AdminLogin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import CustomBox from './components/CustomBox';
import ClientLogin from './components/ClientLogin';
import WorkerLogin from './components/WorkerLogin';
import Navbar from './components/Navbar';
import Departments from './components/Departments';

import AdminHome from './components/AdminHome';
import { useEffect, useState } from 'react';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    codGray: createColor('#191919'),
    bombay: createColor('#aeaeaf')
  },


});


function App() {

  //none for not logged in, or else admin/worker/client whatever the user is
  const [logged, setLogged] = useState("none")

  //TODO: Only adding to check admin yet, update it when we have API to check for client or worker
  useEffect(()=>{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Content-Type", "application/json");
    

    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch("http://localhost:8080/auth/admin/", requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
        if(result==="Welcome to admin Profile"){
          setLogged("admin")
        }
        
      })
      .catch((error) => console.error(error));
  }, [])
  

  return (
    <ThemeProvider theme={theme}>
    <CustomBox>
    {(logged=="none") && <h1>Welcome to Singla Construction Company</h1>}
    </CustomBox>
    
    <Router>
      {(logged!="none") &&<Navbar />}
      <Routes>
        <Route path="/" element={<AdminLogin logged= {logged} setLogged= {setLogged} />} />
        <Route path="/client" element={<ClientLogin />} />
        <Route path="/worker" element={<WorkerLogin />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/home" element={<AdminHome/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
    
  )
}

export default App

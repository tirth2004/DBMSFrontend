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
import AddDepartment from './components/AddDepartment';
import ViewDepartments from './components/ViewDepartments';
import AdminHome from './components/AdminHome'
import AccessDenied from './components/AccessDenied';


import { useEffect, useState } from 'react';
import ViewWorkers from './components/ViewWorkers';
import AddWorker from './components/AddWorker';
import Workers from './components/Worker';
import Clients from './components/Clients';
import Lost from './components/Lost';
import ClientHome from './components/ClientHome';

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
        <Route path="/client" element={<ClientLogin  logged= {logged} setLogged= {setLogged}/>} />
        <Route path="/worker" element={<WorkerLogin />} />
        <Route path="/department" element={(logged=="admin")?<Departments />: <AccessDenied/>} />
        <Route path="/addDepartment" element={(logged=="admin")?<AddDepartment />:<AccessDenied/>} />
        <Route path="/viewDepartments" element={(logged=="admin")?<ViewDepartments />:<AccessDenied/>} />
        <Route path="/workerhome" element={(logged=="admin")?<Workers />:<AccessDenied/>} />
        <Route path="/addWorker" element={(logged=="admin")?<AddWorker />:<AccessDenied/>} />
        <Route path="/viewWorkers" element={(logged=="admin")?<ViewWorkers />:<AccessDenied/>} />
        <Route path="/home/clients" element={(logged=="admin")?<Clients />:<AccessDenied/>} />
        <Route path="/home" element={(logged=="admin")?<AdminHome/> :<AccessDenied/>}/>
        <Route path="/client/home" element={(logged=="client")?<ClientHome />:<AccessDenied/>}/>
        <Route path="*" element={<Lost />} />
      </Routes>
    </Router>
    </ThemeProvider>
    
  )
}

export default App

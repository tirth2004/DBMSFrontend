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
import Loader from './components/Loader';

import { useEffect, useState } from 'react';
import ViewWorkers from './components/ViewWorkers';
import AddWorker from './components/AddWorker';
import Workers from './components/Worker';
import Clients from './components/Clients';
import Lost from './components/Lost';
import ClientHome from './components/ClientHome';
import WorkerHome from './components/WorkerHome';
import ProjectClient from './components/clientComponents/ProjectClient';
import ProjectWorker from './components/clientComponents/ProjectWorker';
import ProjectVisitors from './components/clientComponents/ProjectVisitors';
import ProjectEquipment from './components/clientComponents/ProjectEquipment';
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
  const [loading, setLoading] = useState(true)



  function checkWorker(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Content-Type", "application/json");
    

    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch("http://localhost:8080/auth/worker/", requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
        if(result==="Welcome to worker Profile"){
          setLogged("worker")
        }
        
        setLoading(false)
        
      })
      .catch((error) => console.error(error));
  }

  function checkClient(){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    myHeaders.append("Content-Type", "application/json");
    

    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch("http://localhost:8080/auth/client/", requestOptions)
      .then((response) => response.text())
      .then((result) => {console.log(result)
        if(result==="Welcome to client Profile"){
          setLogged("client")
          setLoading(false)
        } else {
          checkWorker()
        }
        
      })
      .catch((error) => console.error(error));
  }

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
          setLoading(false)
        } else {
          console.log("Not logged in as admin")
          checkClient()
        }
        
      })
      .catch((error) => console.error(error));
  }, [])

  
  
  

  return (
    
    <ThemeProvider theme={theme}>
    <CustomBox>
    {loading?"":(logged=="none") && <h1>Welcome to Singla Construction Company</h1>}
    </CustomBox>
    
    <Router>
      {(logged!="none") &&<Navbar logged={logged} />}
      <Routes>
        <Route path="/" element={
          loading?<Loader/>:
          logged === "none" ? <AdminLogin logged={logged} setLogged={setLogged} /> :
          logged === "admin" ? <AdminHome /> :
          logged === "client" ? <ClientHome /> :
          <WorkerHome />
        } />
        <Route path="/client" element={
          loading?<Loader/>:
          logged === "none" ? <ClientLogin  logged= {logged} setLogged= {setLogged}/> :
          logged === "admin" ? <AdminHome /> :
          logged === "client" ? <ClientHome /> :
          <WorkerHome />
        } />
        <Route path="/worker" element={
          loading?<Loader/>:
          logged === "none" ? <WorkerLogin  logged= {logged} setLogged= {setLogged}/> :
          logged === "admin" ? <AdminHome /> :
          logged === "client" ? <ClientHome /> :
          <WorkerHome />
        } />
        
        <Route path="/department" element={loading?<Loader/>:(logged=="admin")?<Departments />: <AccessDenied/>} />
        <Route path="/addDepartment" element={loading?<Loader/>:(logged=="admin")?<AddDepartment />:<AccessDenied/>} />
        <Route path="/viewDepartments" element={loading?<Loader/>:(logged=="admin")?<ViewDepartments />:<AccessDenied/>} />
        <Route path="/workerhome" element={loading?<Loader/>:(logged=="admin")?<Workers />:<AccessDenied/>} />
        <Route path="/addWorker" element={loading?<Loader/>:(logged=="admin")?<AddWorker />:<AccessDenied/>} />
        <Route path="/viewWorkers" element={loading?<Loader/>:(logged=="admin")?<ViewWorkers />:<AccessDenied/>} />
        <Route path="/clients" element={loading?<Loader/>:(logged=="admin")?<Clients />:<AccessDenied/>} />
        <Route path="/home" element={loading?<Loader/>:(logged=="admin")?<AdminHome/> :<AccessDenied/>}/>
        <Route path="/client/home" element={loading?<Loader/>:(logged=="client")?<ClientHome />:<AccessDenied/>}/>
        <Route path="/worker/home" element={loading?<Loader/>:(logged=="worker")?<WorkerHome />:<AccessDenied/>}/>
        <Route path="/client/home/workers/:id" element={loading?<Loader/>:(logged=="client")?<ProjectWorker />:<AccessDenied/>}/>
        <Route path="/client/home/visitors/:id" element={loading?<Loader/>:(logged=="client")?<ProjectVisitors />:<AccessDenied/>}/>
        <Route path="/client/home/equipment/:id" element={loading?<Loader/>:(logged=="client")?<ProjectEquipment />:<AccessDenied/>}/>
        <Route path="*" element={<Lost />} />
      </Routes>
    </Router>
    </ThemeProvider>
    
  )
}

export default App
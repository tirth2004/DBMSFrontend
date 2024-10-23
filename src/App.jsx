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
  

  return (
    <ThemeProvider theme={theme}>
    <CustomBox>
    <h1>Welcome to Singla Construction Company</h1>
    </CustomBox>
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
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

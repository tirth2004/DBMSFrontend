/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';




export default function FixedBottomNavigation(props) {
  const [value, setValue] = React.useState(props.index);
  const ref = React.useRef(null);
  

  

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction  href="/client" label="Client Login"  />
          <BottomNavigationAction  href="/worker"label="Worker Login" />
          <BottomNavigationAction  href="/"label="Admin Login" />

        </BottomNavigation>
      </Paper>
    </Box>
  );
}
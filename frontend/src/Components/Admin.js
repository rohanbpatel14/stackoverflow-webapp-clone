import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import Analytics from './Analytics';
import Approvals from './Approvals';
import Navbar from './Navbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function Admin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Navbar/>
    <Box
      sx={{ flexGrow: 1, display: 'flex', height:'100vh' }}
    >
      <Tabs
      
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', width: 224 }}
        TabIndicatorProps={{style: {background: 'orange', textAlign: 'right'}}}
        
      >
        <Tab label="Dashboard"  sx={{float: 'right'}}  />
        <Tab label="Approvals"  />
        <Tab label="Add Tags"  />
        
      </Tabs>
      <TabPanel sx={{width: "100%"}} value={value} index={0} >
        <Analytics/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Approvals/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
    </>
   
  );
}

export default Admin
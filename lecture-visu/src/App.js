// App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import sections from './sections';
import {Box, Paper} from '@mui/material'
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionSelect = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar sections={sections} onSelectSection={handleSectionSelect} active={sidebarOpen} />
      
      <div className="menu-button" onClick={toggleSidebar}>
        ☰
      </div>
      
      <Box component="main" sx={{ flexGrow: 1, ml: 0, padding: 0 }}>
        <div className = "paper-container">
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2}} className="paper">
            <h1>Einführung in die Produktion</h1>
              {sections.map((section) => (
                <div className="main-section" id = {section.id}>
                  {section.component}
                </div>  
              ))}
            
          </Paper>
        </div>    
      </Box>
    </div>
  );
}

export default App;

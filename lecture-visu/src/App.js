import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Produktionsfunktion from './components/Produktionsfunktion';
import { Toolbar, Box, Container, Paper } from '@mui/material';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionSelect = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setSidebarOpen(!sidebarOpen)
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar
  };

  return (
    <div className="app">
      {/* Toggle the 'active' class based on sidebarOpen state */}
      <Sidebar onSelectSection={handleSectionSelect} className={sidebarOpen ? 'sidebar active' : 'sidebar'} />
      
      {/* Menu button for mobile devices */}
      <div className="menu-button" onClick={toggleSidebar}>
        ☰
      </div>
      
      <Box component="main" sx={{ flexGrow: 1, ml: 0, padding: 0 }}>
        <div className = "paper-container">
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2}} className="paper">
            <h1>Einführung in die Produktion</h1>
            <div className="main-section">
              <Produktionsfunktion id="section1" />
            </div>
            <div className="main-section">
              <Produktionsfunktion id="section2" />
            </div>
          </Paper>
        </div>    
      </Box>
    </div>
  );
}

export default App;

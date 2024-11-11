import React from 'react';
import Sidebar from './components/Sidebar';
import Produktionsfunktion from './components/Produktionsfunktion';
import { Toolbar, Box, Container, Paper, Typography } from '@mui/material';
import "./App.css";

function App() {
  const handleSectionSelect = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Sidebar onSelectSection={handleSectionSelect} />
      
      <Box component="main">
        
        
        <div maxWidth="lg" className = "paper-container">
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <div className="main-section">
              <h1>Einführung in die Produktion</h1>
              <Produktionsfunktion />
            </div>
          </Paper>
        </div>
        
      </Box>
    </div>
  );
}

export default App;

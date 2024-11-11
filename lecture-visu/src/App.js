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
      
      <Box component="main" sx={{ flexGrow: 1, ml: 0, padding: 0 }}>
        <Toolbar /> {/* Adds some space for the header if needed */}
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <div className="main-section">
              <h1>Einführung in die Produktion</h1>
              <Produktionsfunktion />
            </div>
          </Paper>
        </Container>
        
      </Box>
    </div>
  );
}

export default App;

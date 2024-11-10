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
              <Typography variant="h4" className="main-headline" gutterBottom>
                Einführung in die Produktion
              </Typography>
              <Produktionsfunktion />
            </div>
          </Paper>
        </Container>
        
      </Box>
    </div>
  );
}

export default App;

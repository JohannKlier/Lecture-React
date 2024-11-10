import React from 'react';
import Sidebar from './components/Sidebar';
import Produktionsfunktion from './components/Produktionsfunktion';
import { Toolbar, Box } from '@mui/material';
import "./App.css"

function App() {
  const handleSectionSelect = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Sidebar onSelectSection={handleSectionSelect} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 30 }}> {/* Adjust `ml` to match Sidebar width */}
        <Toolbar /> {/* To add spacing at the top */}
        <Produktionsfunktion />
      
      </Box>
    </div>
  );
}

export default App;
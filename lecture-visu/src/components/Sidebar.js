import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

function Sidebar({ onSelectSection }) {
  const sections = [
    { id: 'Produktionsfunktion', label: 'Production Function' },
    { id: 'visualization-two', label: 'Visualization Two' },
    { id: 'visualization-three', label: 'Visualization Three' },
  ];

  const handleNavigation = (id) => {
    onSelectSection(id);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {sections.map((section) => (
          <ListItem button key={section.id} onClick={() => handleNavigation(section.id)}>
            <ListItemText primary={section.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;

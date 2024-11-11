import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  padding: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    padding:0,
    boxSizing: 'border-box',
    backgroundColor: '#1e1e2f', // Dark background color
    color: '#fff', // Text color
    paddingTop: theme.spacing(2),
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 30,
  paddingRight: 30,
  '&:hover': {
    backgroundColor: '#333348', // Hover color for items
  },
  '& .MuiListItemText-root': {
    color: '#cfd3e3', // Text color for list items
  },
}));

function Sidebar({ onSelectSection }) {
  const sections = [
    { id: 'section1', label: 'Produktionsfunktion' },
    { id: 'section2', label: 'Ablaufplanung' },
    { id: 'visualization-three', label: 'Kostenfunktion' },
  ];

  const handleNavigation = (id) => {
    onSelectSection(id);
  };

  return (
    <SidebarContainer variant="permanent" anchor="left">
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', ml: 2 }}>
          Visualizations
        </Typography>
      </Toolbar>
      <List>
        {sections.map((section) => (
          <StyledListItem button key={section.id} onClick={() => handleNavigation(section.id)}>
            <ListItemText primary={section.label} />
          </StyledListItem>
        ))}
      </List>
    </SidebarContainer>
  );
}

export default Sidebar;

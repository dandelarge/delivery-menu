import React, { useEffect, useState } from 'react';
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Container, IconButton, List, ListItem, Paper, Toolbar, Typography } from '@mui/material';
import { Menu, Restore, Favorite, Archive } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';
import { SwipeableEdgeDrawer } from './Drawer';
import { useOrder } from '../providers/order-provider';
import { OrderSummary } from './OrderSumary';
import { Sidebar } from './Sidebar';
import { BottomDrawerProvider } from '../providers/bottom-drawer-provider';


export function Layout() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {userName, userId} = auth;

  const { total } = useOrder();

  async function handleLogout() {
    await auth.logout();
    navigate('/login');
  }

  const toggleSidebar = (newOpen: boolean) => {
    setIsSidebarOpen(newOpen);
  }

  return (<>
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Sidebar open={isSidebarOpen} onClose={() => toggleSidebar(false)}></Sidebar>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleSidebar(true)}
          >
            <Menu></Menu>
          </IconButton>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Welcome {userName}!
          </Typography>
          <Button onClick={handleLogout}>logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{flexGrow: 1, mb: 8}}>
          <Box sx={{
            mb: 8
          }}>
            <Outlet />
          </Box>
          <BottomDrawerProvider>
            <SwipeableEdgeDrawer title={`total: ${total} €` }>
              <OrderSummary></OrderSummary>
            </SwipeableEdgeDrawer>
          </BottomDrawerProvider>
      </Container>
    </Box>
  </>);
}

function refreshMessages() {
  throw new Error('Function not implemented.');
}

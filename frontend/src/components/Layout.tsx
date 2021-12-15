import React, { useEffect, useState } from 'react';
import { Alert, AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Container, IconButton, List, ListItem, Paper, Snackbar, Toolbar, Typography } from '@mui/material';
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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(auth.authenticated);

  const { total, hasChanges: hasOrderChanges } = useOrder();

  async function handleLogout() {
    await auth.logout();
    navigate('/login');
  }

  const toggleSidebar = (newOpen: boolean) => {
    setIsSidebarOpen(newOpen);
  }

  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  return (<>
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Sidebar open={isSidebarOpen} onClose={() => toggleSidebar(false)}></Sidebar>
      <AppBar position="sticky" color="secondary">
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
          <Button onClick={handleLogout} sx={{ml:'auto'}}>logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{flexGrow: 1, mb: 8}}>
          <Box sx={{
            mb: 8
          }}>
            <Outlet />
          </Box>
          <BottomDrawerProvider>
            <SwipeableEdgeDrawer>
              <OrderSummary></OrderSummary>
            </SwipeableEdgeDrawer>
          </BottomDrawerProvider>
      </Container>
    </Box>
    <Snackbar
      anchorOrigin={{vertical:'top', horizontal:'center'}}
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert severity='success'>
        <Typography variant="subtitle2">
          Arriba las Marihuanas Joakin 🐒
        </Typography>
      </Alert>
    </Snackbar>
  </>);
}

function refreshMessages() {
  throw new Error('Function not implemented.');
}

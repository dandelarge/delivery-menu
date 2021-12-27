import React, { useState } from 'react';
import { Alert, AppBar, Box, Button, Container, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';
import { SwipeableEdgeDrawer } from './Drawer';
import { OrderSummary } from './OrderSumary';
import { Sidebar } from './Sidebar';
import { BottomDrawerProvider } from '../providers/bottom-drawer-provider';


export function Layout() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(auth.authenticated);


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
      flexDirection: 'column',
      backgroundImage: 'url(/tacostest.jpg)'
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
      autoHideDuration={2000}
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


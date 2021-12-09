import React, { useEffect } from 'react';
import { AppBar, Box, Button, Container, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';
import { SwipeableEdgeDrawer } from './Drawer';
import { useOrder } from '../providers/order-provider';
import { OrderSummary } from './OrderSumary';

export function Layout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {userName, userId} = auth;

  const { total } = useOrder();

  async function handleLogout() {
    await auth.logout();
    navigate('/login');
  }

  return (<>
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Welcome {userName}!
          </Typography>
          <Button onClick={handleLogout}>logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{flexGrow: 1}}>
          <Box sx={{
            mb: 8
          }}>
            <Outlet />
          </Box>
          <SwipeableEdgeDrawer title={`total: ${total} €` }>
            <OrderSummary></OrderSummary>
          </SwipeableEdgeDrawer>
      </Container>
    </Box>
  </>);
}
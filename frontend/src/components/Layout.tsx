import React, { useEffect } from 'react';
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Container, IconButton, List, ListItem, Paper, Toolbar, Typography } from '@mui/material';
import { Menu, Restore, Favorite, Archive } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';
import { SwipeableEdgeDrawer } from './Drawer';
import { useOrder } from '../providers/order-provider';
import { OrderSummary } from './OrderSumary';

export function Layout() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

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
          <SwipeableEdgeDrawer title={`total: ${total} €` }>
            <OrderSummary></OrderSummary>
          </SwipeableEdgeDrawer>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<Restore />} />
          <BottomNavigationAction label="Favorites" icon={<Favorite />} />
          <BottomNavigationAction label="Archive" icon={<Archive />} />
        </BottomNavigation>
      </Paper>
    </Box>
  </>);
}

function refreshMessages() {
  throw new Error('Function not implemented.');
}

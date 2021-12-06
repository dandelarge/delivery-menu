import { AppBar, Box, Button, Container, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './App';

export function Layout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {userName, userId} = auth;

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
      <AppBar position="static">
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
        {/* <nav>
          <List>
            <ListItem><Link to="/menu" >menu</Link></ListItem>
            <ListItem><Link to="/users" >users</Link></ListItem>
            <ListItem><Link to="/public" >public</Link></ListItem>
          </List>
        </nav> */}
          <Outlet />
      </Container>
    </Box>
  </>);
}
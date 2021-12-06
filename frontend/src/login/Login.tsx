import { Button, Card, Container, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

export const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log(auth);
    if (auth.authenticated) {
      navigate(from, { replace: true });
    }
  }, [auth.authenticated]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = await auth.login(user, pass);
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{
        height: '100vh',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <form onSubmit={handleSubmit}>
          <Stack >
            <TextField label="username" onChange={e => setUser(e.currentTarget.value)} value={user}></TextField>
            <TextField label="password" onChange={e => setPass(e.currentTarget.value)} value={pass} type="password"></TextField>
            <Button type="submit">Login</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
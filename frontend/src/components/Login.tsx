import { Stop } from '@mui/icons-material';
import { Alert, Button, Card, Container, Snackbar, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';

export const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [hasError, setHasError] = useState(auth.hasError);

  useEffect(() => {
    if (auth.authenticated) {
      navigate(from, { replace: true });
    }
  }, [auth.authenticated]);

  useEffect(() => {
    setHasError(auth.hasError);
  }, [auth.hasError])


  function handleSnackbarClose() {
    setHasError(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    auth.login(user, pass).then(() => setHasError(auth.hasError));
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
          <Snackbar
            anchorOrigin={{vertical:'top', horizontal:'center'}}
            open={hasError}
            autoHideDuration={10000}
            onClose={handleSnackbarClose}
          >
            <Alert severity='error'>Wrong credentials :(</Alert>
          </Snackbar>
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
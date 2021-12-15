import { Stop } from '@mui/icons-material';
import { Alert, AlertColor, Button, Card, Container, FormControl, Snackbar, Stack, styled, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';

const StyledTF = styled(TextField)(theme => ({
  margin: 8,
  maxWidth: 680,
  minWidth: 200
}));

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  padding: 8
});

const RoundImage = styled('img')({
  width: 160,
  height: 160,
  borderRadius: 80
});

export const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [severity, setSeverity] = useState('error');
  const [alertText, setAlertText] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [messageDuration, setMessageDuration] = useState(3000);

  const [hasError, setHasError] = useState(auth.hasError);

  useEffect(() => {
    if (auth.authenticated) {
      navigate(from, { replace: true });
    }
    setSeverity('success');
    setAlertText('See you Soon 🐒');
    setIsSnackbarOpen(true);
  }, [auth.authenticated]);

  useEffect(() => {
    if(!auth.hasError) return;
    setHasError(auth.hasError);
    setSeverity('error');
    setAlertText('wrong credentials 🙈');
    setIsSnackbarOpen(true);
  }, [auth.hasError])


  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    auth.login(user, pass).then(() => setHasError(auth.hasError));
  }


  return (
    <Container maxWidth="xs">
      <Snackbar
        anchorOrigin={{vertical:'top', horizontal:'center'}}
        open={hasError}
        autoHideDuration={messageDuration}
        onClose={handleSnackbarClose}
      >
        <Alert severity={(severity as AlertColor)}>{alertText}</Alert>
      </Snackbar>
      <Box sx={{
        height: '100vh',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Typography variant="h4" sx={{my: 4}} color="secondary">Latin Sessions</Typography>
        <RoundImage src="/arribalasmarihuanas.jpeg" />
        <Typography variant="h6" sx={{mb: 2}} >ay no</Typography>
        <StyledForm onSubmit={handleSubmit}>
            <StyledTF
              label="username"
              onChange={e => setUser(e.currentTarget.value)}
              value={user}
              color="primary"
            ></StyledTF>

            <StyledTF
              label="password"
              onChange={e => setPass(e.currentTarget.value)}
              value={pass}
              type="password"
              color="primary"
            ></StyledTF>

            <Button type="submit" variant="outlined" sx={{m: 1}}>Login</Button>
        </StyledForm>
      </Box>
    </Container>
  );
}
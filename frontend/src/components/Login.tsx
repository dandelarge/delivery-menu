import { Alert, AlertColor, AlertTitle, Button, Container, Snackbar, styled, TextField, Typography } from '@mui/material';
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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(auth.hasError);
  const [messageDuration, setMessageDuration] = useState(4000);

  useEffect(() => {
    if (auth.authenticated) {
      navigate(from, { replace: true });
    }
    setSeverity('success');
    setAlertText('See you Soon 🐒');
    setMessageDuration(2000);
    setIsSnackbarOpen(true);
  }, [auth.authenticated, navigate, from]);

  useEffect(() => {
    if(!auth.hasError) return;
    setSeverity('error');
    setAlertText('wrong credentials 🙈');
    setIsSnackbarOpen(true);
  }, [auth.hasError])


  function handleSnackbarClose() {
    setIsSnackbarOpen(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    auth.login(user, pass).then(() => setIsSnackbarOpen(auth.hasError));
  }


  return (
    <Container maxWidth="xs">
      <Snackbar
        anchorOrigin={{vertical:'top', horizontal:'center'}}
        open={isSnackbarOpen}
        autoHideDuration={messageDuration}
        onClose={handleSnackbarClose}
      >
        <Alert severity={(severity as AlertColor)} sx={{mt: 4}} variant='outlined'>
          <AlertTitle>{alertText}</AlertTitle>
        </Alert>
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
import React from 'react';
import { Card, CardContent, CardActions, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../providers/auth-provider';
import { useOrderWave } from '../providers/orderwave-provider';


export function ActionsPanel({children}:{children: JSX.Element}) {

  const {isHandler, userName} = useAuth();
  const {handler} = useOrderWave();

  const showhandlerDetails = () => isHandler() && userName === handler;

  return (<Card sx={{my: 2}}>
    <CardContent>
      {children}
      <Stack>
      { showhandlerDetails() && <Button sx={{my:1}} size="small" to={`/create-menu`} component={RouterLink} >change the Menu</Button> }
      { isHandler() && <Button sx={{my:1}} size="small" color="secondary" to={`/make-orderwave`} component={RouterLink}>Make new OrderWave</Button> }
      </Stack>
    </CardContent>
    <CardActions>
      <Button size="small" to={`/menu`} component={RouterLink} sx={{ml: 'auto'}}>
          Menu
      </Button>
    </CardActions>
  </Card>);
}
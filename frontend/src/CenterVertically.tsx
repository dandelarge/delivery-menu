import { Box } from '@mui/system';
import React from 'react';

export function CenterVertically({children}: {children: JSX.Element}) {
  return (<Box sx={{
    flexGrow: 1,
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>{children}</Box>);
}
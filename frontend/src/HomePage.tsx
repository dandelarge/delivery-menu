import { Box, Button, Card, CardActions, CardContent, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CenterVertically } from './CenterVertically';

export function HomePage() {
  return (<>
    <Typography variant="h6" sx={{mb: 2, mt: 2}}>Home Page</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">Lucas is ordering on Sunday</Typography>
          <Typography variant="body1"> Order before 8pm</Typography>
        </CardContent>
        <CardActions>
          <Button variant="text" to='/menu' component={RouterLink}>
              Check the menu out
          </Button>
        </CardActions>
      </Card>
  </>);
}
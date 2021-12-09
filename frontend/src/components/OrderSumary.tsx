import { Box, Button, Card, CardActions, CardContent, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useOrder } from '../providers/order-provider';



export function OrderSummary() {
  const {items, saveOrder} = useOrder();

  function handleSaveButtonClick() {
    saveOrder();
  }


  return (
    <Box sx={{
      height: '100%',
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
      }}>
    <List sx={{flexGrow: 1}}>
    {items && items.map( ({item, qty, subtotal}) => (
      <ListItem key={item}>
        <Typography variant="caption">{qty}g.</Typography>
        <Box component='span' sx={{mr: 1, ml: 1}}>-</Box>
        <Typography variant="caption" sx={{flexGrow: 1}}>{item}</Typography>
        <Typography variant="caption">{subtotal}</Typography>
      </ListItem>
    ))}
    </List>
    <Button onClick={handleSaveButtonClick} variant="contained" color="secondary" sx={{ml: 'auto'}}>Save The order</Button>
    </Box>
);
}
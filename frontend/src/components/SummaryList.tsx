import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { OrderItem } from '../providers/order-provider';

interface Props {
  items: OrderItem[]
}

export default function SummaryList({items}: Props) {

  return (
    <List sx={{flexGrow: 1, overflow: 'scroll'}}>
      {items && items.map( ({item, qty, subtotal}) => (
        <ListItem key={item}>
          <Typography variant="caption">{qty}g.</Typography>
          <Box component='span' sx={{mr: 1, ml: 1}}>-</Box>
          <Typography variant="caption" sx={{flexGrow: 1, textDecoration:qty?'none':'line-through'}}>{item}</Typography>
          <Typography variant="caption">{subtotal}</Typography>
        </ListItem>
      ))}
      </List>
  )
}

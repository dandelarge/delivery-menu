import { Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useOrder } from '../providers/order-provider'
import { OrderSummary } from './OrderSumary'
import SummaryList from './SummaryList'

export default function OwnOrderSummary() {

  const {items, total} = useOrder();
  return (
    <Card sx={{mb: 2}}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{mb: 1}}>Your order</Typography>
        <SummaryList items={items || []} />
        <Box sx={{display: 'flex'}}>
          <Typography variant="body1" component="div" sx={{ml: 'auto', mr: 2}}>total: {total}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

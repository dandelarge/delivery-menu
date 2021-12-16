import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Typography } from '@mui/material';
import { useOrderWave } from '../providers/orderwave-provider';
import { ExpandMore } from '@mui/icons-material';
import SummaryList from './SummaryList';

export function OrderWaveOrders() {
  const {orders} = useOrderWave();

  return (<Card>
    <CardContent>
      <Typography variant="h6"> These people are ordering:</Typography>
      {orders?.map( order =>
        (<Box sx={{mb: 2, mt:2}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore/>}
              >
              <Typography variant="body1" component="div" color="secondary">{order.user?.name}: {order.total} €</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SummaryList items={order.items || []} />
            </AccordionDetails>
          </Accordion>
        </Box>)
      )}
    </CardContent>
  </Card>);
}
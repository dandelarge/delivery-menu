import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useOrderWave } from '../providers/orderwave-provider';
import { ExpandMore } from '@mui/icons-material';
import SummaryList from './SummaryList';
import { OrderWaveSummary } from './OrderWaveSummary';
import { OrderWaveOrders } from './OrderWaveOrders';
import { OrderWaveDetails } from './OrderWaveDetails';
import { ActionsPanel } from './ActionsPanel';
import { useAuth } from '../providers/auth-provider';

interface OrderWaveData {
  handler: string;
  order_before: string;
  menu_id: string;
}



export function HomePage() {

  const {isHandler, userName} = useAuth();
  const {handler} = useOrderWave();

  const showhandlerDetails = () => isHandler() && userName === handler;

  return (<>
    <Typography variant="h6" sx={{mb: 2, mt: 2}}>Home Page</Typography>
      <ActionsPanel>
        <OrderWaveDetails />
      </ActionsPanel>
      {showhandlerDetails() && <>
        <OrderWaveSummary />
        <OrderWaveOrders />
      </>}
  </>);
}
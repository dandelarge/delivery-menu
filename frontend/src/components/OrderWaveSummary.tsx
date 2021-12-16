import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useOrderWave } from '../providers/orderwave-provider';
import SummaryList from './SummaryList';

export function OrderWaveSummary() {
  const {summary, total} = useOrderWave();
  return (<Card sx={{ mb: 2}}>
    <CardContent>
      <Typography variant="h6">Everyone's Total: {total} €</Typography>
      <SummaryList items={summary || []} />
    </CardContent>
  </Card>);
}
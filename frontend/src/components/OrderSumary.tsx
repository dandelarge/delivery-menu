import { Box, Button, List, ListItem, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useBottomDrawer } from '../providers/bottom-drawer-provider';
import { useOrder } from '../providers/order-provider';
import SummaryList from './SummaryList';
import { useOrderWave } from '../providers/orderwave-provider';



export function OrderSummary() {
  const {fetchOrderWave} = useOrderWave();
  const {items, saveOrder} = useOrder();
  const {closeBottomDrawer} = useBottomDrawer();

  function handleSaveButtonClick() {
    saveOrder();
    closeBottomDrawer();
    if(fetchOrderWave) fetchOrderWave();
  }


  return (<>
    <Box sx={{
      height: '100%',
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
      }}
    >
      <SummaryList items={items || []} />
      <Button
        onClick={handleSaveButtonClick}
        variant="contained"
        color="secondary"
        sx={{ml: 'auto'}}
      >
        Save The order
      </Button>
    </Box>
</>);
}
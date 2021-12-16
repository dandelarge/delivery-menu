import React from 'react';
import { Box, Button } from '@mui/material';
import { useBottomDrawer } from '../providers/bottom-drawer-provider';
import { useOrder } from '../providers/order-provider';
import SummaryList from './SummaryList';
import { useOrderWave } from '../providers/orderwave-provider';
import { useNavigate } from 'react-router-dom';

export function OrderSummary() {
  const {fetchOrderWave} = useOrderWave();
  const {items, saveOrder, updateItems, updateTotal} = useOrder();
  const {closeBottomDrawer} = useBottomDrawer();
  const navigate = useNavigate();

  function handleSaveButtonClick() {
    saveOrder();
    if(closeBottomDrawer) closeBottomDrawer();
    if(fetchOrderWave) fetchOrderWave();
    navigate('/');
  }

  function handleDeleteButtonClick() {
    updateItems([]);
    updateTotal(0);
  }


  return (<>
    <Box sx={{
      height: '100%',
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      }}
    >
      <SummaryList items={items || []} />
      <Box sx={{
        display:'flex',
        justifyContent: 'space-between',
        flexDirection: 'row-reverse'
      }}>
        <Button
          onClick={handleSaveButtonClick}
          variant="contained"
          color="secondary"
        >
          Save The order
        </Button>
        { items && items.length > 0 && <Button
          onClick={handleDeleteButtonClick}
          variant="contained"
          color="error"
        >
          delete all
        </Button>}
      </Box>
    </Box>
</>);
}
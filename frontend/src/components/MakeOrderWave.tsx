import React, { FormEvent, FormEventHandler, useState } from 'react';
import { Card, CardContent, TextField, Typography, Stack, Button, FormControl, Box } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import { useAuth } from '../providers/auth-provider';
import { client } from '../api-client';
import { useOrder } from '../providers/order-provider';
import { useOrderWave } from '../providers/orderwave-provider';
import { useNavigate } from 'react-router';

export default function MakeOrderWave() {
  const [orderBefore, setOrderBefore] = useState<Date | null>(new Date());
  const {userId} = useAuth();
  const orderWave = useOrderWave();
  const navigate = useNavigate();


  function createOrderWave<HTMLFormElement>(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const requestBody = {
      handler: userId,
      order_before: orderBefore
    };

    client.post('order-wave', requestBody).then( () => {
      if (orderWave.fetchOrderWave) {
        return orderWave?.fetchOrderWave();
      }
      return null;
    }).then(() => {
      return navigate('/');
    });
  }

  return (
    <>
      <Typography variant="h5" sx={{ my: 2 }}> Make a New Orderwave</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div"></Typography>
          <form onSubmit={createOrderWave}>
            <Box sx={{mb:2}}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Order before:"
                value={orderBefore}
                onChange={(newValue) => {
                  setOrderBefore(newValue);
                }}
              />
              </Box>
              <Button type="submit" variant="contained"> create orderWave</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

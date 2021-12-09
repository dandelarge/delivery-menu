import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useOrderWave } from '../providers/orderwave-provider';
import { ExpandMore } from '@mui/icons-material';

interface OrderWaveData {
  handler: string;
  order_before: string;
  menu_id: string;
}

// const orderWave: OrderWaveData = {
//   handler: 'Lucas',
//   order_before: new Date('Dec 11 2021 20:00:00').toString(),
//   menu_id: '912873-192837-219387-123'
// };

function getDayNumberWord(dayNumber?: number): string {

  if (!dayNumber || dayNumber > 7 || dayNumber < 1) {
    return 'Danielsday';
  }

  const daysMap = new Map<number, string>([
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friyay"],
    [6, "Saturday"],
    [7, "Sunday"]
  ]);

  return daysMap.get(dayNumber) || 'Danielsday';
}

function setTwoDigits(digit: number) {
  if (digit < 10) {
    return '0'+digit;
  }
  return String(digit);
}

function getHoursAndMinutes(date: Date) {
  const hours = setTwoDigits(date.getHours());
  const minutes = setTwoDigits(date.getMinutes());

  return [hours, minutes].join(':');
}

export function HomePage() {

  const orderWave = useOrderWave();
  const {orders} = orderWave;

  const {handler, menuId, orderBefore } = orderWave;
  const orderDate = new Date(orderBefore || '');
  const dayOfTheWeek = getDayNumberWord(orderDate.getDay());
  const orderClosingTime = getHoursAndMinutes(orderDate);


  return (<>
    <Typography variant="h6" sx={{mb: 2, mt: 2}}>Home Page</Typography>
      <Card sx={{mb: 2}}>
        <CardContent>
          <Typography variant="h6" component="div">{handler} is ordering on {dayOfTheWeek}</Typography>
          <Typography variant="body1"> Order before {orderClosingTime}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="text" to={`/menu/${menuId}`} component={RouterLink}>
              Check the menu out
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6"> These people are ordering:</Typography>
          {orders?.map( order => {
            return (<Box sx={{mb: 2, mt:2}}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore/>}
                  >
                  <Typography variant="body1" component="div" color="secondary">{order.user?.username}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {order.items?.map( item => (<Box >
                    <Typography variant="caption" color="primary"> {item.qty} g</Typography>
                    <Box sx={{m:1}} component="span">-</Box>
                    <Typography variant="caption" color="primary"> {item.item} </Typography>
                  </Box>))}
                </AccordionDetails>
              </Accordion>
            </Box>);
          })}
        </CardContent>
      </Card>
  </>);
}
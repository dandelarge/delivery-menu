import React from 'react';
import { Divider, Typography } from '@mui/material';
import { useOrderWave } from '../providers/orderwave-provider';
import { useAuth } from '../providers/auth-provider';

function getDayNumberWord(dayNumber?: number): string {

  if (
    dayNumber === undefined
    || dayNumber === null
    || dayNumber > 6
    || dayNumber < 0
  ) {
    return 'Danielsday';
  }

  const daysMap = new Map<string, string>([
    ["2", "Monday"],
    ["3", "Tuesday"],
    ["4", "Wednesday"],
    ["5", "Thursday"],
    ["6", "Friyay"],
    ["7", "Saturday"],
    ["1", "Sunday"]
  ]);

  return daysMap.get(String(dayNumber + 1)) || 'Danielsday';
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

export function OrderWaveDetails() {
  const orderWave = useOrderWave();
  const {userName} = useAuth();

  const {handler, orderBefore } = orderWave;
  const orderDate = new Date(orderBefore || '');
  const dayOfTheWeek = getDayNumberWord(orderDate.getDay());
  const orderClosingTime = getHoursAndMinutes(orderDate);

  return (<>
    <Typography variant="h5">{handler === userName ? 'You are': `${handler} is`} ordering on </Typography>
    <Typography variant="h5" color="primary" sx={{mb:2}}>{dayOfTheWeek}</Typography>
    <Divider />
    <Typography sx={{my:2}}> Order before {orderClosingTime}</Typography>
  </>);
}
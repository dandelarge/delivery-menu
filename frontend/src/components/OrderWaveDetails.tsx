import React from 'react';
import { Typography } from '@mui/material';
import { useOrderWave } from '../providers/orderwave-provider';
import { useAuth } from '../providers/auth-provider';

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

export function OrderWaveDetails() {
  const orderWave = useOrderWave();
  const {userName} = useAuth();

  const {handler, orderBefore } = orderWave;
  const orderDate = new Date(orderBefore || '');
  const dayOfTheWeek = getDayNumberWord(orderDate.getDay());
  const orderClosingTime = getHoursAndMinutes(orderDate);

  return (<>
    <Typography variant="h6" component="div">{handler === userName ? 'You are': `${handler} is`} ordering on {dayOfTheWeek}</Typography>
    <Typography variant="body1"> Order before {orderClosingTime}</Typography>
  </>);
}
import React, { useEffect, useState } from 'react';
import { IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, AddCircle, Remove, RemoveCircle } from '@mui/icons-material';
import { client } from '../api-client';
import { OrderItem, useOrder } from '../providers/order-provider';
import { useMenu } from '../providers/menu-provider';

export interface MenuItem {
  name: string;
  price: number
};

export interface MenuData {
  items: MenuItem[];
  id: string;
}


const DataRow = ({
    name,
    price,
    onRemove,
    onAdd,
    highlight,
  }: {
    name: string,
    price: number,
    onRemove: (name: string) => void,
    onAdd: (name: string) => void,
    highlight?: boolean
  }) => {

  return (<TableRow selected={highlight}>
      <TableCell> {name} </TableCell>
      <TableCell align="center"> {price} </TableCell>
      <TableCell sx={{textAlign: 'right', minWidth: '8em'}}>
        <IconButton onClick={() => onRemove(name)} color="secondary">
          <Remove></Remove>
        </IconButton>
        <IconButton onClick={() => onAdd(name)} color="secondary">
          <Add></Add>
        </IconButton>
      </TableCell>
  </TableRow>)
};

export const Menu = () => {
  const {items: menuItems, priceMap} = useMenu();

  const {items: orderItems, updateItems, updateTotal} = useOrder() || [];

  useEffect(() => {
    console.log(priceMap);
  }, [priceMap])

  const summaryMap = new Map();
  orderItems?.forEach( ({item, qty}) => summaryMap.set(item, qty));

  function buildOrderSummary(map: Map<string, number>) {
    const orderSummary: any[] = [];
    summaryMap.forEach( (qty: number, name: string) => {
      const subtotal = qty * (priceMap.get(name) || 0);
      orderSummary.push({ item: name, qty, subtotal });
    });
    return orderSummary.filter( ({qty}) => qty > 0);
  }

  function addSubtotals(summary: any[]): number {
    return summary.reduce( (prev: number, curr) => prev + curr.subtotal, 0);
  }

  function handleRemoveButtonClick(name: string) {
    const existingSummary = summaryMap.get(name) || 0;
    if (existingSummary <= 0 ) {
      return;
    }

    summaryMap.set(name, existingSummary - 1);
    const summary = buildOrderSummary(summaryMap);
    updateItems(summary);

    const total = addSubtotals(summary);
    updateTotal(total);
  }

  function handleAddButtonClick(name: string) {
    const existingSummary = summaryMap.get(name) || 0;
    summaryMap.set(name, existingSummary + 1);
    const summary = buildOrderSummary(summaryMap);
    updateItems(summary);

    const total = addSubtotals(summary);
    updateTotal(total);
  }

  return (<>
    <Typography variant='h6' sx={{mt: 2, mb: 2}}>Menu 🍀🍀🍀</Typography>

    <TableContainer component={Paper}>
      <Table>
          <TableHead>
              <TableRow>
                  <TableCell>🌱 Dish</TableCell>
                  <TableCell>💶 Price</TableCell>
                  <TableCell></TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {menuItems && menuItems?.map( ({name, price}) => {
                  return (<DataRow
                    onRemove={handleRemoveButtonClick}
                    onAdd={handleAddButtonClick}
                    name={name}
                    price={price}
                    highlight={summaryMap.has(name)}
                    key={name}
                  ></DataRow>);
              })}
          </TableBody>
      </Table>
    </TableContainer>
  </>);
}
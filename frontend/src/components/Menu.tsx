import React, { useEffect, useState } from 'react';
import { IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { client } from '../api-client';
import { OrderItem, useOrder } from '../providers/order-provider';

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
    onAdd
  }: {
    name: string,
    price: number,
    onRemove: (name: string) => void,
    onAdd: (name: string) => void}) => {

  return (<TableRow>
      <TableCell> {name} </TableCell>
      <TableCell align="center"> {price} </TableCell>
      <TableCell sx={{textAlign: 'right', minWidth: '8em'}}>
        <IconButton onClick={() => onRemove(name)} color="primary">
          <RemoveCircle></RemoveCircle>
        </IconButton>
        <IconButton onClick={() => onAdd(name)} color="primary">
          <AddCircle ></AddCircle>
        </IconButton>
      </TableCell>
  </TableRow>)
};

export const Menu = () => {
  const [menu, setMenu] = useState<MenuData>();
  const [priceMap, setPriceMap] = useState(new Map<string, number>());


  const {items, updateItems, updateTotal} = useOrder() || [];

  const summaryMap = new Map();
  items?.forEach( ({item, qty}) => summaryMap.set(item, qty));

  useEffect(() => {
    client.get('menu').then( ({data}) => {
      setMenu(data);
      const priceMap = new Map<string, number>();
      data.items.forEach( ({name, price}: MenuItem) => priceMap.set(name, price));
      setPriceMap(priceMap);
    });
  }, []);

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
              {menu?.items.map( ({name, price}) => {
                  return (<DataRow
                    onRemove={handleRemoveButtonClick}
                    onAdd={handleAddButtonClick}
                    name={name}
                    price={price}
                    key={name}
                  ></DataRow>);
              })}
          </TableBody>
      </Table>
    </TableContainer>
  </>);
}
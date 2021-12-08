import React, { useEffect, useState } from 'react';
import { IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { client } from '../api-client';
import { useParams } from 'react-router-dom';

export interface MenuItem {
  name: string;
  price: number
};

export interface MenuData {
  items: MenuItem[];
  id: string;
}
interface MenuState {
  totalPieces: number;
  totalPrice: number;
}

interface ItemInfo {
  qty: number;
  name: string;
  price: number;
}

interface BbqListProps {
  menu: MenuItem[];
}

const DataRow = ({name, price}: MenuItem) => {
  return (<TableRow>
      <TableCell> {name} </TableCell>
      <TableCell align="center"> {price} </TableCell>
      <TableCell sx={{textAlign: 'right', minWidth: '8em'}}>
        <IconButton color="primary">
          <RemoveCircle></RemoveCircle>
        </IconButton>
        <IconButton color="primary">
          <AddCircle></AddCircle>
        </IconButton>
      </TableCell>
  </TableRow>)
};

export const Menu = () => {
  const [menu, setMenu] = useState<MenuData>();
  const params = useParams();
  console.log(params);

  useEffect(() => {
    client.get('menu').then( ({data}) => {
      setMenu(data);
    });
  }, [])

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
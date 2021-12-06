import React, { useState } from 'react';
import { IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';

const menuList: MenuItem[] = [
  {
    id: '1',
    name: 'hash',
    price: 10.5
  },{
    id: '2',
    name: 'gorilla weed',
    price: 7
  },{
    id: '3',
    name: 'strong shit',
    price: 8.5
  },{
    id: '4',
    name: 'the less strong shit',
    price: 15
  },{
    id: '5',
    name: 'the fuck is this',
    price: 14
  },{
    id: '6',
    name: 'im tired',
    price: 20
  },{
    id: '7',
    name: 'of writing',
    price: 22
  }
];

export interface MenuItem {
  id: string;
  name: string;
  price: number
};

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

const DataRow = ({id, name, price}: MenuItem) => {
  return (<TableRow key={id}>
      <TableCell> {name} </TableCell>
      <TableCell align="center"> {price} </TableCell>
      <TableCell sx={{textAlign: 'right', minWidth: '8em'}}>
        <IconButton color="primary">
          <Remove></Remove>
        </IconButton>
        <IconButton color="primary">
          <Add></Add>
        </IconButton>
      </TableCell>
  </TableRow>)
};

export const Menu = () => {
  const [menu, setMenu] = useState(menuList);

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
              {menu.map( ({id, name, price}) => {
                  return (<DataRow
                      id={id}
                      name={name}
                      price={price}
                      key={id}
                  ></DataRow>);
              })}
          </TableBody>
      </Table>
    </TableContainer>
  </>);
}
import React, { useEffect } from 'react';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useOrder } from '../../providers/order-provider';
import { useMenu } from '../../providers/menu-provider';
import EditPopover from './EditPopover';

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
  handleClick
}: {
  name: string,
  price: number,
  onRemove: (name: string) => void,
  onAdd: (name: string) => void,
  highlight?: boolean,
  handleClick: (event: React.MouseEvent<HTMLElement>, setAnchor: boolean) => void
}) => {

  return (<TableRow selected={highlight}>
    <TableCell> {name} </TableCell>
    <TableCell align="center"> {price} </TableCell>
    <TableCell sx={{ textAlign: 'right', minWidth: '8em' }}>
      <IconButton onClick={(e) => { onRemove(name); handleClick(e, true) }} color="secondary">
        <Remove></Remove>
      </IconButton>
      <IconButton onClick={(e) => { onAdd(name); handleClick(e, true) }} color="secondary">
        <Add></Add>
      </IconButton>
    </TableCell>
  </TableRow>)
};

export const Menu = () => {
  const { items: menuItems, priceMap } = useMenu();

  const { summaryMap, updateSummaryAndTotal } = useOrder() || [];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentItem, setCurrentItem] = React.useState('');
  const [qtyInputValue, setQtyInputValue] = React.useState(summaryMap.get(currentItem));

  const handleClick = (event: React.MouseEvent<HTMLElement>, setAnchor: boolean) => {
    if (setAnchor) setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setQtyInputValue(summaryMap.get(currentItem));
  }, [currentItem])

  function handleRemoveButtonClick(name: string) {
    setCurrentItem(name);
    const existingSummary = summaryMap.get(name) || 0;
    if (existingSummary <= 0) {
      return;
    }

    summaryMap.set(name, existingSummary - 1);
    setQtyInputValue(summaryMap.get(name));
    updateSummaryAndTotal(priceMap);
  }

  function handleAddButtonClick(name: string) {
    setCurrentItem(name);
    const existingSummary = summaryMap.get(name) || 0;
    summaryMap.set(name, existingSummary + 1);
    setQtyInputValue(summaryMap.get(name));
    updateSummaryAndTotal(priceMap);
  }

  function handleDeleteButtonClick(name: string) {
    summaryMap.set(name, 0);
    updateSummaryAndTotal(priceMap);
  }

  function handleQtyInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.currentTarget.value);
    setQtyInputValue(value);
    summaryMap.set(currentItem, value);
    updateSummaryAndTotal(priceMap);
  }

  return (<>
    <EditPopover
      anchorEl={anchorEl}
      currentItem={currentItem}
      qtyInputValue={qtyInputValue}
      handleAddButtonClick={handleAddButtonClick}
      handleRemoveButtonClick={handleRemoveButtonClick}
      handleDeleteButtonClick={handleDeleteButtonClick}
      handleClick={handleClick}
      handleChange={handleQtyInputChange}
    />
    <Typography variant='h6' sx={{ my: 2 }}>Menu 🍀🍀🍀</Typography>

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
          {menuItems && menuItems?.map(({ name, price }) => {
            return (<DataRow
              onRemove={handleRemoveButtonClick}
              onAdd={handleAddButtonClick}
              name={name}
              price={price}
              highlight={summaryMap && summaryMap.has(name) && !!summaryMap.get(name)}
              key={name}
              handleClick={handleClick}
            ></DataRow>);
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>);
}
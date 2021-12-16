import React, { useEffect } from 'react';
import { Box, Card, CardActions, CardContent, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Check, Delete, Remove } from '@mui/icons-material';
import { useOrder } from '../providers/order-provider';
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

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentItem, setCurrentItem] = React.useState('');

  const handleClick = (event: React.MouseEvent<HTMLElement>, setAnchor: boolean) => {
    if (setAnchor) setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  useEffect(() => {
    console.log(priceMap);
  }, [priceMap])


  function handleRemoveButtonClick(name: string) {
    setCurrentItem(name);
    const existingSummary = summaryMap.get(name) || 0;
    if (existingSummary <= 0) {
      return;
    }

    summaryMap.set(name, existingSummary - 1);
    updateSummaryAndTotal(priceMap);
  }

  function handleAddButtonClick(name: string) {
    setCurrentItem(name);
    const existingSummary = summaryMap.get(name) || 0;
    summaryMap.set(name, existingSummary + 1);
    updateSummaryAndTotal(priceMap);
  }

  function handleDeleteButtonClick(name: string) {
    summaryMap.set(name, 0);
    updateSummaryAndTotal(priceMap);
    handleClose();
  }

  return (<>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle1">{currentItem}</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              alignItems: 'center'
            }}
          >
            <IconButton onClick={() => handleDeleteButtonClick(currentItem)}>
              <Delete />
            </IconButton>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <IconButton onClick={(e) => { handleRemoveButtonClick(currentItem); handleClick(e, false) }} color="secondary">
                <Remove></Remove>
              </IconButton>
              <Typography variant="subtitle1" sx={{ mx: 1 }} color="primary">{summaryMap.get(currentItem) || 0} g</Typography>
              <IconButton onClick={(e) => { handleAddButtonClick(currentItem); handleClick(e, false) }} color="secondary">
                <Add></Add>
              </IconButton>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
            <IconButton sx={{ml:'auto'}} color="success" onClick={handleClose} size="large">
              <Check></Check>
            </IconButton>
        </CardActions>
      </Card>
    </Popover>
    <Typography variant='h6' sx={{ mt: 2, mb: 2 }}>Menu 🍀🍀🍀</Typography>

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
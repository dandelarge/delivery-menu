import { Delete, Remove, Add, Check } from '@mui/icons-material';
import { Popover, Card, CardContent, Typography, Box, IconButton, TextField, CardActions } from '@mui/material';
import React from 'react';

interface Props {
  anchorEl: HTMLElement | null;
  currentItem: string;
  qtyInputValue: number | undefined;
  handleDeleteButtonClick: (item: string) => void;
  handleRemoveButtonClick: (item: string) => void;
  handleAddButtonClick: (item: string) => void;
  handleClick: (event: React.MouseEvent<HTMLElement>, setAnchor: boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditPopover(props: Props) {
  const {
    anchorEl,
    currentItem,
    qtyInputValue,
    handleDeleteButtonClick,
    handleRemoveButtonClick,
    handleAddButtonClick,
    handleClick,
    handleChange
  } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(anchorEl);
    if (anchorEl) setOpen(true);
  }, [anchorEl]);

  const handleClose = () => {
    setOpen(false);
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (<Popover
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
            <IconButton
              onClick={(e) => {
                handleRemoveButtonClick(currentItem);
                handleClick(e, false);
              }}
              color="secondary">
              <Remove></Remove>
            </IconButton>
            {/* <Typography variant="subtitle1" sx={{ mx: 1 }} color="primary">{summaryMap.get(currentItem) || 0} g</Typography> */}
            <TextField
              variant="standard"
              type="number"
              value={qtyInputValue}
              sx={{width: 20}}
              onChange={handleChange}

            /> g.
            <IconButton
              onClick={(e) => {
                handleAddButtonClick(currentItem);
                handleClick(e, false)
              }}
              color="secondary">
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
  </Popover>);
}
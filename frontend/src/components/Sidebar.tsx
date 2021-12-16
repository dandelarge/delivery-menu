import React from 'react';

import { Home, MenuBook } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean,
  onClose: () => void;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const anchor: Anchor = 'left';

export function Sidebar({ open, onClose }: Props) {

  const navigate = useNavigate();

  function navigateTo(route: string) {
    navigate(route);
    onClose();
  }

  const list = () => (<>
    <List>
      <ListItem button onClick={() => navigateTo('/')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary='Home' />
      </ListItem>
      <ListItem button onClick={() => navigateTo('/menu')}>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText primary='Menu' />
      </ListItem>
    </List>
  </>);

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
    >
      {list()}
    </Drawer>
  );
}
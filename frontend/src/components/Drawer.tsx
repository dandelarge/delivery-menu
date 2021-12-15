import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ButtonGroup, Drawer } from '@mui/material';
import { useBottomDrawer } from '../providers/bottom-drawer-provider';
import { useOrder } from '../providers/order-provider';

const drawerBleeding = 56;

interface Props {
  children: JSX.Element;
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const DrawerHeading = styled(StyledBox)(({theme}) => ({
  position: 'absolute',
  top: -drawerBleeding,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: 'visible',
  right: 0,
  left: 0,
  display: 'flex',
  flexDirection:'column'
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const { total, hasChanges: hasOrderChanges } = useOrder();

  const {bottomDrawerOpen, openBottomDrawer, closeBottomDrawer} = useBottomDrawer();

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiDrawer-paperAnchorBottom': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />

      <Drawer
        anchor="bottom"
        open={bottomDrawerOpen}
        onClose={closeBottomDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerHeading
          onClick={openBottomDrawer}
        >
          <Puller />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2
            }}>
            <Typography variant="h6" sx={{marginLeft:hasOrderChanges?0:'auto'}}>total: {total} €</Typography>
            {hasOrderChanges && !bottomDrawerOpen && <Button variant="contained" color="primary" size="small" >Save the order</Button>}
          </Box>
        </DrawerHeading>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {props.children}
        </StyledBox>
      </Drawer>
    </>
  );
}
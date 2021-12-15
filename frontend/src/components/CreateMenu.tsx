import { FormControl, TextField, Button, Card, CardContent } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { client } from '../api-client';
import { useMenu } from '../providers/menu-provider';
import { useOrder } from '../providers/order-provider';
import { useOrderWave } from '../providers/orderwave-provider';
import { MenuItem } from './Menu';

const defaultInput = `
WEED 🌲🌲 per G
Mimozz (hybrid)🍭🍭🍭12€
Blood Orange (hybrid)🍊🍊🍊12€
Zookies (hybrid)🥮🥮🥮12€
Bacio Gelato (hybrid)🍨🍨🍨12€
Mimosa (hybrid)🌾🌾🌾11€
Gorilla Zkittlez (hybrid) 🦍🍊🦍11€
Melonade (sativa)🍉🍉🍉10€
Strawberry Kush (indica)🍓🍓🍓10€
L.A. Confidential (indica)🌃🌃🌃10€
Shoreline (sativa)🍒🍒🍒10€
Somari (indica)🥧🥧🥧9€
Miss Cookies (hybrid)🍪👸🍪9€
Guanabana #2 (hybrid) 🍈🍈🍈9€
Chocolope (sativa)🍫🍫🍫8.5€
Enemy of the States (indica)🥧🥧🥧8.5€
Lemon Kush (indica)🍋🌿🍋8.5€
Super Lemon Haze (sativa)🍋🍋🍋7€
Super Silver Haze (sativa) 🐊🐊🐊7€
Skunk (indica)🦨🦨🦨7€
Mix Buds 🇳🇱🇳🇱🇳🇱 6€

HASH🍫🍫 per G
Gelato Triple Filtred 🍧🍧🍧15€
Lemonchello Triple Filtred🍋🍋🍋15€
Mandalina Triple Filtred 🍊🍊🍊15€
Barbara Peach Triple Filtred 🍑🍑🍑 15€
Kit & Kat Double Filtred + Wax 🍫🍫🍫13.5€
Biscotti Eggs Double Filtred 🍪🍪🍪 13.5€
Mandarina Eggs Double Filtred 🍊🍊🍊13.5€
Gorilla Zkittlez Eggs Double Filtred🦍🍊🦍13.5€
Golden States Eggs Double Filtred 🍌🍌🍌12.5€
Banana Kush Refiltred 🍌☘️🍌12€
Gorilla Kush Blond Refiltred 🦍☘️🦍10€
Banana Punch Refiltred 🍌🍌🍌10€
Bluberry Kush Filtred Hash 🍒🍓🍒7.5€
Mango Kush Filtred Hash🥭🥭🥭7.5€
Phineapple Express Pollinetor Hash 🍍🍍🍍7€
Orange Bud Maroccan Hash 🍊🍊🍊7€`;

export default function CreateMenu(): JSX.Element {

  const { fetchOrderWave } = useOrderWave();
  const { fetchOrder } = useOrder();
  const navigate = useNavigate();
  const { updateMenu } = useMenu();

  function onMenuCreated(items: MenuItem[]) {
    updateMenu(items).then(() => {
      if(fetchOrderWave) fetchOrderWave();
      fetchOrder();
      navigate('/menu');
    });
  }

  const [menuText, setMenuText] = useState(defaultInput);

  function makeMenuItems() {
    if (!menuText) {
      console.log('textfield is empty yo');
      return;
    }

    const lines: string[] = menuText.split('\n');
    const regex = /(^.+[^\d^\.]|[^\d])([\d\.]{1,4}).?/;
    const menuItems: MenuItem[] = lines
      .filter(line => regex.test(line))
      .map(line => {
        const match = line.match(regex);
        if (!match) return { id: '', name: '', price: 0 };
        return { id: match[0], name: match[1], price: parseFloat(match[2]) }
      });
    if (menuItems !== null && menuItems.length > 0) {
      onMenuCreated(menuItems);
    } else {
      console.error('WTF...');
    }
  }

  return (
    <Card>
      <CardContent>
        <FormControl fullWidth>
          <TextField
            label="paste the menu here 👇🏾"
            multiline
            rows={15}
            variant="outlined"
            onChange={e => setMenuText(e.currentTarget.value)}
            value={menuText}
          ></TextField>
        </FormControl>
        <Button variant="contained" color="primary" onClick={makeMenuItems}> Gogogo! </Button>
      </CardContent>
    </Card>
  )
}

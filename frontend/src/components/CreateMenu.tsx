import React, { useState } from 'react'
import { FormControl, TextField, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router';
import { useMenu } from '../providers/menu-provider';
import { useOrder } from '../providers/order-provider';
import { useOrderWave } from '../providers/orderwave-provider';
import { MenuItem } from './Menu/Menu';

const defaultInput = `
WEED ๐ฒ๐ฒ per G
Mimozz (hybrid)๐ญ๐ญ๐ญ12โฌ
Blood Orange (hybrid)๐๐๐12โฌ
Zookies (hybrid)๐ฅฎ๐ฅฎ๐ฅฎ12โฌ
Bacio Gelato (hybrid)๐จ๐จ๐จ12โฌ
Mimosa (hybrid)๐พ๐พ๐พ11โฌ
Gorilla Zkittlez (hybrid) ๐ฆ๐๐ฆ11โฌ
Melonade (sativa)๐๐๐10โฌ
Strawberry Kush (indica)๐๐๐10โฌ
L.A. Confidential (indica)๐๐๐10โฌ
Shoreline (sativa)๐๐๐10โฌ
Somari (indica)๐ฅง๐ฅง๐ฅง9โฌ
Miss Cookies (hybrid)๐ช๐ธ๐ช9โฌ
Guanabana #2 (hybrid) ๐๐๐9โฌ
Chocolope (sativa)๐ซ๐ซ๐ซ8.5โฌ
Enemy of the States (indica)๐ฅง๐ฅง๐ฅง8.5โฌ
Lemon Kush (indica)๐๐ฟ๐8.5โฌ
Super Lemon Haze (sativa)๐๐๐7โฌ
Super Silver Haze (sativa) ๐๐๐7โฌ
Skunk (indica)๐ฆจ๐ฆจ๐ฆจ7โฌ
Mix Buds ๐ณ๐ฑ๐ณ๐ฑ๐ณ๐ฑ 6โฌ

HASH๐ซ๐ซ per G
Gelato Triple Filtred ๐ง๐ง๐ง15โฌ
Lemonchello Triple Filtred๐๐๐15โฌ
Mandalina Triple Filtred ๐๐๐15โฌ
Barbara Peach Triple Filtred ๐๐๐ 15โฌ
Kit & Kat Double Filtred + Wax ๐ซ๐ซ๐ซ13.5โฌ
Biscotti Eggs Double Filtred ๐ช๐ช๐ช 13.5โฌ
Mandarina Eggs Double Filtred ๐๐๐13.5โฌ
Gorilla Zkittlez Eggs Double Filtred๐ฆ๐๐ฆ13.5โฌ
Golden States Eggs Double Filtred ๐๐๐12.5โฌ
Banana Kush Refiltred ๐โ๏ธ๐12โฌ
Gorilla Kush Blond Refiltred ๐ฆโ๏ธ๐ฆ10โฌ
Banana Punch Refiltred ๐๐๐10โฌ
Bluberry Kush Filtred Hash ๐๐๐7.5โฌ
Mango Kush Filtred Hash๐ฅญ๐ฅญ๐ฅญ7.5โฌ
Phineapple Express Pollinetor Hash ๐๐๐7โฌ
Orange Bud Maroccan Hash ๐๐๐7โฌ`;

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
    const regex = /(^.+[^\d^.]|[^\d])([\d.]{1,4}).?/;
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
            label="paste the menu here ๐๐พ"
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

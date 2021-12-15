import React, { useState, useEffect, useContext } from "react";
import { client } from "../api-client";
import { MenuData, MenuItem } from "../components/Menu";
import { OrderItem } from "./orderwave-provider";

interface MenuContextType {
  items: MenuItem[];
  priceMap: Map<string, number>;
  updateMenu: (items: MenuItem[]) => Promise<void>;
  fetchMenu: () => Promise<void>;
}

export const MenuContext = React.createContext<MenuContextType>(null!);

export function MenuProvider({children}: {children: JSX.Element}) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [priceMap, setPriceMap] = useState(new Map<string, number>());

  const fetchMenu = async () => client.get('menu').then( ({data}) => {
    const map = new Map<string, number>();

    setItems(data.items || []);
    data.items.forEach( ({name, price}: MenuItem) => map.set(name, price));
    setPriceMap(map);
    console.log(data.items, priceMap, map);
  });

  const updateMenu = async (items: MenuItem[]) => client.post('/menu', {items})
    .then(() => fetchMenu());

  useEffect(() => {
    fetchMenu();
  }, [])

  const value = {
    items,
    priceMap,
    fetchMenu,
    updateMenu
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
}

export function useMenu() {
  return useContext(MenuContext)
}
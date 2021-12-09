import React, { useContext, useEffect, useState } from 'react';
import { client } from '../api-client';

export interface OrderItem {
  qty?: number;
  item?: string;
  subtotal?: number;
}

export interface OrderContextType {
  id: string;
  user: string;
  items?: OrderItem[];
  total: number;
  updateItems: (items: OrderItem[]) => void;
  updateTotal: (total: number) => void;
  saveOrder: () => Promise<void>;
}

export const OrderContext = React.createContext<OrderContextType>(null!);

export function OrderProvider({children}: {children: JSX.Element}) {
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{item: ''}]);
  const [total, setTotal] = useState(0);

  const updateItems = (items: OrderItem[]) => setItems(items);
  const updateTotal = (number: number) => setTotal(number);

  useEffect(() => {
    client.get('/orders').then(({data}) => {
      console.log(data)
      setId(data.id);
      setUser(data.user.username);
      setItems(data.items);
      setTotal(data.total);
    })
  }, []);

  const saveOrder = async () => {

    const {data} = await client({
      url: '/orders',
      method: 'PATCH',
      data: { items},
    });

    setId(data.id);
    setItems(data.items);
    setTotal(data.total);

  };

  const value = {
    id,
    user,
    items,
    total,
    updateItems,
    updateTotal,
    saveOrder
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  return useContext(OrderContext)
}
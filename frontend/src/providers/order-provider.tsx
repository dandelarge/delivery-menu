import React, { useContext, useEffect, useState } from 'react';
import { client } from '../api-client';
import { useOrderWave } from './orderwave-provider';

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
  hasChanges: boolean;
  updateItems: (items: OrderItem[]) => void;
  updateTotal: (total: number) => void;
  saveOrder: () => Promise<void>;
  fetchOrder: () => Promise<void>;
}

export const OrderContext = React.createContext<OrderContextType>(null!);

export function OrderProvider({children}: {children: JSX.Element}) {
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{item: ''}]);
  const [total, setTotal] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const updateItems = (items: OrderItem[]) => {
    setItems(items);
    setHasChanges(true);
  }
  const updateTotal = (number: number) => {
    setTotal(number);
    setHasChanges(true);
  }


  const fetchOrder = () => client.get('/orders').then(({data}) => {
    if(!data.id) {
      setItems([]);
      setTotal(0);
      return;
    }
    setId(data.id);
    setUser(data.user.username);
    setItems(data.items);
    setTotal(data.total);
    setHasChanges(false);
  });

  useEffect(() => {
    fetchOrder().catch(error => {
      console.log(error);
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
    setHasChanges(false);
  };

  const value = {
    id,
    user,
    items,
    total,
    updateItems,
    updateTotal,
    saveOrder,
    fetchOrder,
    hasChanges
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  return useContext(OrderContext)
}
import React, { useEffect, useState } from 'react';
import { client } from '../api-client';

export interface OrderItem {
  qty?: number;
  item?: string;
  subtotal?: number;
}

export interface UserModel {
  name?: string;
  id?: string;
  username?: string;
}

export interface OrderModel {
  id?: string;
  user?: UserModel;
  items?: OrderItem[];
  total?: number;
}

export interface OrderWaveContextType {
  id?: string;
  handler?: string;
  orderBefore?: string;
  menuId?: string;
  orders?: OrderModel[];
  summary?: OrderItem[];
  fetchOrderWave: () => Promise<void>;
  total?: number;
}

export const OrderWaveContext = React.createContext<OrderWaveContextType>(null!);

export function OrderWaveProvider({children}: {children: JSX.Element}) {
  const [id, setId] = useState('');
  const [handler, setHandler] = useState('');
  const [orderBefore, setOrderBefore] = useState('');
  const [menuId, setMenuId] = useState('');
  const [summary, setSummary] = useState<OrderItem[]>([{item: ''}]);
  const [orders, setOrders] = useState<OrderModel[]>([{id: ''}]);
  const [total, setTotal] = useState(0);

  const fetchOrderWave = () =>  client.get('order-wave').then(({data}) => {
    const { id, handler, order_before, menu_id, summary, orders, total } = data;
    console.log(orders?.map( (order: OrderModel) => order.total));
    setId(id);
    setHandler(handler.name);
    setOrderBefore(order_before);
    setMenuId(menu_id);
    setOrders(orders);
    setSummary(summary);
    setTotal(total);
  });

  useEffect(() => {
    fetchOrderWave();
  }, []);

  const value = {
    id,
    handler,
    orderBefore,
    menuId,
    summary,
    orders,
    total,
    fetchOrderWave
  }

  return <OrderWaveContext.Provider value={value}>{children}</OrderWaveContext.Provider>
}

export function useOrderWave() {
  return React.useContext(OrderWaveContext);
}
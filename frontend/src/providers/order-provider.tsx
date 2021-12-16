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
  originalItems: OrderItem[];
  items?: OrderItem[];
  total: number;
  hasChanges: boolean;
  summaryMap: Map<string, number>;
  updateItems: (items: OrderItem[]) => void;
  updateTotal: (total: number) => void;
  saveOrder: () => Promise<void>;
  fetchOrder: () => Promise<void>;
  updateSummaryAndTotal: (priceMap: Map<string, number>) => void;
}

export const OrderContext = React.createContext<OrderContextType>(null!);

export function OrderProvider({children}: {children: JSX.Element}) {
  const [id, setId] = useState('');
  const [user, setUser] = useState('');
  const [items, setItems] = useState<OrderItem[]>([{item: ''}]);
  const [total, setTotal] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalItems, setoriginalItems] = useState<OrderItem[]>([]);
  const [summaryMap, setSummaryMap] = useState(new Map<string, number>());

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
    setoriginalItems(data.items);
    setItems(data.items);
    setTotal(data.total);
    setHasChanges(false);
    const map = new Map<string, number>();
    data.items?.forEach((item:any) =>
        item.item && item.qty ?
          map.set(item.item, item.qty)
          : null
      );
    setSummaryMap(map);
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
    setItems(data.items as OrderItem[]);
    setTotal(data.total);
    setHasChanges(false);
    const map = new Map<string, number>();
    (data.items as OrderItem[])
      ?.forEach(({ item, qty }) =>
        item && qty ?
          map.set(item, qty)
          : null
      );

    setSummaryMap(map);
  };

  function buildOrderSummary(priceMap: Map<string, number>) {
    const orderSummary: any[] = [];
    summaryMap.forEach((qty: number, name: string) => {
      const subtotal = qty * (priceMap.get(name) || 0);
      orderSummary.push({ item: name, qty, subtotal });
    });
    return orderSummary;
  }

  function addSubtotals(summary: any[]): number {
    return summary.reduce((prev: number, curr) => prev + curr.subtotal, 0);
  }

  function updateSummaryAndTotal(priceMap: Map<string, number>) {
    const summary = buildOrderSummary(priceMap);
    updateItems(summary);
    const total = addSubtotals(summary);
    updateTotal(total);
  }

  const value = {
    id,
    user,
    items,
    total,
    updateItems,
    updateTotal,
    saveOrder,
    fetchOrder,
    hasChanges,
    originalItems,
    summaryMap,
    updateSummaryAndTotal
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  return useContext(OrderContext)
}
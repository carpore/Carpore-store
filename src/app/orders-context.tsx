'use client';
import type React from 'react';
import { createContext, useContext, useState } from 'react';
import type { CartItem } from './cart-context';

export interface Order {
  id: string;
  date: string;
  user: {
    name: string;
    email: string;
    mobile: string;
  };
  items: CartItem[];
  total: number;
  status: 'paid' | 'pending';
  paymentId?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used inside OrdersProvider');
  return ctx;
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  function addOrder(order: Order) {
    setOrders(prev => [order, ...prev]);
  }
  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

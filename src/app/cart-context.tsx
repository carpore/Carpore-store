'use client';
import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  collection: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [ ...prev, { ...item, quantity: 1 } ];
      }
    });
  }

  function removeFromCart(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function changeQuantity(id: string, quantity: number) {
    setItems((prev) => prev.map((i) =>
      i.id === id ? { ...i, quantity } : i
    ).filter((i) => i.quantity > 0));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, changeQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

'use client';
import { useCart } from './cart-context';
import { ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';

export default function FloatingCartButton({
  onClick,
}: { onClick: () => void }) {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <button
      onClick={onClick}
      aria-label="Open cart"
      className="fixed bottom-7 right-7 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[var(--carpore-gold)] shadow-2xl hover:scale-110 active:scale-95 duration-200 border-4 border-[var(--carpore-bg)] focus:outline-none"
      style={{ boxShadow: '0 6px 40px 0 rgba(207,160,70,0.25)' }}
    >
      <ShoppingBag size={30} className="text-[var(--carpore-bg)] drop-shadow" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 min-w-7 h-7 flex items-center justify-center rounded-full bg-[var(--carpore-bg)] text-[var(--carpore-gold)] font-extrabold px-2 text-base shadow-lg ring-2 ring-[var(--carpore-gold)] animate-cartBadge">
          {count}
        </span>
      )}
    </button>
  );
}

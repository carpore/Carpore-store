import { useCart } from './cart-context';
import { X } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

export default function CartDrawer({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { items, removeFromCart, changeQuantity, clearCart, total } = useCart();

  return (
    <>
      {/* Fade overlay */}
      <div
        className={`fixed inset-0 z-40 transition bg-black/50 duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md shadow-lg z-50 bg-[var(--carpore-bg)] transition-transform duration-300 ease-in-out flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="cart drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--carpore-gold)]/40 pb-4">
          <h2 className="text-2xl font-extrabold brand-logo text-[var(--carpore-gold)] tracking-widest uppercase">Cart</h2>
          <button onClick={onClose} aria-label="Close cart" className="p-2 rounded-full hover:bg-[var(--carpore-gold)]/20 transition"><X /></button>
        </div>
        {/* Items */}
        <div className="flex-1 overflow-y-auto py-3 px-4">
          {items.length === 0 ? (
            <div className="text-[var(--carpore-gold)] mt-16 text-lg text-center">Your cart is empty.</div>
          ) : (
            <ul className="space-y-6">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-4 bg-[var(--carpore-gray)] rounded-2xl shadow p-3">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-[var(--carpore-gold)]/30" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[var(--carpore-gold)] text-base truncate brand-logo">{item.name}</div>
                    <div className="text-[var(--carpore-white)]/80 text-xs truncate">{item.collection}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => changeQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1} className="w-7 h-7 rounded-full border border-[var(--carpore-gold)] text-[var(--carpore-gold)] font-bold hover:bg-[var(--carpore-gold)]/20">-</button>
                      <span className="font-bold text-[var(--carpore-white)] mx-1">{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-[var(--carpore-gold)] text-[var(--carpore-gold)] font-bold hover:bg-[var(--carpore-gold)]/20">+</button>
                      <button onClick={() => removeFromCart(item.id)} aria-label="Remove" className="ml-3 px-2 py-1 text-xs text-rose-500 rounded hover:bg-rose-600/10">remove</button>
                    </div>
                  </div>
                  <div className="font-extrabold text-[var(--carpore-gold)] text-lg">₹{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Footer */}
        <div className="p-6 border-t border-[var(--carpore-gold)]/40 bg-[var(--carpore-bg)]">
          <div className="flex items-center justify-between mb-5">
            <span className="text-lg font-bold text-[var(--carpore-gold)]">Subtotal</span>
            <span className="font-extrabold text-xl text-[var(--carpore-gold)]">₹{total}</span>
          </div>
          <Link
            href="/checkout"
            className={
              "w-full block bg-[var(--carpore-gold)] text-[var(--carpore-bg)] font-bold text-lg rounded-full py-3 shadow-lg hover:scale-[1.03] transition mb-2 text-center" +
              (items.length === 0 ? " pointer-events-none opacity-60" : "")
            }
            onClick={onClose}
            tabIndex={items.length === 0 ? -1 : 0}
            aria-disabled={items.length === 0}
          >
            Checkout
          </Link>
          {items.length > 0 && (
            <button className="w-full mt-2 text-sm text-rose-600 font-bold underline hover:text-rose-500" onClick={clearCart}>Clear Cart</button>
          )}
        </div>
      </aside>
    </>
  );
}

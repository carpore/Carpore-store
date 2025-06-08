import React from 'react';
import { X } from 'lucide-react';
import { useCart } from './cart-context';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: string;
  desc: string;
}

export default function ProductDetailModal({ open, onClose, product }: {
  open: boolean,
  onClose: () => void,
  product: Product | null,
}) {
  const { addToCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Modal Panel */}
      <div
        className={`fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[var(--carpore-bg)] shadow-2xl p-0 transition transform duration-300 ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
        style={{ boxShadow: '0 12px 64px 0 rgba(207,160,70,0.22)' }}
        aria-modal="true"
        role="dialog"
      >
        {product && (
          <>
            <div className="relative h-72 bg-[var(--carpore-gray)] rounded-t-3xl flex items-center justify-center overflow-hidden">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-t-3xl shadow-lg" />
              <button onClick={onClose} className="absolute top-5 right-5 z-10 bg-[var(--carpore-bg)]/[.58] p-2 rounded-full border border-[var(--carpore-gold)] hover:bg-[var(--carpore-gold)]/15 text-[var(--carpore-gold)]"><X /></button>
            </div>
            <div className="px-8 pt-7 pb-8 flex flex-col gap-5">
              <div>
                <div className="brand-logo font-extrabold text-3xl text-[var(--carpore-gold)] mb-1 tracking-wide">{product.name}</div>
                <div className="uppercase text-xs tracking-widest text-[var(--carpore-gold)] font-bold mb-0.5">{product.collection}</div>
                <div className="mb-2 text-lg font-bold text-[var(--carpore-gold)]">₹{product.price}</div>
                <div className="text-[var(--carpore-white)]/90 text-base leading-relaxed mb-2">{product.desc}</div>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[var(--carpore-gold)] text-[var(--carpore-bg)] font-bold text-lg rounded-full py-3 shadow-lg hover:scale-[1.03] transition"
              >
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

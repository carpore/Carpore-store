'use client';
import FloatingCartButton from './FloatingCartButton';
import CartDrawer from './CartDrawer';
import React, { useState } from 'react';
import Link from 'next/link';
import ClientBody from './ClientBody';

function CartDrawerWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {children}
      <FloatingCartButton onClick={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 left-0 z-40 w-full transition backdrop-blur-sm bg-[var(--carpore-bg)]/[.85] border-b border-[var(--carpore-gray)]">
        <nav className="flex items-center justify-between px-10 py-5 max-w-7xl mx-auto">
          <span className="brand-logo text-3xl font-extrabold tracking-widest uppercase text-[var(--carpore-gold)] select-none" style={{fontFamily: 'Montserrat, sans-serif'}}>Carpore</span>
          <ul className="flex gap-8 text-lg font-bold">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/collections">Collections</Link></li>
            /** <li><Link href="/cart">Cart</Link></li> */
            <li><Link href="/orders">Order History</Link></li>
            <li><Link href="/account">Account</Link></li>
          </ul>
        </nav>
      </header>
      <ClientBody>{children}</ClientBody>
    </>
  )
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartDrawerWrapper>
      <LayoutContent>{children}</LayoutContent>
    </CartDrawerWrapper>
  );
}

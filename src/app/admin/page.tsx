'use client';

import { useOrders } from '../orders-context';

export default function AdminPage() {
  const { orders } = useOrders();
  return (
    <main className="min-h-screen pt-14 pb-24 flex flex-col items-center bg-[var(--carpore-bg)]">
      <div className="w-full max-w-5xl bg-[var(--carpore-gray)] rounded-3xl shadow-2xl px-10 py-10 flex flex-col gap-10 mt-12 border-2 border-[var(--carpore-gold)]/40">
        <h1 className="text-4xl brand-logo font-extrabold text-[var(--carpore-gold)] tracking-widest uppercase mb-4">Admin • Orders</h1>
        {orders.length === 0 ? (
          <div className="py-36 text-center text-xl text-[var(--carpore-gold)]">No orders placed yet this session.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-[var(--carpore-gold)] uppercase text-xs border-b border-[var(--carpore-gold)]/30">
                <th className="py-2">Date</th>
                <th className="py-2">Order ID</th>
                <th className="py-2">User</th>
                <th className="py-2">Items</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-[var(--carpore-gold)]/15 hover:bg-[var(--carpore-gold)]/5 transition">
                  <td className="py-4 align-top text-xs font-mono text-[var(--carpore-white)]/80 whitespace-nowrap">{order.date}</td>
                  <td className="py-4 align-top text-[var(--carpore-gold)] font-bold text-xs">{order.id}</td>
                  <td className="py-4 align-top text-[var(--carpore-white)]/90 text-xs">
                    <div><b>{order.user.name}</b></div>
                    <div>{order.user.email}</div>
                    <div>{order.user.mobile}</div>
                  </td>
                  <td className="py-4 align-top">
                    <ul className="space-y-1">
                      {order.items.map(item => (
                        <li key={item.id} className="text-xs text-[var(--carpore-gold)] brand-logo">
                          {item.name} <span className="text-[var(--carpore-white)]/60">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 align-top font-extrabold text-lg text-[var(--carpore-gold)]">₹{order.total}</td>
                  <td className="py-4 align-top text-xs font-bold">
                    <span className="text-green-400">{order.status}</span>
                  </td>
                  <td className="py-4 align-top text-xs">
                    {order.paymentId ? <span className="text-[var(--carpore-gold)]">{order.paymentId}</span> : <span className="text-rose-600">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

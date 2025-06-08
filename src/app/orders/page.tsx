'use client';
import { useOrders } from '../orders-context';

export default function OrdersPage() {
  const { orders } = useOrders();
  return (
    <main className="min-h-screen pt-16 pb-24 flex flex-col items-center bg-[var(--carpore-bg)]">
      <div className="w-full max-w-3xl bg-[var(--carpore-gray)] rounded-3xl shadow-xl px-8 py-9 flex flex-col gap-8 mt-10 border border-[var(--carpore-gold)]/20">
        <h1 className="text-4xl brand-logo font-extrabold text-[var(--carpore-gold)] tracking-widest uppercase mb-6">Order History</h1>
        {orders.length === 0 ? (
          <div className="py-32 text-center text-lg text-[var(--carpore-gold)]">No orders yet.<br />Your orders will appear here after payment.</div>
        ) : (
          <ul className="space-y-8">
            {orders.map(order => (
              <li key={order.id} className="bg-[var(--carpore-bg)]/75 rounded-xl px-6 py-5 shadow flex flex-col gap-2 border-l-4 border-[var(--carpore-gold)]">
                <div className="flex flex-wrap justify-between items-center mb-1">
                  <span className="text-xs font-mono text-[var(--carpore-white)]/70">{order.date}</span>
                  <span className="text-xs tracking-wider text-[var(--carpore-gold)]">Order ID: <b>{order.id}</b></span>
                </div>
                <ul className="flex flex-wrap gap-3 mb-1 mt-1">
                  {order.items.map(item => (
                    <li key={item.id} className="flex gap-2 items-center px-2 py-1 rounded bg-[var(--carpore-gray)]/80">
                      <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover border border-[var(--carpore-gold)]/10" />
                      <span className="brand-logo text-sm font-bold text-[var(--carpore-gold)]">{item.name}</span>
                      <span className="text-xs font-mono text-[var(--carpore-white)]/70 ml-1">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-[var(--carpore-white)]/90 text-sm"><b>{order.user.name}</b> | {order.user.email} | {order.user.mobile}</div>
                  <div className="text-lg font-extrabold text-[var(--carpore-gold)]">₹{order.total}</div>
                </div>
                <div className="flex gap-6 justify-between items-center mt-1">
                  <span className="text-xs text-green-400 font-extrabold">{order.status === 'paid' ? 'Paid' : order.status}</span>
                  {order.paymentId && (
                    <span className="text-xs text-[var(--carpore-gold)]">Razorpay: <b>{order.paymentId}</b></span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

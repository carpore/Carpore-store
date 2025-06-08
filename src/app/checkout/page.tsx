'use client';
import { useCart } from '../cart-context';
import type React from 'react';
import { useState } from 'react';
import { loadRazorpayScript } from '../razorpay-loader';
import { useOrders } from '../orders-context';
import Link from 'next/link';

function makeOrderId() {
  return `ORD${Math.floor(Date.now() / 1000)}${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [form, setForm] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isDisabled = !form.name || !form.email || !form.mobile || items.length === 0 || loading;

  async function launchRazorpay() {
    setLoading(true); setError("");
    const ok = await loadRazorpayScript();
    if (!ok) { setError("Razorpay failed to load"); setLoading(false); return; }
    const orderId = makeOrderId();
    const options = {
      key: "rzp_test_5v8i4EjVoCNOeR", // TEST KEY ONLY
      amount: total * 100,
      currency: "INR",
      name: "Carpore Luxury Store",
      description: "Order Payment",
      image: "/icon.png", // optional
      handler: function(response: { razorpay_payment_id?: string }) {
        addOrder({
          id: orderId,
          date: new Date().toLocaleString(),
          user: form,
          items: items.map(i => ({ ...i })),
          total,
          status: 'paid',
          paymentId: response.razorpay_payment_id,
        });
        setSuccess(true); clearCart(); setLoading(false);
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.mobile,
      },
      theme: { color: "#CFA046" },
      modal: {
        ondismiss: function() { setLoading(false); },
      },
      notes: {
        Cart: items.map(i=>`${i.name} x${i.quantity}`).join(', '),
      },
    };
    // @ts-expect-error - Razorpay is available after loading script
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <main className="min-h-screen pt-14 pb-24 flex flex-col items-center bg-[var(--carpore-bg)]">
      <div className="w-full max-w-2xl bg-[var(--carpore-gray)] rounded-3xl shadow-xl px-8 py-10 flex flex-col gap-8 mt-10 border border-[var(--carpore-gold)]/20">
        <h1 className="text-4xl brand-logo font-extrabold text-[var(--carpore-gold)] tracking-widest uppercase mb-4">Checkout</h1>
        {success ? (
          <div className="py-20 text-center flex flex-col items-center gap-6">
            <div className="text-7xl text-[var(--carpore-gold)] mb-2">✓</div>
            <div className="text-2xl brand-logo font-bold text-[var(--carpore-gold)] mb-2">Payment Successful!</div>
            <div className="text-base text-[var(--carpore-white)]/90 mb-4">Thank you for your order, {form.name.trim()}! You'll receive a confirmation email soon.</div>
            <Link className="text-[var(--carpore-gold)] font-bold underline text-lg hover:text-[var(--carpore-white)]" href="/">Back to Store</Link>
          </div>
        ) : items.length === 0 ? (
          <div className="text-lg pt-8 pb-14 text-center text-[var(--carpore-gold)]">Your cart is empty.</div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-bold text-[var(--carpore-gold)] mb-2">Order Summary</h2>
              <ul className="space-y-4 mb-3">
                {items.map(item => (
                  <li key={item.id} className="flex items-center gap-3 border-b border-[var(--carpore-gold)]/10 pb-2">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl border border-[var(--carpore-gold)]/20" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-base font-bold text-[var(--carpore-white)]/95">{item.name}</div>
                      <div className="text-xs text-[var(--carpore-gold)] font-bold uppercase">{item.collection}</div>
                    </div>
                    <span className="font-bold text-[var(--carpore-gold)]">x{item.quantity}</span>
                    <span className="font-extrabold text-[var(--carpore-gold)]">₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between font-bold text-xl mt-3">
                <span className="text-[var(--carpore-gold)]">Subtotal</span>
                <span className="text-[var(--carpore-gold)]">₹{total}</span>
              </div>
            </div>
            <form className="flex flex-col gap-5 pt-4" onSubmit={e => e.preventDefault()}>
              <h2 className="text-lg font-bold text-[var(--carpore-gold)] mb-2">Your Info</h2>
              <input
                name="name"
                placeholder="Full Name"
                className="px-4 py-3 rounded-lg border-2 border-[var(--carpore-gold)]/40 bg-[var(--carpore-bg)] text-[var(--carpore-white)] placeholder:text-[var(--carpore-gold)] outline-none focus:border-[var(--carpore-gold)]"
                value={form.name}
                onChange={handleInput}
                required
                  disabled={loading}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="px-4 py-3 rounded-lg border-2 border-[var(--carpore-gold)]/40 bg-[var(--carpore-bg)] text-[var(--carpore-white)] placeholder:text-[var(--carpore-gold)] outline-none focus:border-[var(--carpore-gold)]"
                value={form.email}
                onChange={handleInput}
                required
                  disabled={loading}
              />
              <input
                name="mobile"
                type="tel"
                placeholder="Mobile Number"
                pattern="[0-9]{10,13}"
                className="px-4 py-3 rounded-lg border-2 border-[var(--carpore-gold)]/40 bg-[var(--carpore-bg)] text-[var(--carpore-white)] placeholder:text-[var(--carpore-gold)] outline-none focus:border-[var(--carpore-gold)]"
                value={form.mobile}
                onChange={handleInput}
                required
                  disabled={loading}
              />
              <button
                type="button"
                className="mt-6 w-full bg-[var(--carpore-gold)] text-[var(--carpore-bg)] text-xl font-bold rounded-full py-4 tracking-widest shadow-lg hover:scale-105 transition disabled:opacity-60"
                disabled={isDisabled}
                onClick={launchRazorpay}
              >
                {loading ? 'Processing...' : 'Pay with Razorpay'}
              </button>
              {error && <div className="text-rose-500 text-center font-bold pt-2">{error}</div>}
            </form>
          </>
        )}
      </div>
    </main>
  );
}

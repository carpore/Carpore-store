'use client';
import { useCart } from './cart-context';
import ProductDetailModal, { type Product } from './ProductDetailModal';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const { addToCart } = useCart();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const demoCollections = [
    {
      name: 'Camphor-Based',
      products: [
        {
          id: 'c1',
          name: 'Alpine Mist',
          desc: 'Fresh camphor entwined with alpine herbs for a crisp in-car experience.',
          price: 1199,
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'c2',
          name: 'Glacial Drive',
          desc: 'Pure camphor aroma fused with hints of icy eucalyptus.',
          price: 1050,
          image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'c3',
          name: 'Zen Escape',
          desc: 'Tranquil camphor with subtle wood undertones for relaxation.',
          price: 1399,
          image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'c4',
          name: 'Saffron Breeze',
          desc: 'Invigorating camphor meets exotic saffron for sublime freshness.',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'c5',
          name: 'Morning Cloud',
          desc: 'Delicate camphor and airy florals, reminiscent of dawn drives.',
          price: 1100,
          image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3be6?auto=format&fit=crop&w=500&q=80',
        },
      ],
    },
    {
      name: 'Natural Wood-Based',
      products: [
        {
          id: 'w1',
          name: 'Forest Drift',
          desc: 'Earthy cedarwood balanced with notes of sandal and vanilla.',
          price: 1499,
          image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'w2',
          name: 'Amber Trail',
          desc: 'Deep wood with amber resins, for a warm and comforting in-car scent.',
          price: 1599,
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'w3',
          name: 'Silva Luxe',
          desc: 'Polished mahogany and oud, echoing luxury vehicle interiors.',
          price: 1799,
          image: 'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'w4',
          name: 'Mystic Timber',
          desc: 'Rare woods with a mysterious smoky undertone.',
          price: 1349,
          image: 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 'w5',
          name: 'Evergreen Vessel',
          desc: 'Aromatic pine, moss, and hints of cypress for fresh outdoor spirit.',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=500&q=80',
        },
      ],
    },
  ];

  return (
    <main className="min-h-[650px] flex flex-col items-center justify-center relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 pt-10 md:pt-20 relative">
        {/* Left: Headline and CTA */}
        <div className="z-10 w-full md:w-2/3 flex flex-col gap-7 animate-fadein">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider uppercase text-[var(--carpore-gold)] drop-shadow-lg brand-logo pb-3">Elevate Every Journey</h1>
          <p className="text-xl md:text-2xl max-w-xl my-2 leading-relaxed text-[var(--carpore-white)]/90">
            Premium Fragrance & Air Fresheners—<span className="text-[var(--carpore-gold)]">Where Nature & Innovation Meet.</span>
          </p>
          <Link href="/collections" className="mt-4 w-max bg-[var(--carpore-gold)] text-[var(--carpore-bg)] px-8 py-3 rounded-full font-bold text-lg shadow-lg transition hover:scale-105 hover:shadow-xl">
            Explore Collections
          </Link>
        </div>
        {/* Right: Hero Image */}
        <div className="hidden md:block w-1/2 absolute md:static right-0 top-0 h-full flex-shrink-0 flex items-center justify-end select-none pointer-events-none">
          <img
            src="https://ugc.same-assets.com/vC6QLcTxZEcxY_Jqv47iU-Ax_ZKil9sb.jpeg"
            alt="Luxury fragrance bottles hero"
            className="w-[480px] max-w-xs md:max-w-sm rounded-3xl shadow-2xl opacity-80 translate-y-8 animate-hero-float"
            style={{ filter: 'brightness(0.95) contrast(1.07) blur(0.5px)' }}
          />
        </div>
      </section>

      {/* PRODUCT COLLECTIONS */}
      <section className="w-full max-w-7xl px-4 mt-20 mb-16">
        {demoCollections.map((col) => (
          <div key={col.name} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-[var(--carpore-gold)] mb-6 brand-logo drop-shadow-sm">
              {col.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {col.products.map((p) => (
                <div
                  key={p.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details of ${p.name}`}
                  className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg bg-[var(--carpore-gray)] hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--carpore-gold)] border border-transparent transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--carpore-gold)]"
                  onClick={() => setModalProduct({ ...p, collection: col.name })}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalProduct({ ...p, collection: col.name }); }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                  <div className="flex-1 flex flex-col p-4">
                    <h3 className="text-xl font-bold mb-2 text-[var(--carpore-gold)] group-hover:underline brand-logo">
                      {p.name}
                    </h3>
                    <p className="text-sm mb-3 text-[var(--carpore-white)]/90 flex-1 min-h-[40px]">
                      {p.desc}
                    </p>
                    <div className="flex items-end justify-between mt-auto pt-2">
                      <span className="font-extrabold text-lg text-[var(--carpore-gold)]">₹{p.price}</span>
                      <button
                        className="ml-2 bg-[var(--carpore-gold)] text-[var(--carpore-bg)] rounded-full px-4 py-1 font-bold text-base shadow hover:brightness-110 focus:ring-2 ring-[var(--carpore-gold)] transition-all active:scale-95"
                        onClick={e => {
                          e.stopPropagation();
                          addToCart({
                            id: p.id,
                            name: p.name,
                            price: p.price,
                            image: p.image,
                            collection: col.name,
                          });
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <ProductDetailModal open={!!modalProduct} onClose={() => setModalProduct(null)} product={modalProduct} />
    </main>
  )
}

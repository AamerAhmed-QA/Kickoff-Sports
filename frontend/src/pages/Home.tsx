import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api, categories, type Product } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  useEffect(() => { api.products().then((all) => setFeatured(all.filter((p) => p.featured))); }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-turf text-chalk">
        <PitchLines />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <h1 className="max-w-xl text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tight">
            Gear up for matchday.
          </h1>
          <p className="mt-5 max-w-md text-lg text-chalk/85">
            Cleats, balls, kits and keeper gear. Free standard shipping on orders over $75.
          </p>
          <Link to="/shop" className="mt-8 inline-block rounded-md bg-card px-6 py-3 font-semibold text-ink hover:brightness-95">
            Shop all gear
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10" aria-labelledby="shop-by-category">
        <h2 id="shop-by-category" className="text-3xl font-bold">Shop by category</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link to={`/shop?category=${c.slug}`} className="block rounded-full border-2 border-turf px-5 py-2 font-semibold text-turf hover:bg-turf hover:text-chalk">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16" aria-labelledby="featured">
        <h2 id="featured" className="text-3xl font-bold">Featured gear</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}

// Halfway line and center circle, drawn like chalk on grass.
function PitchLines() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={i * 200} y="0" width="100" height="500" fill="#0c5234" />)}
      <g fill="none" stroke="#fafbf8" strokeOpacity="0.35" strokeWidth="4">
        <line x1="840" y1="0" x2="840" y2="500" />
        <circle cx="840" cy="250" r="150" />
        <circle cx="840" cy="250" r="6" fill="#fafbf8" />
        <rect x="1110" y="110" width="120" height="280" />
      </g>
    </svg>
  );
}

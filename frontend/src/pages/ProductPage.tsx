import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { api, categories, money, type ProductDetail } from '../api';
import ProductArt from '../components/ProductArt';
import Stars from '../components/Stars';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    setProduct(null); setError(''); setSize('');
    api.product(slug).then(setProduct).catch((e: Error) => setError(e.message));
  }, [slug]);

  if (error) return <div className="mx-auto max-w-6xl px-4 py-16"><h1 className="text-4xl font-bold">{error}</h1><Link to="/shop" className="mt-4 inline-block underline">Back to the shop</Link></div>;
  if (!product) return <p className="mx-auto max-w-6xl px-4 py-16 text-muted">Loading product…</p>;

  const category = categories.find((c) => c.slug === product.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link to="/shop" className="hover:underline">Shop</Link> /{' '}
        <Link to={`/shop?category=${product.category}`} className="hover:underline">{category?.label}</Link>
      </nav>

      <div className="mt-4 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-md border border-line">
          <ProductArt product={product} />
        </div>

        <div>
          <p className="text-muted">{product.brand}</p>
          <h1 className="text-5xl font-extrabold leading-none">{product.name}</h1>
          <div className="mt-3"><Stars rating={product.rating} count={product.reviewCount} /></div>
          <p data-testid="product-price" className="mt-4 text-2xl font-semibold">{money(product.priceCents)}</p>
          <p className="mt-4 max-w-prose">{product.description}</p>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <label key={s} className={`cursor-pointer rounded-md border-2 px-4 py-2 font-semibold ${size === s ? 'border-turf bg-turf text-chalk' : 'border-line hover:border-turf'}`}>
                  <input type="radio" name="size" value={s} checked={size === s} onChange={() => setSize(s)} className="sr-only" />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          {product.inStock
            ? <p className="mt-6 text-sm text-muted">Add to cart arrives in the next iteration.</p>
            : <p className="mt-6 font-semibold text-redcard">Out of stock</p>}
        </div>
      </div>

      <section className="mt-14 max-w-3xl" aria-labelledby="reviews">
        <h2 id="reviews" className="text-3xl font-bold">Reviews</h2>
        {product.reviews.length === 0 && <p className="mt-3 text-muted">No reviews yet.</p>}
        <ul className="mt-4 divide-y divide-line">
          {product.reviews.map((r) => (
            <li key={r.id} data-testid="review" className="py-4">
              <Stars rating={r.rating} />
              <h3 className="mt-1 text-xl font-bold">{r.title}</h3>
              <p className="mt-1">{r.body}</p>
              <p className="mt-1 text-sm text-muted">{r.authorName}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

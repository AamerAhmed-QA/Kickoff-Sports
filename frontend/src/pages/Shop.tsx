import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { api, categories, type Product } from '../api';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? '';
  const sort = params.get('sort') ?? 'featured';
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    setProducts(null);
    const query: Record<string, string> = { sort };
    if (q) query.q = q;
    if (category) query.category = category;
    api.products(query).then(setProducts);
  }, [q, category, sort]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  }

  const categoryLabel = categories.find((c) => c.slug === category)?.label;
  const heading = q ? `Results for “${q}”` : categoryLabel ?? 'All gear';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-5xl font-extrabold">{heading}</h1>

      <div className="mt-6 flex flex-wrap items-end gap-4 border-b border-line pb-4">
        <label className="text-sm font-semibold">
          Category
          <select value={category} onChange={(e) => update('category', e.target.value)} className="mt-1 block rounded-md border border-line bg-white px-3 py-2 font-normal">
            <option value="">All categories</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">
          Sort by
          <select value={sort} onChange={(e) => update('sort', e.target.value)} className="mt-1 block rounded-md border border-line bg-white px-3 py-2 font-normal">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
        {products && (
          <p data-testid="result-count" className="ml-auto text-sm text-muted">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        )}
      </div>

      {products === null && <p className="mt-8 text-muted">Loading products…</p>}
      {products?.length === 0 && (
        <div className="mt-8">
          <p className="text-lg font-semibold">No products match your search.</p>
          <p className="text-muted">Try a different word, or clear the category filter.</p>
        </div>
      )}
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {products?.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

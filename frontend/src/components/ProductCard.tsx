import { Link } from 'react-router';
import { money, type Product } from '../api';
import ProductArt from './ProductArt';
import Stars from './Stars';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article data-testid="product-card" className="group">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-md border border-line">
          <ProductArt product={product} />
          {!product.inStock && (
            <span className="absolute left-2 top-2 rounded bg-ink px-2 py-0.5 text-xs font-semibold text-chalk">Out of stock</span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted">{product.brand}</p>
        <h3 className="text-xl font-bold leading-tight group-hover:underline">{product.name}</h3>
      </Link>
      <div className="mt-1 flex items-center justify-between">
        <span data-testid="product-price" className="font-semibold">{money(product.priceCents)}</span>
        <Stars rating={product.rating} count={product.reviewCount} />
      </div>
    </article>
  );
}

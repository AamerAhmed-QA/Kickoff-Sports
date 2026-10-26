export interface Product {
  id: number; slug: string; name: string; brand: string; category: string;
  priceCents: number; description: string; sizes: string[]; color: string;
  inStock: boolean; featured: boolean; rating: number | null; reviewCount: number;
}
export interface Review { id: number; authorName: string; rating: number; title: string; body: string; createdAt: string; }
export interface ProductDetail extends Product { reviews: Review[]; }

export const categories = [
  { slug: 'cleats', label: 'Cleats' },
  { slug: 'balls', label: 'Balls' },
  { slug: 'apparel', label: 'Apparel' },
  { slug: 'goalkeeper', label: 'Goalkeeper' },
  { slug: 'training', label: 'Training' },
];

export const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `Request failed (${res.status})`);
  return res.json();
}

export const api = {
  products: (params: Record<string, string> = {}) => get<Product[]>(`/api/products?${new URLSearchParams(params)}`),
  product: (slug: string) => get<ProductDetail>(`/api/products/${slug}`),
};

// KickOff Sports API. Iteration 1: catalog only.
import express from 'express';
import { db, initDatabase, resetDatabase } from './db';

initDatabase();
const app = express();
app.use(express.json());

interface ProductRow {
  id: number; slug: string; name: string; brand: string; category: string;
  price_cents: number; description: string; sizes: string; color: string;
  in_stock: number; featured: number; rating: number | null; review_count: number;
}

const productSelect = `
  SELECT p.*, ROUND(AVG(r.rating), 1) AS rating, COUNT(r.id) AS review_count
  FROM products p LEFT JOIN reviews r ON r.product_id = p.id`;

const toProduct = (p: ProductRow) => ({
  id: p.id, slug: p.slug, name: p.name, brand: p.brand, category: p.category,
  priceCents: p.price_cents, description: p.description, sizes: JSON.parse(p.sizes) as string[],
  color: p.color, inStock: p.in_stock === 1, featured: p.featured === 1,
  rating: p.rating, reviewCount: p.review_count,
});

const sorts: Record<string, string> = {
  featured: 'p.featured DESC, p.id',
  'price-asc': 'p.price_cents ASC',
  'price-desc': 'p.price_cents DESC',
  name: 'p.name ASC',
};

app.get('/api/health', (_req, res) => { res.json({ ok: true }); });

// GET /api/products?q=ball&category=balls&sort=price-asc
app.get('/api/products', (req, res) => {
  const q = String(req.query.q ?? '').trim();
  const category = String(req.query.category ?? '');
  const sort = sorts[String(req.query.sort ?? 'featured')] ?? sorts.featured;
  const where: string[] = [];
  const params: string[] = [];
  if (q) { where.push('(p.name LIKE ? OR p.brand LIKE ? OR p.description LIKE ?)'); params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (category) { where.push('p.category = ?'); params.push(category); }
  const sql = `${productSelect} ${where.length ? 'WHERE ' + where.join(' AND ') : ''} GROUP BY p.id ORDER BY ${sort}`;
  const rows = db.prepare(sql).all(...params) as unknown as ProductRow[];
  res.json(rows.map(toProduct));
});

app.get('/api/products/:slug', (req, res) => {
  const row = db.prepare(`${productSelect} WHERE p.slug = ? GROUP BY p.id`).get(req.params.slug) as unknown as ProductRow | undefined;
  if (!row) { res.status(404).json({ error: 'Product not found.' }); return; }
  const reviews = db.prepare(
    'SELECT id, author_name AS authorName, rating, title, body, created_at AS createdAt FROM reviews WHERE product_id = ? ORDER BY id DESC',
  ).all(row.id);
  res.json({ ...toProduct(row), reviews });
});

// Test-only: reset to seed data so every test run starts the same way.
app.post('/api/test/reset', (_req, res) => { resetDatabase(); res.json({ ok: true }); });

const port = Number(process.env.API_PORT ?? 3001);
app.listen(port, () => console.log(`KickOff API running at http://localhost:${port}`));

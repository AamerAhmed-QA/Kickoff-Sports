// Database setup. Uses Node's built-in SQLite module, so there is nothing
// native to compile and no database server to install.
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { products, testUsers } from './seed-data';
import { hashPassword } from './auth';

const dataDir = path.resolve(process.cwd(), 'backend/data');
fs.mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, 'kickoff.db'));
db.exec('PRAGMA foreign_keys = ON;');

const schema = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  address1 TEXT NOT NULL DEFAULT '',
  address2 TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  zip TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  description TEXT NOT NULL,
  sizes TEXT NOT NULL,
  color TEXT NOT NULL,
  in_stock INTEGER NOT NULL DEFAULT 1,
  featured INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, product_id)
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT UNIQUE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  ship_name TEXT NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  shipping_method TEXT NOT NULL,
  promo_code TEXT NOT NULL DEFAULT '',
  subtotal_cents INTEGER NOT NULL,
  discount_cents INTEGER NOT NULL,
  shipping_cents INTEGER NOT NULL,
  tax_cents INTEGER NOT NULL,
  total_cents INTEGER NOT NULL,
  card_brand TEXT NOT NULL DEFAULT '',
  card_last4 TEXT NOT NULL DEFAULT '',
  tracking_number TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  paid_at TEXT,
  shipped_at TEXT,
  delivered_at TEXT
);
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price_cents INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS payment_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  card_last4 TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

const tables = ['payment_attempts', 'order_items', 'orders', 'favorites', 'reviews', 'products', 'sessions', 'users'];

function seed() {
  const insertProduct = db.prepare(
    `INSERT INTO products (slug, name, brand, category, price_cents, description, sizes, color, in_stock, featured)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const p of products) {
    insertProduct.run(p.slug, p.name, p.brand, p.category, p.priceCents, p.description,
      JSON.stringify(p.sizes), p.color, p.inStock ? 1 : 0, p.featured ? 1 : 0);
  }

  const insertUser = db.prepare(
    `INSERT INTO users (email, password_hash, first_name, last_name, phone, address1, city, state, zip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const u of testUsers) {
    insertUser.run(u.email, hashPassword(u.password), u.firstName, u.lastName, u.phone, u.address1, u.city, u.state, u.zip);
  }

  // A few starter reviews so product pages have something to show.
  const insertReview = db.prepare(
    `INSERT INTO reviews (product_id, user_id, author_name, rating, title, body) VALUES (?, NULL, ?, ?, ?, ?)`,
  );
  const id = (slug: string) => (db.prepare('SELECT id FROM products WHERE slug = ?').get(slug) as { id: number }).id;
  insertReview.run(id('stryker-velocity-fg'), 'Marcus T.', 5, 'Fast and light', 'Broke in after two practices. Great lockdown on firm ground.');
  insertReview.run(id('stryker-velocity-fg'), 'Dana R.', 4, 'Runs a little narrow', 'Love the touch on the ball, but I would size up half a size if you have wide feet.');
  insertReview.run(id('kickoff-match-ball'), 'Coach Lee', 5, 'Our league ball now', 'Holds air all season and flies true. The team asked for these by name.');
  insertReview.run(id('volta-shield-gk-gloves'), 'Sam K.', 3, 'Good grip, wears fast', 'Grip is excellent when damp. Palms started wearing after about a month on turf.');
}

export function initDatabase() {
  db.exec(schema);
  const row = db.prepare('SELECT COUNT(*) AS count FROM products').get() as { count: number };
  if (row.count === 0) seed();
}

// Wipes everything and reseeds. Tests call this through POST /api/test/reset
// so every run starts from the same known data.
export function resetDatabase() {
  db.exec('PRAGMA foreign_keys = OFF;');
  for (const t of tables) db.exec(`DROP TABLE IF EXISTS ${t};`);
  db.exec('PRAGMA foreign_keys = ON;');
  initDatabase();
}

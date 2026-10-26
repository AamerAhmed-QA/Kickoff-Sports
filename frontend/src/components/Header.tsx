import { FormEvent, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { categories } from '../api';

export default function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function onSearch(e: FormEvent) {
    e.preventDefault();
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
  }

  return (
    <header className="bg-turf text-chalk">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-4">
        <Link to="/" className="font-display text-3xl font-extrabold leading-none tracking-tight" aria-label="KickOff Sports home">
          KickOff<span className="text-card">.</span>
        </Link>
        <form role="search" onSubmit={onSearch} className="flex flex-1 min-w-[220px] max-w-md">
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search cleats, balls, gloves"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-l-md px-3 py-2 text-ink bg-chalk placeholder:text-muted"
          />
          <button type="submit" className="rounded-r-md bg-card px-4 font-semibold text-ink hover:brightness-95">
            Search
          </button>
        </form>
      </div>
      <nav aria-label="Categories" className="bg-turf-deep">
        <ul className="mx-auto max-w-6xl px-4 flex gap-6 overflow-x-auto text-sm font-semibold">
          <li><NavLink to="/shop" end className={navClass}>All gear</NavLink></li>
          {categories.map((c) => (
            <li key={c.slug}>
              <NavLink to={`/shop?category=${c.slug}`} className={navClass}>{c.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const navClass = () => 'block py-2.5 hover:text-card';

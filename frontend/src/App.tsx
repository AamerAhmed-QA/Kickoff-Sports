import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="border-t border-line text-sm text-muted">
        <div className="mx-auto max-w-6xl px-4 py-6">
          KickOff Sports is a practice store for test automation. Products and brands are fictional.
        </div>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">Check the address, or browse the shop from the menu above.</p>
    </div>
  );
}

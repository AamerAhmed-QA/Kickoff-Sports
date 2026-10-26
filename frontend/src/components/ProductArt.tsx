// Simple drawn product images, so the store has no copyrighted photos.
import type { Product } from '../api';

export default function ProductArt({ product, className = '' }: { product: Pick<Product, 'category' | 'color' | 'name'>; className?: string }) {
  const c = product.color;
  return (
    <svg viewBox="0 0 200 160" role="img" aria-label={product.name} className={`block w-full bg-[#e9f0ea] ${className}`}>
      {/* mowed-grass stripes */}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 50} y="0" width="25" height="160" fill="#dfe8e1" />)}
      {shape(product.category, c)}
    </svg>
  );
}

function shape(category: string, c: string) {
  switch (category) {
    case 'cleats':
      return (
        <g>
          <path d="M40 98 C40 70 70 62 92 66 L120 74 C140 80 160 86 166 100 L166 108 L40 108 Z" fill={c} stroke="#13201a" strokeWidth="3" />
          <path d="M84 70 L96 92 M98 72 L108 94 M112 76 L120 96" stroke="#fafbf8" strokeWidth="3" />
          {[54, 78, 104, 130, 152].map((x) => <rect key={x} x={x} y="108" width="8" height="9" fill="#13201a" />)}
        </g>
      );
    case 'balls':
      return (
        <g>
          <circle cx="100" cy="80" r="46" fill={c} stroke="#13201a" strokeWidth="3" />
          <polygon points="100,62 117,74 110,94 90,94 83,74" fill="#13201a" />
          <path d="M100 62 L100 36 M117 74 L141 66 M110 94 L124 116 M90 94 L76 116 M83 74 L59 66" stroke="#13201a" strokeWidth="3" />
        </g>
      );
    case 'goalkeeper':
      return (
        <g>
          <path d="M70 128 L70 70 C70 60 76 56 82 56 L82 40 C82 34 92 34 92 40 L92 54 L96 34 C97 28 107 28 106 36 L104 54 L112 38 C114 32 123 34 121 41 L114 60 L126 52 C131 48 138 54 134 60 L118 84 L118 128 Z" fill={c} stroke="#13201a" strokeWidth="3" strokeLinejoin="round" />
          <rect x="70" y="112" width="48" height="16" fill="#13201a" />
        </g>
      );
    case 'training':
      return (
        <g>
          <path d="M60 120 L100 44 L140 120 Z" fill={c} stroke="#13201a" strokeWidth="3" strokeLinejoin="round" />
          <rect x="48" y="118" width="104" height="10" rx="3" fill={c} stroke="#13201a" strokeWidth="3" />
          <path d="M80 90 L120 90" stroke="#fafbf8" strokeWidth="5" />
        </g>
      );
    default: // apparel
      return (
        <g>
          <path d="M72 34 L88 30 C92 40 108 40 112 30 L128 34 L156 56 L142 76 L130 68 L130 132 L70 132 L70 68 L58 76 L44 56 Z" fill={c} stroke="#13201a" strokeWidth="3" strokeLinejoin="round" />
          <text x="100" y="104" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="40" fill={c === '#d9ddd6' ? '#0e5a3a' : '#fafbf8'}>10</text>
        </g>
      );
  }
}

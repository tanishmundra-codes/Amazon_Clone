"use client";

import { useCart } from "../../../context/CartContext";

// Deterministic pseudo-random from product id for sponsored badge & rating
function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function StarRating({ rating, count }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-[#de7921]">
        {Array.from({ length: full }, (_, i) => (
          <svg key={`f${i}`} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
        {half && (
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="halfGrad">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"
              fill="url(#halfGrad)"
            />
          </svg>
        )}
        {Array.from({ length: empty }, (_, i) => (
          <svg key={`e${i}`} className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-amazon-blue cursor-pointer hover:text-amazon-orange">
        {count.toLocaleString()}
      </span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const h = hashId(product.id);
  const isSponsored = h % 4 === 0;
  const rating = product.rating ? Number(product.rating) : 3.5 + (h % 15) / 10;
  const reviewCount = product.reviewCount || 50 + (h % 950);
  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const image = product.images?.[0] || "/placeholder.png";

  async function handleAddToCart() {
    await addToCart(product.id, 1);
  }

  return (
    <div className="bg-white rounded-sm p-4 flex flex-col h-full group">
      {/* Image */}
      <div className="relative mb-3 flex items-center justify-center h-[220px] overflow-hidden">
        <img
          src={image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Sponsored badge */}
      {isSponsored && (
        <span className="text-[11px] text-gray-500 mb-1">
          Sponsored
        </span>
      )}

      {/* Title */}
      <h3 className="text-[15px] leading-snug text-amazon-dark line-clamp-2 hover:text-amazon-orange cursor-pointer mb-1">
        {product.title}
      </h3>

      {/* Rating */}
      <StarRating rating={rating} count={reviewCount} />

      {/* Price */}
      <div className="mt-2">
        {discount > 0 && (
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs bg-red-700 text-white px-1.5 py-0.5 rounded-sm font-medium">
              {discount}% off
            </span>
            <span className="text-xs text-gray-500 line-through">
              ${mrp.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex items-baseline">
          <span className="text-[13px] align-top relative -top-1">$</span>
          <span className="text-[28px] font-medium leading-none text-gray-900">
            {Math.floor(price)}
          </span>
          <span className="text-[13px] align-top relative -top-1">
            {(price % 1).toFixed(2).substring(1)}
          </span>
        </div>
      </div>

      {/* Prime badge */}
      <div className="flex items-center gap-1.5 mt-1.5">
        <span className="text-[13px] font-bold text-amazon-blue italic tracking-tight">
          prime
        </span>
        <span className="text-[13px] text-gray-700">
          FREE delivery
        </span>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAddToCart}
        className="mt-auto pt-3 w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-[13px] font-medium text-gray-900 py-1.5 px-4 rounded-full border border-[#fcd200] shadow-sm cursor-pointer transition-colors"
      >
        Add to cart
      </button>
    </div>
  );
}

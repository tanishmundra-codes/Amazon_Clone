"use client";

import Link from "next/link";
import { useCart } from "../../../context/CartContext";

// Deterministic pseudo-random from product id
function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function StarRating({ rating, count, id }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const halfGradId = `halfGrad-${id}`;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {/* Numeric rating + dropdown arrow */}
      <span className="text-[13px] text-amazon-blue cursor-pointer hover:text-amazon-orange font-medium">
        {rating.toFixed(1)}
      </span>
      {/* Stars */}
      <div className="flex text-[#de7921]">
        {Array.from({ length: full }, (_, i) => (
          <svg key={`f${i}`} className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
        {half && (
          <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={halfGradId}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"
              fill={`url(#${halfGradId})`}
            />
          </svg>
        )}
        {Array.from({ length: empty }, (_, i) => (
          <svg key={`e${i}`} className="w-[15px] h-[15px] text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>
      {/* Review count in parentheses */}
      <span className="text-[13px] text-amazon-blue cursor-pointer hover:text-amazon-orange">
        ({count.toLocaleString()})
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
  const boughtCount = ((h % 9) + 1) * 100;

  async function handleAddToCart() {
    await addToCart(product.id, 1);
  }

  return (
    <div className="bg-white rounded-sm p-4 flex flex-col h-full group">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="no-underline">
        <div className="relative mb-3 flex items-center justify-center h-[220px] overflow-hidden">
          <img
            src={image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      {/* Sponsored badge */}
      {isSponsored && (
        <span className="text-[11px] text-gray-500 mb-1">
          Sponsored
        </span>
      )}

      {/* Title */}
      <Link href={`/product/${product.id}`} className="no-underline">
        <h3 className="text-[14px] leading-[20px] text-[#0f1111] line-clamp-3 hover:text-amazon-orange cursor-pointer mb-1">
          {product.title}
        </h3>
      </Link>

      {/* Rating */}
      <StarRating rating={rating} count={reviewCount} id={product.id} />

      {/* Bought in past month */}
      <p className="text-[13px] text-[#565959] mt-0.5 mb-1">
        {boughtCount}+ bought in past month
      </p>

      {/* Price */}
      <div className="mt-1">
        <div className="flex items-baseline gap-0.5">
          <span className="text-[13px] align-top relative -top-[5px]">₹</span>
          <span className="text-[28px] font-medium leading-none text-[#0f1111]">
            {Math.floor(price).toLocaleString("en-IN")}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[13px] text-[#565959]">
              M.R.P: <span className="line-through">₹{Math.floor(mrp).toLocaleString("en-IN")}</span>
            </span>
            <span className="text-[13px] text-[#cc0c39] font-medium">
              ({discount}% off)
            </span>
          </div>
        )}
      </div>

      {/* FREE delivery */}
      <p className="text-[13px] text-[#0f1111] mt-1.5">
        <span className="font-bold">FREE delivery</span>
      </p>

      {/* Add to cart */}
      <div className="mt-auto pt-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-[15px] font-medium text-gray-900 py-2.5 px-4 rounded-lg border border-[#fcd200] shadow-sm cursor-pointer transition-colors text-center"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

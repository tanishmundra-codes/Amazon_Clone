"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { formatUSDWhole } from "../../../../lib/currency";

const API = process.env.NEXT_PUBLIC_API_URL;

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
  const halfGradId = `halfGrad-rel-${id}`;

  return (
    <div className="flex items-center gap-0.5">
      <div className="flex text-[#de7921]">
        {Array.from({ length: full }, (_, i) => (
          <svg key={`f${i}`} className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
        {half && (
          <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24">
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
          <svg key={`e${i}`} className="w-[14px] h-[14px] text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>
      <span className="text-[12px] text-[#007185] ml-0.5">{count.toLocaleString()}</span>
    </div>
  );
}

function getDeliveryDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

export default function RelatedProducts({ categorySlug, currentProductId }) {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch(`${API}/products?category=${categorySlug}`);
        const json = await res.json();
        if (json.success) {
          setProducts(json.data.filter((p) => p.id !== currentProductId));
        }
      } catch {
        // silently fail
      }
    }
    if (categorySlug) fetchRelated();
  }, [categorySlug, currentProductId]);

  if (products.length === 0) return null;

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-[21px] font-bold text-[#0f1111] mb-4">
        Customers who viewed this item also viewed
      </h2>

      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-white/95 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity rounded-r"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto scroll-smooth pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => {
            const h = hashId(product.id);
            const rating = product.rating ? Number(product.rating) : 3.5 + (h % 15) / 10;
            const reviewCount = product.reviewCount || 50 + (h % 950);
            const price = Number(product.price);
            const mrp = Number(product.mrp);
            const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
            const image = product.images?.[0] || "/placeholder.png";
            const deliveryDays = 2 + (h % 5);

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="shrink-0 w-[180px] p-3 flex flex-col no-underline hover:bg-gray-50 transition-colors rounded"
              >
                {/* Image */}
                <div className="flex items-center justify-center h-[180px] mb-2">
                  <img
                    src={image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[13px] leading-[18px] text-[#007185] hover:text-[#c7511f] line-clamp-3 mb-1">
                  {product.title}
                </h3>

                {/* Rating */}
                <StarRating rating={rating} count={reviewCount} id={product.id} />

                {/* Price */}
                <div className="mt-1">
                  {discount > 0 && (
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[11px] bg-[#cc0c39] text-white px-1 py-0.5 rounded-sm font-medium">
                        {discount}% off
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline">
                    <span className="text-[12px] align-top relative -top-[4px]">$</span>
                    <span className="text-[18px] font-medium text-[#0f1111]">
                      {formatUSDWhole(price)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <p className="text-[12px] text-[#565959]">
                      M.R.P: <span className="line-through">${formatUSDWhole(mrp)}</span>
                    </p>
                  )}
                </div>

                {/* Delivery */}
                <p className="text-[12px] text-[#0f1111] mt-1">
                  Get it by <span className="font-bold">{getDeliveryDate(deliveryDays)}</span>
                </p>
                <p className="text-[12px] text-[#565959]">FREE Delivery by Amazon</p>
              </Link>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-white/95 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity rounded-l"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

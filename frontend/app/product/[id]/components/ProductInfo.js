"use client";

import { useRef } from "react";
import Link from "next/link";
import { formatUSDWhole } from "../../../../lib/currency";

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
  const halfGradId = `halfGrad-detail-${id}`;

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-[14px] text-amazon-blue cursor-pointer hover:text-amazon-orange font-medium">
        {rating.toFixed(1)}
      </span>
      <div className="flex text-[#de7921]">
        {Array.from({ length: full }, (_, i) => (
          <svg key={`f${i}`} className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
        {half && (
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
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
          <svg key={`e${i}`} className="w-[18px] h-[18px] text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
          </svg>
        ))}
      </div>
      <span className="text-[14px] text-amazon-blue cursor-pointer hover:text-amazon-orange hover:underline">
        ({count.toLocaleString()})
      </span>
    </div>
  );
}

const OFFERS = [
  {
    title: "Cashback",
    description: "Upto $623.00 cashback as Amazon Pay Balance when...",
    link: "1 offer ›",
  },
  {
    title: "No Cost EMI",
    description: "Upto $542.22 EMI interest savings on Amazon Pay ICICI...",
    link: "1 offer ›",
  },
  {
    title: "Bank Offer",
    description: "Upto $1,000.00 discount on HDFC Bank Credit Cards",
    link: "8 offers ›",
  },
  {
    title: "Partner Offers",
    description: "Get GST invoice and save up to 18% on business purchases",
    link: "1 offer ›",
  },
];

function OffersSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-5 h-5 text-[#c7511f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <circle cx="12" cy="17" r="0.5" fill="currentColor" />
        </svg>
        <span className="text-[14px] font-bold text-[#0f1111]">Offers</span>
      </div>

      {/* Offer cards with arrows */}
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll offers left"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {OFFERS.map((offer) => (
            <div
              key={offer.title}
              className="shrink-0 border border-gray-300 rounded-lg p-3 w-[180px] flex flex-col"
            >
              <p className="text-[14px] font-bold text-[#0f1111] mb-1">{offer.title}</p>
              <p className="text-[13px] text-[#0f1111] leading-[18px] line-clamp-3 flex-1">
                {offer.description}
              </p>
              <p className="text-[13px] text-[#007185] mt-2 cursor-pointer hover:text-[#c7511f] hover:underline">
                {offer.link}
              </p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-300 rounded-full shadow flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll offers right"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const FEATURE_ICONS = [
  {
    label: "Free Delivery",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 4v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Pay on Delivery",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: "Top Brand",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
      </svg>
    ),
  },
  {
    label: "Secure Transaction",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function ProductInfo({ product }) {
  const h = hashId(product.id);
  const rating = product.rating ? Number(product.rating) : 3.5 + (h % 15) / 10;
  const reviewCount = product.reviewCount || 50 + (h % 950);
  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const boughtCount = ((h % 9) + 1) * 100;

  return (
    <div>
      {/* Title */}
      <h1 className="text-[24px] leading-[32px] font-normal text-[#0f1111]">
        {product.title}
      </h1>

      {/* Visit the store */}
      {product.category && (
        <Link
          href={`/?category=${product.category.slug}`}
          className="text-[14px] text-[#007185] hover:text-[#c7511f] hover:underline no-underline"
        >
          Visit the {product.category.name} Store
        </Link>
      )}

      {/* Rating */}
      <div className="mt-1.5">
        <StarRating rating={rating} count={reviewCount} id={product.id} />
      </div>

      {/* Bought in past month */}
      <p className="text-[14px] text-[#565959] mt-1">
        {boughtCount}+ bought in past month
      </p>

      {/* Divider */}
      <hr className="my-2 border-gray-200" />

      {/* Price section */}
      <div>
        {discount > 0 && (
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-[28px] text-[#cc0c39]">-{discount}%</span>
            <div className="flex items-baseline">
              <span className="text-[13px] align-top relative -top-[10px]">$</span>
              <span className="text-[28px] font-medium text-[#0f1111]">
                {formatUSDWhole(price)}
              </span>
            </div>
          </div>
        )}
        {!discount && (
          <div className="flex items-baseline">
            <span className="text-[13px] align-top relative -top-[10px]">$</span>
            <span className="text-[28px] font-medium text-[#0f1111]">
              {formatUSDWhole(price)}
            </span>
          </div>
        )}
        {discount > 0 && (
          <p className="text-[14px] text-[#565959]">
            M.R.P.: <span className="line-through">${formatUSDWhole(mrp)}</span>
          </p>
        )}
        <p className="text-[13px] text-[#565959] mt-0.5">Inclusive of all taxes</p>
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* Offers section */}
      <OffersSection price={price} />

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* Feature icons row */}
      <div className="flex gap-6 py-2">
        {FEATURE_ICONS.map((feat) => (
          <div key={feat.label} className="flex flex-col items-center gap-1 w-[72px]">
            <div className="text-[#007185]">{feat.icon}</div>
            <span className="text-[11px] text-[#007185] text-center leading-tight">{feat.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* About this item */}
      {product.description && (
        <div>
          <h2 className="text-[16px] font-bold text-[#0f1111] mb-2">About this item</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            {product.description.split("\n").filter(Boolean).map((line, i) => (
              <li key={i} className="text-[14px] text-[#333] leading-[20px]">
                {line.replace(/^[•\-–]\s*/, "")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

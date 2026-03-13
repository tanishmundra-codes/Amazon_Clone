"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../../context/CartContext";
import { formatUSDWhole } from "../../../../lib/currency";

function getDeliveryDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const inStock = product.stock > 0;

  async function handleAddToCart() {
    setAdding(true);
    await addToCart(product.id, quantity);
    setAdding(false);
  }

  async function handleBuyNow() {
    await addToCart(product.id, quantity);
    router.push("/checkout");
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 space-y-2.5">
      {/* Price */}
      <div>
        <div className="flex items-baseline gap-1.5">
          {discount > 0 && (
            <>
              <span className="text-[14px] align-top relative -top-[6px]">$</span>
              <span className="text-[22px] font-medium text-[#0f1111]">
                {formatUSDWhole(price)}
              </span>
              <span className="text-[14px] text-[#565959] line-through ml-1">
                ${formatUSDWhole(mrp)}
              </span>
            </>
          )}
          {!discount && (
            <>
              <span className="text-[14px] align-top relative -top-[6px]">$</span>
              <span className="text-[22px] font-medium text-[#0f1111]">
                {formatUSDWhole(price)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* FREE delivery */}
      <p className="text-[14px] text-[#0f1111]">
        <span className="font-bold">FREE delivery </span>
        <span className="font-bold">{getDeliveryDate(3)}</span>
      </p>

      {/* Fastest delivery */}
      <p className="text-[13px] text-[#565959]">
        Or fastest delivery{" "}
        <span className="font-bold text-[#0f1111]">{getDeliveryDate(1)}</span>
      </p>

      {/* Location */}
      <div className="flex items-center gap-1 text-[12px] text-[#007185]">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Deliver to your location</span>
      </div>

      {/* Stock status */}
      {inStock ? (
        <p className="text-[18px] text-[#007600] font-medium pt-1">In Stock</p>
      ) : (
        <p className="text-[18px] text-[#cc0c39] font-medium pt-1">Currently unavailable</p>
      )}

      {/* Ships from / Sold by */}
      <div className="text-[12px] space-y-0.5 pt-0.5">
        <div className="flex gap-2">
          <span className="text-[#565959] w-[65px] shrink-0">Ships from</span>
          <span className="text-[#0f1111]">Amazon</span>
        </div>
        <div className="flex gap-2">
          <span className="text-[#565959] w-[65px] shrink-0">Sold by</span>
          <span className="text-[#007185]">Amazon</span>
        </div>
      </div>

      {/* Quantity selector */}
      {inStock && (
        <div className="flex items-center gap-2 pt-1">
          <label htmlFor="qty" className="text-[14px] text-[#0f1111]">Qty:</label>
          <select
            id="qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded-lg bg-[#f0f2f2] px-2 py-1.5 text-[13px] cursor-pointer shadow-[0_2px_5px_rgba(15,17,17,0.15)]"
          >
            {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      )}

      {/* Add to Cart */}
      {inStock && (
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-[13px] font-medium text-[#0f1111] py-[7px] px-4 rounded-full border-none shadow-[0_2px_5px_rgba(15,17,17,0.15)] cursor-pointer transition-colors disabled:opacity-60"
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      )}

      {/* Buy Now */}
      {inStock && (
        <button
          onClick={handleBuyNow}
          className="w-full bg-[#ffa41c] hover:bg-[#fa8900] active:bg-[#e47911] text-[13px] font-medium text-[#0f1111] py-[7px] px-4 rounded-full border-none shadow-[0_2px_5px_rgba(15,17,17,0.15)] cursor-pointer transition-colors"
        >
          Buy Now
        </button>
      )}

      {/* Secure transaction */}
      <div className="flex items-center gap-1 pt-1">
        <svg className="w-3.5 h-3.5 text-[#565959]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span className="text-[12px] text-[#007185]">Secure transaction</span>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import QuantityControl from "./QuantityControl";
import { formatUSD, formatUSDWhole } from "../../../lib/currency";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;
  const image = product.images?.[0] || "/placeholder.png";
  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const inStock = product.stock > 0;

  return (
    <div className="flex gap-4 p-4 bg-white border-b border-gray-200 last:border-b-0">
      {/* Product image */}
      <Link href={`/product/${product.id}`} className="shrink-0">
        <img
          src={image}
          alt={product.title}
          className="w-[180px] h-[180px] object-contain hover:opacity-90 transition-opacity"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <Link href={`/product/${product.id}`} className="no-underline">
          <h3 className="text-[17px] leading-[24px] text-[#0f1111] line-clamp-2 hover:text-amazon-orange cursor-pointer">
            {product.title}
          </h3>
        </Link>

        {/* Stock status */}
        <p className={`text-xs mt-1 mb-2 ${inStock ? "text-green-700" : "text-red-600"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-medium text-[#0f1111]">
            ${formatUSDWhole(price)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {formatUSD(mrp)}
              </span>
              <span className="text-sm text-red-600 font-medium">
                ({discount}% off)
              </span>
            </>
          )}
        </div>

        {/* Quantity + Remove */}
        <div className="flex items-center gap-4 flex-wrap">
          <QuantityControl
            quantity={quantity}
            onUpdate={(qty) => onUpdateQuantity(item.id, qty)}
            onRemove={() => onRemove(item.id)}
          />
          <span className="text-gray-300">|</span>
          <button
            onClick={() => onRemove(item.id)}
            className="text-[13px] text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

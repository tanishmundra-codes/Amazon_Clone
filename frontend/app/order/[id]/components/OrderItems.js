"use client";

import Link from "next/link";

export default function OrderItems({ items }) {
  return (
    <div className="bg-white rounded-sm shadow-sm p-6">
      <h2 className="text-lg font-medium text-[#0f1111] mb-4">
        Order Items ({items.length} {items.length === 1 ? "item" : "items"})
      </h2>

      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const unitPrice = Number(item.price);
          const image = item.product?.images?.[0] || "/placeholder.png";

          return (
            <div key={item.id} className="flex gap-4 py-4">
              <Link href={`/product/${item.product?.id}`} className="shrink-0">
                <img
                  src={image}
                  alt={item.product?.title}
                  className="w-20 h-20 object-contain hover:opacity-90 transition-opacity"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product?.id}`} className="no-underline">
                  <p className="text-sm text-[#0f1111] line-clamp-2 hover:text-amazon-orange cursor-pointer">
                    {item.product?.title}
                  </p>
                </Link>
                <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  ₹{unitPrice.toLocaleString("en-IN")} each
                </p>
              </div>

              <div className="text-sm font-bold text-[#0f1111] shrink-0">
                ₹
                {(unitPrice * item.quantity).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Row total */}
      <div className="mt-4 pt-4 border-t border-gray-100 text-right text-sm font-bold text-[#0f1111]">
        Total: ₹
        {items
          .reduce((s, i) => s + Number(i.price) * i.quantity, 0)
          .toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </div>
    </div>
  );
}

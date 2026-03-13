"use client";

import Link from "next/link";
import { formatUSD } from "../../../../lib/currency";

const STATUS_COLORS = {
  PENDING:   "text-yellow-700 bg-yellow-50 border border-yellow-200",
  CONFIRMED: "text-blue-700   bg-blue-50   border border-blue-200",
  SHIPPED:   "text-purple-700 bg-purple-50 border border-purple-200",
  DELIVERED: "text-green-700  bg-green-50  border border-green-200",
  CANCELLED: "text-red-700    bg-red-50    border border-red-200",
};

export default function OrderConfirmation({ order }) {
  const statusClass =
    STATUS_COLORS[order.status] || "text-gray-700 bg-gray-50 border border-gray-200";

  return (
    <div className="bg-white rounded-sm shadow-sm p-6 mb-6">
      {/* Success banner */}
      <div className="flex items-start gap-3 mb-6">
        <div className="shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-medium text-[#0f1111]">
            Order placed successfully!
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Thank you for your order. We&apos;ll send you a confirmation soon.
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
        {/* Order metadata */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Order Details
          </h3>
          <div>
            <p className="text-gray-500 text-xs">Order ID</p>
            <p className="text-[#0f1111] font-mono text-xs break-all">{order.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Status</p>
            <span
              className={`inline-block mt-0.5 px-2 py-0.5 rounded text-xs font-medium ${statusClass}`}
            >
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Date</p>
            <p className="text-[#0f1111]">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Payment</p>
            <p className="text-[#0f1111]">{order.paymentMethod}</p>
          </div>
        </div>

        {/* Delivery address */}
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Delivery Address
          </h3>
          <p className="text-[#0f1111] font-medium">{order.user?.name}</p>
          <p className="text-gray-600">{order.shippingAddress}</p>
          <p className="text-gray-600">
            {order.city}, {order.state} – {order.zipCode}
          </p>
          <p className="text-gray-600">Phone: {order.phone}</p>
        </div>
      </div>

      {/* Order total */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium text-[#0f1111]">Order Total</span>
        <span className="text-lg font-bold text-[#0f1111]">
          {formatUSD(order.totalAmount)}
        </span>
      </div>

      {/* CTAs */}
      <div className="mt-5 flex gap-3 flex-wrap">
        <Link
          href="/"
          className="px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] border border-[#FCD200] rounded-lg text-sm font-medium text-[#0f1111] no-underline transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import { formatUSD } from "../../lib/currency";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
  const { cartItems, cartCount, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();
  const [guestProducts, setGuestProducts] = useState({});

  // For guest users, fetch product details for items in localStorage
  useEffect(() => {
    if (user || cartItems.length === 0) return;

    // Guest items are { productId, quantity } — no product details
    const idsToFetch = cartItems
      .filter((i) => !i.product && i.productId)
      .map((i) => i.productId);

    if (idsToFetch.length === 0) return;

    Promise.all(
      idsToFetch.map((id) =>
        fetch(`${API}/products/${id}`)
          .then((r) => r.json())
          .then((json) => (json.success ? json.data : null))
          .catch(() => null)
      )
    ).then((results) => {
      const map = {};
      results.forEach((p) => {
        if (p) map[p.id] = p;
      });
      setGuestProducts(map);
    });
  }, [user, cartItems]);

  // Build display items: for authenticated users, items already have .product
  // For guests, attach the fetched product data
  const displayItems = user
    ? cartItems
    : cartItems
        .map((i) => ({
          id: i.productId,
          quantity: i.quantity,
          product: guestProducts[i.productId] || null,
        }))
        .filter((i) => i.product);

  if (cartCount === 0 && cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-medium text-[#0f1111] mb-4">Your Amazon Cart is empty</h1>
        <Link
          href="/"
          className="inline-block mt-2 text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-6 px-4 flex gap-6 items-start flex-col lg:flex-row">
      {/* Item list */}
      <div className="flex-1 bg-white rounded-sm min-w-0">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-[28px] font-normal text-[#0f1111]">Shopping Cart</h1>
          <p className="text-sm text-gray-500 text-right">Price</p>
        </div>

        {displayItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}

        {/* Bottom subtotal line */}
        <div className="p-4 text-right text-lg text-[#0f1111]">
          Subtotal ({displayItems.reduce((s, i) => s + i.quantity, 0)} items):{" "}
          <span className="font-bold">
            {formatUSD(
              displayItems.reduce((s, i) => s + i.quantity * Number(i.product?.price || 0), 0)
            )}
          </span>
        </div>
      </div>

      {/* Summary sidebar */}
      <div className="w-full lg:w-[300px] shrink-0">
        <CartSummary items={displayItems} />
      </div>
    </div>
  );
}

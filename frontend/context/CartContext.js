"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

const API = process.env.NEXT_PUBLIC_API_URL;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${API}/cart`);
      const json = await res.json();
      if (json.success) {
        setCartItems(json.data.items);
        setCartCount(json.data.totalItems);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      const res = await fetch(`${API}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchCart();
      }
      return json;
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  }, [fetchCart]);

  const updateQuantity = useCallback(async (cartItemId, quantity) => {
    try {
      const res = await fetch(`${API}/cart/${cartItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchCart();
      }
      return json;
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  }, [fetchCart]);

  const removeItem = useCallback(async (cartItemId) => {
    try {
      const res = await fetch(`${API}/cart/${cartItemId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        await fetchCart();
      }
      return json;
    } catch (err) {
      console.error("Failed to remove cart item:", err);
    }
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const API = process.env.NEXT_PUBLIC_API_URL;
const GUEST_CART_KEY = "amazon_clone_guest_cart";

// ── localStorage helpers ──
function readGuestCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
}

function writeGuestCart(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function clearGuestCart() {
  localStorage.removeItem(GUEST_CART_KEY);
}

export function CartProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const mergedRef = useRef(false);

  // ── Fetch DB cart (authenticated) ──
  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${API}/cart`, { credentials: "include" });
      const json = await res.json();
      if (json.success) {
        setCartItems(json.data.items);
        setCartCount(json.data.totalItems);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }, []);

  // ── Load guest cart into state ──
  const loadGuestCart = useCallback(() => {
    const items = readGuestCart();
    setCartItems(items);
    setCartCount(items.reduce((s, i) => s + i.quantity, 0));
  }, []);

  // ── Merge guest cart → DB, then clear localStorage ──
  const mergeGuestCart = useCallback(async () => {
    const guestItems = readGuestCart();
    if (guestItems.length === 0) return;

    try {
      await fetch(`${API}/cart/merge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: guestItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
    } catch (err) {
      console.error("Failed to merge cart:", err);
    }
    clearGuestCart();
  }, []);

  // ── React to auth changes ──
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      // On login: merge guest cart then fetch DB cart
      if (!mergedRef.current) {
        mergedRef.current = true;
        mergeGuestCart().then(fetchCart);
      } else {
        fetchCart();
      }
    } else {
      mergedRef.current = false;
      loadGuestCart();
    }
  }, [user, authLoading, fetchCart, loadGuestCart, mergeGuestCart]);

  // ── Add to cart ──
  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      if (user) {
        // Authenticated → API
        try {
          const res = await fetch(`${API}/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId, quantity }),
          });
          const json = await res.json();
          if (json.success) await fetchCart();
          return json;
        } catch (err) {
          console.error("Failed to add to cart:", err);
        }
      } else {
        // Guest → localStorage
        const items = readGuestCart();
        const idx = items.findIndex((i) => i.productId === productId);
        if (idx >= 0) {
          items[idx].quantity += quantity;
        } else {
          items.push({ productId, quantity });
        }
        writeGuestCart(items);
        loadGuestCart();
        return { success: true };
      }
    },
    [user, fetchCart, loadGuestCart]
  );

  // ── Update quantity ──
  const updateQuantity = useCallback(
    async (cartItemId, quantity) => {
      if (user) {
        try {
          const res = await fetch(`${API}/cart/${cartItemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ quantity }),
          });
          const json = await res.json();
          if (json.success) await fetchCart();
          return json;
        } catch (err) {
          console.error("Failed to update cart item:", err);
        }
      } else {
        // For guest cart, cartItemId is the productId
        const items = readGuestCart();
        const idx = items.findIndex((i) => i.productId === cartItemId);
        if (idx >= 0) {
          items[idx].quantity = quantity;
          writeGuestCart(items);
          loadGuestCart();
        }
      }
    },
    [user, fetchCart, loadGuestCart]
  );

  // ── Remove item ──
  const removeItem = useCallback(
    async (cartItemId) => {
      if (user) {
        try {
          const res = await fetch(`${API}/cart/${cartItemId}`, {
            method: "DELETE",
            credentials: "include",
          });
          const json = await res.json();
          if (json.success) await fetchCart();
          return json;
        } catch (err) {
          console.error("Failed to remove cart item:", err);
        }
      } else {
        const items = readGuestCart().filter((i) => i.productId !== cartItemId);
        writeGuestCart(items);
        loadGuestCart();
      }
    },
    [user, fetchCart, loadGuestCart]
  );

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeItem, refreshCart: fetchCart }}>
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

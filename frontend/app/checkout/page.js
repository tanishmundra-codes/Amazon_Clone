"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CheckoutSteps from "./components/CheckoutSteps";
import ShippingForm from "./components/ShippingForm";
import OrderReview from "./components/OrderReview";

const API = process.env.NEXT_PUBLIC_API_URL;
const STEPS = ["Shipping", "Review & Place Order"];

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { cartItems, cartCount, refreshCart } = useCart();

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    shippingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login?redirect=/checkout");
    }
  }, [user, authLoading, router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!authLoading && user && cartCount === 0 && cartItems.length === 0 && !orderPlaced) {
      router.replace("/cart");
    }
  }, [cartCount, cartItems.length, user, authLoading, router, orderPlaced]);

  // Pre-fill name from logged-in user
  useEffect(() => {
    if (user?.name && !shipping.fullName) {
      setShipping((prev) => ({ ...prev, fullName: user.name }));
    }
  }, [user]);

  if (authLoading || !user) return null;

  async function handlePlaceOrder() {
    setPlacing(true);
    setError("");
    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          shippingAddress: shipping.shippingAddress,
          city: shipping.city,
          state: shipping.state,
          zipCode: shipping.zipCode,
          phone: shipping.phone,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to place order");
      setOrderPlaced(true);
      await refreshCart(); // sync cart count in Navbar
      router.push(`/order/${json.data.orderId}`);
    } catch (err) {
      setError(err.message);
      setPlacing(false);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto py-8 px-4">
      <CheckoutSteps steps={STEPS} current={step} />

      {step === 0 && (
        <ShippingForm
          values={shipping}
          onChange={setShipping}
          onNext={() => setStep(1)}
          user={user}
        />
      )}

      {step === 1 && (
        <OrderReview
          shipping={shipping}
          cartItems={cartItems}
          onBack={() => setStep(0)}
          onPlaceOrder={handlePlaceOrder}
          placing={placing}
          error={error}
        />
      )}
    </div>
  );
}

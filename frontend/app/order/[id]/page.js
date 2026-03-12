"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderItems from "./components/OrderItems";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!id || !user) return;

    async function fetchOrder() {
      try {
        const res = await fetch(`${API}/orders/${id}`, {
          credentials: "include",
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Order not found");
        setOrder(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id, user]);

  if (authLoading || loading) {
    return (
      <div className="max-w-[900px] mx-auto py-12 px-4 text-center text-gray-500">
        Loading order details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[900px] mx-auto py-12 px-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="max-w-[900px] mx-auto py-8 px-4">
      <OrderConfirmation order={order} />
      <OrderItems items={order.items} />
    </div>
  );
}

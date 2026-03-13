"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { formatUSD } from "../../lib/currency";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login?redirect=/orders");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      try {
        const res = await fetch(`${API}/orders`, {
          credentials: "include",
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch orders");
        setOrders(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (authLoading || loading) {
    return <div className="max-w-[1000px] mx-auto py-8 px-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="max-w-[1000px] mx-auto py-8 px-4 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-[1000px] mx-auto py-8 px-4">
      {/* Breadcrumb / Title area */}
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-[#0f1111]">Your Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border text-center border-gray-200 rounded-lg p-10 mt-6">
          <h2 className="text-xl font-medium text-[#0f1111] mb-2">You have no orders</h2>
          <Link
            href="/"
            className="mt-4 px-6 py-2 inline-block bg-[#ffd814] hover:bg-[#f7ca00] border border-[#FCD200] rounded-lg text-sm font-medium text-[#0f1111] shadow-sm transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Order Header */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex flex-wrap gap-4 text-sm text-[#565959]">
                <div className="flex-1 min-w-[150px]">
                  <p className="uppercase text-xs font-semibold">Order Placed</p>
                  <p className="mt-1">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <p className="uppercase text-xs font-semibold">Total</p>
                  <p className="mt-1">{formatUSD(order.totalAmount)}</p>
                </div>
                <div className="flex-[2] min-w-[200px] text-right">
                  <p className="uppercase text-xs font-semibold">Order # {order.id}</p>
                  <Link
                    href={`/order/${order.id}`}
                    className="mt-1 inline-block text-[#007185] hover:text-[#c40000] hover:underline"
                  >
                    View order details
                  </Link>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 space-y-4">
                <div className="font-bold text-[#0f1111] mb-2">{order.status}</div>

                {order.items.map((item) => {
                  const image = item.product?.images?.[0] || "/placeholder.png";
                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="shrink-0 w-24 h-24">
                        <Link href={`/product/${item.product?.id || ""}`}>
                          <img
                            src={image}
                            alt={item.product?.title}
                            className="w-full h-full object-contain"
                          />
                        </Link>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product?.id || ""}`}
                          className="text-[#007185] hover:text-[#c40000] hover:underline font-medium text-sm line-clamp-2"
                        >
                          {item.product?.title}
                        </Link>
                        <p className="text-sm text-[#0f1111] mt-1">Qty: {item.quantity}</p>
                        <div className="mt-2 flex gap-2">
                          <button className="px-3 py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium rounded-lg border border-[#FCD200]">
                            Buy it again
                          </button>
                          <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-sm font-medium rounded-lg border border-gray-300">
                            View item
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { formatUSD } from "../../../lib/currency";

export default function CartSummary({ items }) {
  const { user } = useAuth();
  const router = useRouter();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * Number(i.product?.price || i.price || 0),
    0
  );

  function handleProceed() {
    if (!user) {
      router.push("/auth/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  }

  return (
    <div className="bg-white rounded-sm p-5 sticky top-4">
      <p className="text-lg text-[#0f1111] mb-4">
        Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
        <span className="font-bold">{formatUSD(subtotal)}</span>
      </p>

      <button
        onClick={handleProceed}
        className="w-full py-2 px-4 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] border border-[#FCD200] text-sm text-[#0f1111] cursor-pointer transition-colors"
      >
        {user ? `Proceed to Buy (${totalItems} ${totalItems === 1 ? "item" : "items"})` : "Sign in to checkout"}
      </button>
    </div>
  );
}

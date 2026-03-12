"use client";

export default function OrderReview({
  shipping,
  cartItems,
  onBack,
  onPlaceOrder,
  placing,
  error,
}) {
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.quantity * Number(i.product?.price || 0),
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ── Left column: address + items ── */}
      <div className="lg:col-span-2 space-y-4">
        {/* Delivery address */}
        <div className="bg-white rounded-sm shadow-sm p-5">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-[#0f1111]">Delivery Address</h3>
            <button
              onClick={onBack}
              className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Change
            </button>
          </div>
          <p className="text-sm mt-2 text-[#0f1111] font-medium">{shipping.fullName}</p>
          <p className="text-sm text-gray-600">{shipping.shippingAddress}</p>
          <p className="text-sm text-gray-600">
            {shipping.city}, {shipping.state} – {shipping.zipCode}
          </p>
          <p className="text-sm text-gray-600">Phone: {shipping.phone}</p>
        </div>

        {/* Order items */}
        <div className="bg-white rounded-sm shadow-sm p-5">
          <h3 className="font-medium text-[#0f1111] mb-4">
            Order Items ({totalItems} {totalItems === 1 ? "item" : "items"})
          </h3>
          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => {
              const price = Number(item.product?.price || 0);
              const image = item.product?.images?.[0] || "/placeholder.png";
              return (
                <div key={item.id} className="flex gap-4 py-3">
                  <img
                    src={image}
                    alt={item.product?.title}
                    className="w-16 h-16 object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0f1111] line-clamp-2">
                      {item.product?.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-[#0f1111] shrink-0">
                    ₹
                    {(price * item.quantity).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Right column: summary + CTA ── */}
      <div>
        <div className="bg-white rounded-sm shadow-sm p-5 sticky top-4">
          <h3 className="font-medium text-[#0f1111] mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Items ({totalItems})</span>
              <span>
                ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-700 font-medium">FREE</span>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between font-bold text-base text-[#0f1111]">
              <span>Order Total</span>
              <span>
                ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">Payment: Cash on Delivery</p>

          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

          <button
            onClick={onPlaceOrder}
            disabled={placing}
            className="mt-4 w-full py-2 px-4 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] border border-[#FCD200] text-sm font-medium text-[#0f1111] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {placing ? "Placing Order…" : "Place Order"}
          </button>

          <button
            onClick={onBack}
            className="mt-2 w-full py-2 px-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 text-sm text-gray-700 transition-colors cursor-pointer"
          >
            Back to Shipping
          </button>
        </div>
      </div>
    </div>
  );
}

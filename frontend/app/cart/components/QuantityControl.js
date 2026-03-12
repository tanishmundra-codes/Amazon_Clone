"use client";

export default function QuantityControl({ quantity, onUpdate, onRemove }) {
  return (
    <div className="flex items-center gap-1">
      {/* Decrease / Delete */}
      <button
        onClick={() => (quantity === 1 ? onRemove() : onUpdate(quantity - 1))}
        className="w-8 h-8 rounded-l-md border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg leading-none cursor-pointer"
        aria-label={quantity === 1 ? "Remove item" : "Decrease quantity"}
      >
        {quantity === 1 ? (
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
          </svg>
        ) : (
          "−"
        )}
      </button>

      {/* Quantity display */}
      <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm font-medium select-none">
        {quantity}
      </span>

      {/* Increase */}
      <button
        onClick={() => onUpdate(quantity + 1)}
        className="w-8 h-8 rounded-r-md border border-gray-300 bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg leading-none cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

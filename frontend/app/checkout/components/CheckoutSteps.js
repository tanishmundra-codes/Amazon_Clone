export default function CheckoutSteps({ steps, current }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex items-center gap-2">
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                i < current
                  ? "bg-green-500 border-green-500 text-white"
                  : i === current
                  ? "bg-[#ffd814] border-[#e6b800] text-[#0f1111]"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {i < current ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {/* Label */}
            <span
              className={`text-sm font-medium ${
                i <= current ? "text-[#0f1111]" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-16 mx-3 ${
                i < current ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

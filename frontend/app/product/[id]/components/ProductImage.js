"use client";

import { useState } from "react";

export default function ProductImage({ images, title }) {
  const imageList = images?.length ? images : ["/placeholder.png"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="sticky top-4">
      {/* Main image */}
      <div className="border border-gray-200 rounded flex items-center justify-center bg-white p-6 min-h-[560px]">
        <img
          src={imageList[selectedIndex]}
          alt={title}
          className="max-h-[520px] max-w-full object-contain cursor-crosshair"
        />
      </div>

      {/* Thumbnail strip below */}
      {imageList.length > 1 && (
        <div className="flex gap-2 mt-3 justify-center">
          {imageList.map((src, i) => (
            <button
              key={i}
              onMouseEnter={() => setSelectedIndex(i)}
              onClick={() => setSelectedIndex(i)}
              className={`w-[48px] h-[48px] border rounded-sm p-0.5 flex items-center justify-center cursor-pointer bg-white transition-colors ${
                i === selectedIndex
                  ? "border-[#007185] shadow-[0_0_3px_2px_rgba(0,113,133,0.3)]"
                  : "border-gray-300 hover:border-[#007185]"
              }`}
            >
              <img src={src} alt={`${title} ${i + 1}`} className="max-h-full max-w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

const CATEGORY_FALLBACK_IMAGES = {
  electronics: [
    "/Electronics/UltraView274KIPSMonitor.webp",
    "/Electronics/SmartFitProFitnessTracker.webp",
  ],
  books: [
    "/Books/AtomicHabits.webp",
    "/Books/CleanCode.webp",
  ],
  clothing: [
    "/Clothes/UrbanFlexSlimFitStretchChinos.jpg",
    "/Clothes/ComfortStrideRunningShoes.jpg",
  ],
  kitchen: [
    "/Kitchen/BrewMasterProProgrammableCoffeeMaker.webp",
    "/Kitchen/ChefEdge.webp",
  ],
  sports: [
    "/Sports/FlexFitAdjustableDumbbellSet.webp",
    "/Sports/TrailBlazer50LHikingBackpack.webp",
  ],
};

export default function ProductImage({ images, title, categorySlug, categoryImage }) {
  const imageList = useMemo(() => {
    const uniqueImages = Array.from(new Set(images?.filter(Boolean) || []));

    if (uniqueImages.length >= 2) {
      return uniqueImages;
    }

    const fallbackFromCategory = CATEGORY_FALLBACK_IMAGES[categorySlug] || [];
    const merged = [
      ...uniqueImages,
      ...(categoryImage ? [categoryImage] : []),
      ...fallbackFromCategory,
      "/placeholder.png",
    ];

    return Array.from(new Set(merged.filter(Boolean))).slice(0, 3);
  }, [images, categorySlug, categoryImage]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [imageList]);

  useEffect(() => {
    if (imageList.length <= 1) return;

    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % imageList.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [imageList.length]);

  function goPrev() {
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  }

  function goNext() {
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  }

  return (
    <div className="sticky top-4">
      {/* Main image */}
      <div className="relative border border-gray-200 rounded flex items-center justify-center bg-white p-6 min-h-140 group">
        <img
          src={imageList[selectedIndex]}
          alt={title}
          className="max-h-130 max-w-full object-contain cursor-crosshair"
        />

        {imageList.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-gray-300 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-gray-300 bg-white/90 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip below */}
      {imageList.length > 1 && (
        <div className="flex gap-2 mt-3 justify-center">
          {imageList.map((src, i) => (
            <button
              key={i}
              onMouseEnter={() => setSelectedIndex(i)}
              onClick={() => setSelectedIndex(i)}
              className={`w-12 h-12 border rounded-sm p-0.5 flex items-center justify-center cursor-pointer bg-white transition-colors ${
                i === selectedIndex
                  ? "border-amazon-blue shadow-[0_0_3px_2px_rgba(0,113,133,0.3)]"
                  : "border-gray-300 hover:border-amazon-blue"
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

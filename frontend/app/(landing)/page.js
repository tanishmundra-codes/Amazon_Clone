"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

const API = process.env.NEXT_PUBLIC_API_URL;

const BANNERS = [
  "/Bannners/banner.jpg",
  "/Bannners/banner2.jpg",
  "/Bannners/banner3.jpg",
  "/Bannners/banner4.jpg",
  "/Bannners/banner5.jpg",
];

const CATEGORY_CARDS = [
  {
    title: "Electronics",
    slug: "electronics",
    items: [
      { img: "/Electronics/ProMaxWirelessNoiseCancellingHeadphones.webp", label: "Headphones" },
      { img: "/Electronics/UltraView274KIPSMonitor.webp", label: "Monitors" },
      { img: "/Electronics/AeroGlideWirelessErgonomicMouse.webp", label: "Mice & Keyboards" },
      { img: "/Electronics/ClearCam4KWebcamwithRingLight.webp", label: "Webcams" },
    ],
  },
  {
    title: "Books",
    slug: "books",
    items: [
      { img: "/Books/AtomicHabits.webp", label: "Self Help" },
      { img: "/Books/CleanCode.webp", label: "Programming" },
      { img: "/Books/deepwork.webp", label: "Productivity" },
      { img: "/Books/DesigningDataIntensiveApplications.webp", label: "Tech & Data" },
    ],
  },
  {
    title: "Clothing",
    slug: "clothing",
    items: [
      { img: "/Clothes/ClassicFitPremiumCottonCrewNeckT-Shirt.jpg", label: "T-Shirts" },
      { img: "/Clothes/ComfortStrideRunningShoes.jpg", label: "Shoes" },
      { img: "/Clothes/ThermoLayerMerinoWoolHoodie.jpg", label: "Hoodies" },
      { img: "/Clothes/UrbanFlexSlimFitStretchChinos.jpg", label: "Pants" },
    ],
  },
  {
    title: "Kitchen & Dining",
    slug: "kitchen",
    items: [
      { img: "/Kitchen/BrewMasterProProgrammableCoffeeMaker.webp", label: "Coffee Makers" },
      { img: "/Kitchen/CastIronLodge.webp", label: "Cast Iron" },
      { img: "/Kitchen/NutriBlend.webp", label: "Blenders" },
      { img: "/Kitchen/SilkPourNon-StickCookwareSet.jpg", label: "Cookware Sets" },
    ],
  },
];

// ── Banner Carousel ──
function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + BANNERS.length) % BANNERS.length),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % BANNERS.length),
    []
  );

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600 }}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {BANNERS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            className="w-full shrink-0 object-cover object-top"
            style={{ height: 600 }}
          />
        ))}
      </div>

      {/* Bottom fade to gray background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-gray-100 via-gray-100/80 to-transparent pointer-events-none" />

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-0 top-0 z-10 bg-transparent hover:bg-white/10 border-none text-gray-700 w-12 flex items-center justify-center transition-all cursor-pointer"
        style={{ height: 340 }}
        aria-label="Previous banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-0 top-0 z-10 bg-transparent hover:bg-white/10 border-none text-gray-700 w-12 flex items-center justify-center transition-all cursor-pointer"
        style={{ height: 340 }}
        aria-label="Next banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

// ── Category Card ──
function CategoryCard({ title, slug, items }) {
  return (
    <div className="bg-white p-5 shadow-sm flex flex-col" style={{ height: 500 }}>
      <h3 className="text-[21px] font-bold text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.map((item) => (
          <Link key={item.label} href={`/?category=${slug}`} className="no-underline group">
            <div className="flex items-center justify-center overflow-hidden bg-gray-50" style={{ width: 128, height: 138 }}>
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <p className="text-xs text-black mt-1 leading-tight">{item.label}</p>
          </Link>
        ))}
      </div>
      <Link
        href={`/?category=${slug}`}
        className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline no-underline mt-3 block shrink-0"
      >
        See more
      </Link>
    </div>
  );
}

// ── Product Carousel ──
const CAROUSEL_ITEMS = [
  { img: "/Clothes/ClassicFitPremiumCottonCrewNeckT-Shirt.jpg", label: "Cotton T-Shirt" },
  { img: "/Clothes/UrbanFlexSlimFitStretchChinos.jpg", label: "Stretch Chinos" },
  { img: "/Clothes/ThermoLayerMerinoWoolHoodie.jpg", label: "Wool Hoodie" },
  { img: "/Clothes/ComfortStrideRunningShoes.jpg", label: "Running Shoes" },
  { img: "/Clothes/DryTechMoisture.jpg", label: "DryTech Shirt" },
  { img: "/Clothes/AllWeatherLightweightWindbreakerJacket.webp", label: "Windbreaker" },
  { img: "/Sports/AquaStrikeInsulatedWaterBottle.webp", label: "Water Bottle" },
  { img: "/Sports/FlexFitAdjustableDumbbellSet.webp", label: "Dumbbell Set" },
  { img: "/Sports/GripForceResistanceBandset.webp", label: "Resistance Bands" },
  { img: "/Sports/YogaZenPremiumNon-SlipMat.webp", label: "Yoga Mat" },
  { img: "/Sports/TrailBlazer50LHikingBackpack.webp", label: "Hiking Backpack" },
  { img: "/Sports/SpinCycleIndoorExerciseBike.webp", label: "Exercise Bike" },
];

function ProductCarousel({ title, items, linkHref }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="bg-white shadow-sm py-5 px-4">
      <div className="flex items-baseline gap-3 mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {linkHref && (
          <Link href={linkHref} className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline no-underline">
            See more
          </Link>
        )}
      </div>
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-white/90 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {/* Scrollable container */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {items.map((item, i) => (
            <div key={i} className="shrink-0 w-[150px] flex flex-col items-center">
              <div className="h-[180px] w-full flex items-center justify-center">
                <img src={item.img} alt={item.label} className="max-h-full max-w-full object-contain" />
              </div>
            </div>
          ))}
        </div>
        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-white/90 hover:bg-white border border-gray-300 shadow-md flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Product Grid Card (shows 4 products from a category) ──
function ProductGridCard({ title, slug, products }) {
  const items = products.filter((p) => p.category?.slug === slug).slice(0, 4);
  return (
    <div className="bg-white p-5 shadow-sm flex flex-col" style={{ minHeight: 420 }}>
      <h3 className="text-[21px] font-bold text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {items.map((product) => (
          <Link key={product.id} href={`/?category=${slug}`} className="no-underline group">
            <div className="flex items-center justify-center overflow-hidden bg-gray-50" style={{ width: 128, height: 138 }}>
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <p className="text-xs text-black mt-1 leading-tight line-clamp-2">{product.title}</p>
            <p className="text-xs font-bold text-gray-800 mt-0.5">${Number(product.price).toFixed(2)}</p>
          </Link>
        ))}
      </div>
      <Link
        href={`/?category=${slug}`}
        className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline no-underline mt-3 block shrink-0"
      >
        See more
      </Link>
    </div>
  );
}

// ── Main Page ──
function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  const isFiltered = !!(search || category);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API}/categories`);
        const json = await res.json();
        if (json.success) setCategories(json.data);
      } catch {}
    }
    async function loadAllProducts() {
      try {
        const res = await fetch(`${API}/products`);
        const json = await res.json();
        if (json.success) setAllProducts(json.data);
      } catch {}
    }
    loadCategories();
    loadAllProducts();
  }, []);

  useEffect(() => {
    if (!isFiltered) {
      setLoading(false);
      return;
    }
    async function loadProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);
        const res = await fetch(`${API}/products?${params}`);
        const json = await res.json();
        if (json.success) setProducts(json.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [search, category, isFiltered]);

  // ── Homepage layout ──
  if (!isFiltered) {
    return (
      <div className="bg-gray-100">
        {/* Banner + overlapping cards container */}
        <div className="relative">
          <BannerCarousel />
          {/* Cards overlapping the banner */}
          <div className="relative z-20 w-full px-4 -mt-85">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORY_CARDS.map((card) => (
                <CategoryCard key={card.slug} {...card} />
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid Cards */}
        <div className="w-full px-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductGridCard title="Top Electronics" slug="electronics" products={allProducts} />
            <ProductGridCard title="Popular Books" slug="books" products={allProducts} />
            <ProductGridCard title="Trending Clothing" slug="clothing" products={allProducts} />
            <ProductGridCard title="Kitchen Essentials" slug="kitchen" products={allProducts} />
          </div>
        </div>

        {/* More items to consider */}
        <div className="w-full px-4 mt-6">
          <ProductCarousel
            title="More items to consider"
            items={CAROUSEL_ITEMS}
            linkHref="/?category=clothing"
          />
        </div>
      </div>
    );
  }

  // ── Filtered / search view ──
  const activeCategoryName =
    categories.find((c) => c.slug === category)?.name || null;

  return (
    <div className="min-h-[calc(100vh-120px)]">
      <div className="p-4 md:p-6">
        {/* Results header */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {!loading && (
              <>
                1-{products.length} of {products.length} results
                {search && (
                  <>
                    {" "}for{" "}
                    <span className="font-bold text-amazon-orange">
                      &ldquo;{search}&rdquo;
                    </span>
                  </>
                )}
                {activeCategoryName && (
                  <> in <span className="font-bold">{activeCategoryName}</span></>
                )}
              </>
            )}
          </p>
          <div className="h-px bg-gray-200 mt-3" />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white rounded-sm p-4 animate-pulse">
                <div className="h-55 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-8 bg-gray-200 rounded-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-2">No results found</p>
            <p className="text-sm text-gray-400">
              Try different keywords or browse departments from the All menu.
            </p>
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

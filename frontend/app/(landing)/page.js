"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./components/ProductCard";

const API = process.env.NEXT_PUBLIC_API_URL;

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories for sidebar
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API}/categories`);
        const json = await res.json();
        if (json.success) setCategories(json.data);
      } catch {
        // sidebar will be empty
      }
    }
    loadCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
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
  }, [search, category]);

  function handleCategoryClick(slug) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (slug) params.set("category", slug);
    router.push(`/${params.toString() ? `?${params}` : ""}`);
  }

  const activeCategoryName =
    categories.find((c) => c.slug === category)?.name || null;

  return (
    <div className="flex min-h-[calc(100vh-120px)]">
      {/* ── Left Sidebar ── */}
      <aside className="hidden md:block w-[220px] shrink-0 bg-white border-r border-gray-200 p-4 pt-5">
        <h3 className="text-[15px] font-bold text-gray-900 mb-3">Department</h3>
        <ul className="space-y-0.5 list-none m-0 p-0">
          <li>
            <button
              onClick={() => handleCategoryClick("")}
              className={`text-left w-full text-[13px] py-1 px-2 rounded cursor-pointer border-none bg-transparent ${
                !category
                  ? "font-bold text-amazon-orange"
                  : "text-gray-700 hover:text-amazon-orange hover:underline"
              }`}
            >
              All Departments
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.slug)}
                className={`text-left w-full text-[13px] py-1 px-2 rounded cursor-pointer border-none bg-transparent ${
                  category === cat.slug
                    ? "font-bold text-amazon-orange"
                    : "text-gray-700 hover:text-amazon-orange hover:underline"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 p-4 md:p-6">
        {/* Results header */}
        <div className="mb-4">
          {search || category ? (
            <>
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
            </>
          ) : (
            <p className="text-sm text-gray-600">
              {!loading && <>{products.length} results</>}
            </p>
          )}
          <div className="h-px bg-gray-200 mt-3" />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-white rounded-sm p-4 animate-pulse">
                <div className="h-[220px] bg-gray-200 rounded mb-3" />
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
              Try different keywords or browse departments on the left.
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

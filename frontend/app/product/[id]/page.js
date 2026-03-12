"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductImage from "./components/ProductImage";
import ProductInfo from "./components/ProductInfo";
import ProductActions from "./components/ProductActions";
import RelatedProducts from "./components/RelatedProducts";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API}/products/${id}`);
        const json = await res.json();
        if (json.success) {
          setProduct(json.data);
        } else {
          setError("Product not found");
        }
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;
  if (!product) return <ErrorState message="Product not found" />;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-3 text-sm text-[#565959]">
        <Link href="/" className="hover:text-amazon-orange hover:underline text-amazon-blue no-underline">
          Home
        </Link>
        <span className="mx-1">›</span>
        {product.category && (
          <>
            <Link
              href={`/?category=${product.category.slug}`}
              className="hover:text-amazon-orange hover:underline text-amazon-blue no-underline"
            >
              {product.category.name}
            </Link>
            <span className="mx-1">›</span>
          </>
        )}
        <span className="text-[#c45500]">{product.title}</span>
      </nav>

      {/* Main product layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12 flex flex-col lg:flex-row gap-6">
        {/* Left – Image */}
        <div className="lg:w-[38%] shrink-0">
          <ProductImage images={product.images} title={product.title} />
        </div>

        {/* Middle – Product info */}
        <div className="flex-1 min-w-0 lg:border-r lg:border-gray-200 lg:pr-6">
          <ProductInfo product={product} />
        </div>

        {/* Right – Buy box */}
        <div className="lg:w-[280px] shrink-0">
          <ProductActions product={product} />
        </div>
      </div>

      {/* Related products */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
        <RelatedProducts
          categorySlug={product.category?.slug}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto px-6 lg:px-10 py-8">
      <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
        <div className="lg:w-[38%] h-[400px] bg-gray-200 rounded" />
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="lg:w-[280px] h-[300px] bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-lg text-gray-700">{message}</p>
      <Link
        href="/"
        className="text-amazon-blue hover:text-amazon-orange hover:underline no-underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

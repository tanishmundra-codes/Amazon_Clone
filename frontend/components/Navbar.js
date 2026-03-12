"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const API = process.env.NEXT_PUBLIC_API_URL;

const DEPARTMENT_LINKS = [
  { label: "All", href: "/" },
  { label: "Electronics", href: "/?category=electronics" },
  { label: "Books", href: "/?category=books" },
  { label: "Clothing", href: "/?category=clothing" },
  { label: "Kitchen", href: "/?category=kitchen" },
  { label: "Sports", href: "/?category=sports" },
  { label: "Today's Deals", href: "/" },
  { label: "Customer Service", href: "/" },
  { label: "Gift Cards", href: "/" },
  { label: "Sell", href: "/" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${API}/categories`);
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch {
        // categories dropdown will just show "All"
      }
    }
    loadCategories();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    router.push(`/${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* ── Main Nav Bar ── */}
      <div className="bg-amazon-dark flex items-center px-2 h-[60px] gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="px-2 py-1 border border-transparent hover:border-white rounded flex items-center shrink-0"
        >
          <img src="/navbar/logo.svg" alt="Amazon Clone" width={130} height={50} />
        </Link>

        {/* Deliver to */}
        <div className="hidden md:flex items-end px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer shrink-0 gap-1">
          <img src="/navbar/location.svg" alt="Location" width={20} height={20} className="mb-0.5" />
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs leading-tight">Delivering to Gharroli 110091</span>
            <span className="text-white font-bold text-sm leading-tight">Update location</span>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 h-[45px] rounded-md focus-within:ring-2 focus-within:ring-amazon-accent overflow-hidden"
        >
          {/* Category dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#e6e6e6] hover:bg-[#d4d4d4] text-gray-700 text-sm pl-2 pr-5 border-r border-gray-300 outline-none cursor-pointer rounded-l-md appearance-none shrink-0
              bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23555%22%20stroke-width%3D%223%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E')]
              bg-no-repeat bg-[right_4px_center]"
            style={{ width: 50, height: 45 }}
            aria-label="Search category"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Search input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon.com"
            className="flex-1 px-3 text-[15px] outline-none border-none bg-white text-gray-900 placeholder-gray-500"
          />

          {/* Search button */}
          <button
            type="submit"
            className="bg-amazon-accent hover:bg-amazon-accent-hover w-[46px] flex items-center justify-center rounded-r-md"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="w-[22px] h-[22px] text-amazon-dark"
            >
              <circle cx={11} cy={11} r={8} />
              <line x1={21} y1={21} x2={16.65} y2={16.65} />
            </svg>
          </button>
        </form>

        {/* Right side links */}
        <div className="hidden lg:flex items-center gap-1 text-white shrink-0">
          {/* Language */}
          <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-sm font-bold">
            <img src="/navbar/flag.png" alt="IN" width={22} height={16} />
            EN
          </div>

          {/* Account */}
          <Link
            href="/"
            className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-white no-underline"
          >
            <span className="text-xs text-gray-300">Hello, sign in</span>
            <span className="text-sm font-bold">Account & Lists</span>
          </Link>

          {/* Returns & Orders */}
          <Link
            href="/"
            className="flex flex-col px-2 py-1 border border-transparent hover:border-white rounded text-white no-underline"
          >
            <span className="text-xs text-gray-300">Returns</span>
            <span className="text-sm font-bold">& Orders</span>
          </Link>

          {/* Cart */}
          <Link
            href="/"
            className="flex items-center px-2 py-1 border border-transparent hover:border-white rounded text-white no-underline relative"
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                className="w-8 h-8"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1={3} y1={6} x2={21} y2={6} />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {/* Count badge */}
              <span className="absolute -top-1 right-0 bg-amazon-accent text-amazon-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-bold ml-1">Cart</span>
          </Link>
        </div>

        {/* Mobile cart (always visible) */}
        <Link
          href="/"
          className="lg:hidden flex items-center text-white no-underline relative px-1"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="w-7 h-7"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1={3} y1={6} x2={21} y2={6} />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-1 right-0 bg-amazon-accent text-amazon-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </Link>
      </div>

      {/* ── Secondary Nav (Department Links) ── */}
      <div className="bg-amazon-secondary flex items-center px-4 py-1.5 gap-1 text-white text-sm overflow-x-auto">
        {DEPARTMENT_LINKS.map((link) =>
          link.label === "All" ? (
            <button
              key={link.label}
              onClick={() => setSidebarOpen(true)}
              className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap text-white bg-transparent cursor-pointer text-sm"
            >
              <span className="font-bold flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth={2} fill="none" />
                </svg>
                All
              </span>
            </button>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap text-white no-underline"
            >
              {link.label}
            </Link>
          )
        )}
      </div>

      {/* ── Sidebar Drawer ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Panel */}
          <aside className="relative w-[320px] max-w-[85vw] bg-white h-full shadow-xl overflow-y-auto animate-slide-in-left">
            {/* Header */}
            <div className="bg-amazon-secondary px-5 py-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="text-white font-bold text-lg">Hello, sign in</span>
            </div>

            {/* Department list */}
            <div className="p-4">
              <h3 className="text-[16px] font-bold text-gray-900 mb-3">Shop By Department</h3>
              <ul className="space-y-0.5 list-none m-0 p-0">
                <li>
                  <button
                    onClick={() => {
                      router.push("/");
                      setSidebarOpen(false);
                    }}
                    className="text-left w-full text-[14px] py-2 px-3 rounded cursor-pointer border-none bg-transparent text-gray-700 hover:bg-gray-100 hover:text-amazon-orange"
                  >
                    All Departments
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        router.push(`/?category=${cat.slug}`);
                        setSidebarOpen(false);
                      }}
                      className="text-left w-full text-[14px] py-2 px-3 rounded cursor-pointer border-none bg-transparent text-gray-700 hover:bg-gray-100 hover:text-amazon-orange"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-2 left-[325px] max-[85vw]:left-[calc(85vw+5px)] text-white bg-transparent border-none cursor-pointer"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-7 h-7">
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import MobileDrawer from "./MobileDrawer";

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
  const { user, logout } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <div className="bg-amazon-dark px-2 md:px-4 py-2 flex flex-col gap-2">
        <div className="flex items-center justify-between lg:justify-start gap-2 lg:gap-3 min-h-11">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden h-11 w-11 flex items-center justify-center border border-transparent hover:border-white rounded text-white"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Link
            href="/"
            className="px-2 py-1 border border-transparent hover:border-white rounded flex items-center shrink-0 h-11"
          >
            <img src="/navbar/logo.svg" alt="Amazon Clone" width={130} height={40} loading="lazy" />
          </Link>

          <div className="hidden lg:flex items-end px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer shrink-0 gap-1 h-11">
            <img src="/navbar/location.svg" alt="Location" width={20} height={20} className="mb-0.5" loading="lazy" />
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs leading-tight">Delivering to Gharroli 110091</span>
              <span className="text-white font-bold text-sm leading-tight">Update location</span>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex lg:flex w-1/2 lg:flex-1 h-11 rounded-md focus-within:ring-2 focus-within:ring-amazon-accent overflow-hidden"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#e6e6e6] hover:bg-[#d4d4d4] text-gray-700 text-sm pl-2 pr-5 border-r border-gray-300 outline-none cursor-pointer rounded-l-md appearance-none shrink-0
              bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23555%22%20stroke-width%3D%223%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E')]
              bg-no-repeat bg-right"
              style={{ width: 56, height: 44 }}
              aria-label="Search category"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Amazon.in"
              className="flex-1 px-3 text-sm md:text-base outline-none border-none bg-white text-gray-900 placeholder-gray-500"
            />

            <button
              type="submit"
              className="bg-amazon-accent hover:bg-amazon-accent-hover w-12 h-11 flex items-center justify-center rounded-r-md"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="w-5 h-5 text-amazon-dark"
              >
                <circle cx={11} cy={11} r={8} />
                <line x1={21} y1={21} x2={16.65} y2={16.65} />
              </svg>
            </button>
          </form>

          <div className="hidden lg:flex items-center gap-1 text-white shrink-0">
            <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer text-sm font-bold h-11">
              <img src="/navbar/flag.png" alt="IN" width={22} height={16} loading="lazy" />
              EN
            </div>

            {user ? (
              <div className="relative group">
                <button className="flex flex-col justify-center h-11 px-2 py-1 border border-transparent hover:border-white rounded text-white bg-transparent cursor-pointer">
                  <span className="text-xs text-gray-300">Hello, {user.name.split(" ")[0]}</span>
                  <span className="text-sm font-bold">Account & Lists</span>
                </button>
                <div className="absolute right-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded shadow-lg min-w-45 z-50 py-2">
                  <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Your Account</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">Your Orders</Link>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 bg-transparent border-none cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex flex-col justify-center h-11 px-2 py-1 border border-transparent hover:border-white rounded text-white no-underline"
              >
                <span className="text-xs text-gray-300">Hello, sign in</span>
                <span className="text-sm font-bold">Account & Lists</span>
              </Link>
            )}

            <Link
              href="/orders"
              className="flex flex-col justify-center h-11 px-2 py-1 border border-transparent hover:border-white rounded text-white no-underline"
            >
              <span className="text-xs text-gray-300">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center h-11 px-2 py-1 border border-transparent hover:border-white rounded text-white no-underline relative"
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
                <span className="absolute -top-1 right-0 bg-amazon-accent text-amazon-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-sm font-bold ml-1">Cart</span>
            </Link>
          </div>

          <Link
            href="/cart"
            className="lg:hidden flex items-center text-white no-underline relative px-1 h-11"
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

        <form
          onSubmit={handleSearch}
          className="flex md:hidden w-full h-11 rounded-md focus-within:ring-2 focus-within:ring-amazon-accent overflow-hidden"
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#e6e6e6] hover:bg-[#d4d4d4] text-gray-700 text-sm pl-2 pr-5 border-r border-gray-300 outline-none cursor-pointer rounded-l-md appearance-none shrink-0
              bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23555%22%20stroke-width%3D%223%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E')]
              bg-no-repeat bg-right"
            style={{ width: 56, height: 44 }}
            aria-label="Search category"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-3 text-sm outline-none border-none bg-white text-gray-900 placeholder-gray-500"
          />

          <button
            type="submit"
            className="bg-amazon-accent hover:bg-amazon-accent-hover w-12 h-11 flex items-center justify-center rounded-r-md"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="w-5 h-5 text-amazon-dark"
            >
              <circle cx={11} cy={11} r={8} />
              <line x1={21} y1={21} x2={16.65} y2={16.65} />
            </svg>
          </button>
        </form>
      </div>

      <div className="hidden lg:flex bg-amazon-secondary items-center px-4 py-1.5 gap-1 text-white text-sm overflow-x-auto">
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap text-white bg-transparent cursor-pointer text-sm font-bold flex items-center gap-1"
          aria-label="Open all departments"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          All
        </button>

        {DEPARTMENT_LINKS.filter((link) => link.label !== "All").map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-2 py-1 border border-transparent hover:border-white rounded whitespace-nowrap text-white no-underline"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        departmentLinks={DEPARTMENT_LINKS}
        user={user}
        onNavigate={(path) => {
          router.push(path);
          setDrawerOpen(false);
        }}
      />
    </header>
  );
}

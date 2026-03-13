"use client";

import Link from "next/link";

export default function MobileDrawer({ open, onClose, categories, departmentLinks, user, onNavigate }) {
  return (
    <div className={`fixed inset-0 z-100 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-[320px] max-w-[85vw] bg-white shadow-xl transition-transform duration-300 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-amazon-secondary px-4 py-3 flex items-center justify-between">
          <span className="text-white font-bold text-base">{user ? `Hello, ${user.name.split(" ")[0]}` : "Hello, sign in"}</span>
          <button
            onClick={onClose}
            className="h-11 w-11 flex items-center justify-center text-white"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-68px)]">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Departments</h3>
          <ul className="space-y-1 list-none m-0 p-0 mb-4">
            {departmentLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => onNavigate(link.href)}
                  className="w-full text-left h-11 px-3 rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-bold text-gray-900 mb-2">Categories</h3>
          <ul className="space-y-1 list-none m-0 p-0 mb-4">
            <li>
              <button
                onClick={() => onNavigate("/")}
                className="w-full text-left h-11 px-3 rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => onNavigate(`/?category=${cat.slug}`)}
                  className="w-full text-left h-11 px-3 rounded text-sm text-gray-700 hover:bg-gray-100"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-bold text-gray-900 mb-2">Quick Links</h3>
          <div className="flex flex-col gap-1">
            <Link href="/" onClick={onClose} className="h-11 px-3 rounded text-sm text-gray-700 hover:bg-gray-100 flex items-center no-underline">
              Home
            </Link>
            <Link href="/" onClick={onClose} className="h-11 px-3 rounded text-sm text-gray-700 hover:bg-gray-100 flex items-center no-underline">
              Deals
            </Link>
            <Link href="/" onClick={onClose} className="h-11 px-3 rounded text-sm text-gray-700 hover:bg-gray-100 flex items-center no-underline">
              Orders
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function AuthForm({ mode, onSubmit, error, loading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRegister = mode === "register";

  function handleSubmit(e) {
    e.preventDefault();
    if (isRegister) {
      onSubmit(name, email, password);
    } else {
      onSubmit(email, password);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isRegister && (
        <div>
          <label className="block text-sm font-bold text-[#0f1111] mb-1">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-[#0f1111] mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          suppressHydrationWarning
          className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#0f1111] mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isRegister ? "At least 6 characters" : ""}
          required
          minLength={isRegister ? 6 : undefined}
          className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-amazon-orange focus:ring-1 focus:ring-amazon-orange"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 rounded-lg bg-[#ffd814] hover:bg-[#f7ca00] border border-[#FCD200] text-sm text-[#0f1111] cursor-pointer transition-colors disabled:opacity-50"
      >
        {loading ? "Please wait…" : isRegister ? "Create your Amazon account" : "Sign in"}
      </button>
    </form>
  );
}

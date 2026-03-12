"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import AuthForm from "../components/AuthForm";

export default function RegisterPage() {
  const { user, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user, router, redirect]);

  async function handleRegister(name, email, password) {
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      router.push(redirect);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-start justify-center pt-8 bg-white">
      <div className="w-full max-w-[350px]">
        {/* Logo */}
        <div className="text-center mb-4">
          <Link href="/">
            <img src="/navbar/logo-dark.svg" alt="Amazon" width={120} className="mx-auto" onError={(e) => { e.target.style.display = 'none'; }} />
          </Link>
        </div>

        <div className="border border-gray-300 rounded-lg p-5">
          <h1 className="text-[28px] font-normal text-[#0f1111] mb-4">Create account</h1>

          <AuthForm mode="register" onSubmit={handleRegister} error={error} loading={loading} />
        </div>

        <p className="text-sm text-[#0f1111] mt-6 text-center">
          Already have an account?{" "}
          <Link
            href={`/auth/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="text-amazon-blue hover:text-amazon-orange hover:underline no-underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

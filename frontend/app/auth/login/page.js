"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import AuthForm from "../components/AuthForm";

function LoginContent() {
  const { user, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user, router, redirect]);

  async function handleLogin(email, password) {
    setError("");
    setLoading(true);
    try {
      await login(email, password);
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
          <h1 className="text-[28px] font-normal text-[#0f1111] mb-4">Sign in</h1>

          <AuthForm mode="login" onSubmit={handleLogin} error={error} loading={loading} />
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">New to Amazon?</span>
          </div>
        </div>

        <Link
          href={`/auth/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
          className="block w-full py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 text-sm text-[#0f1111] text-center no-underline transition-colors"
        >
          Create your Amazon account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

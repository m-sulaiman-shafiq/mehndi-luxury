"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/browser/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: loginError } =
      await createClient().auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !data.user) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/admin/check", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      await createClient().auth.signOut();
      setError("You do not have administrator access.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFF9E9] px-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#EADFCB]">
        <p className="text-sm font-semibold tracking-[0.2em] text-[#A17B43] text-center">
          THE MEHNDI EDIT
        </p>

        <h1 className="mt-4 text-3xl font-semibold text-[#59402F] text-center">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-[#77704E] text-center">
          Sign in to manage your store orders.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#59402F] mb-2">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#EADFCB] px-4 py-3 outline-none focus:border-[#F49A62]"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#59402F] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#EADFCB] px-4 py-3 outline-none focus:border-[#F49A62]"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-[#F49A62] via-[#F6CE69] to-[#F3A9B5] py-3 font-semibold text-[#59402F] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

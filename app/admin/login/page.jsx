"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--cream)] px-4">
      <div className="card p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 font-bold text-lg mb-1">
          <span className="w-8 h-8 rounded-lg bg-[var(--green)] text-white flex items-center justify-center text-sm">
            P
          </span>
          Admin Panel
        </div>
        <p className="text-sm text-[var(--muted)] mb-6">Sign in to manage PakCareerHub</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pakcareerhub@gmail.com"
              className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-[var(--muted)] mt-6 bg-[var(--cream)] rounded-lg p-3">
          Default demo credentials: <br />
          <strong>pakcareerhub@gmail.com</strong> / <strong>admin123</strong> <br />
          Change these via ADMIN_EMAIL / ADMIN_PASSWORD env vars before deploying.
        </p>
      </div>
    </div>
  );
}

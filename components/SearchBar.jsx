"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2 shadow-xl max-w-3xl mx-auto"
    >
      <div className="flex items-center flex-1 px-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--muted)]">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title, keywords, or department"
          className="w-full px-2 py-3 outline-none text-[var(--ink)]"
        />
      </div>
      <div className="hidden sm:block w-px bg-[var(--line)]" />
      <div className="flex items-center flex-1 px-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--muted)]">
          <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City or province..."
          className="w-full px-2 py-3 outline-none text-[var(--ink)]"
        />
      </div>
      <button type="submit" className="btn-primary px-8 py-3 whitespace-nowrap">
        Search Jobs
      </button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const jobsMenu = [
  { label: "All Jobs", href: "/jobs" },
  { label: "Government Jobs", href: "/jobs?type=government" },
  { label: "Private Jobs", href: "/jobs?type=private" },
  { label: "By Department", href: "/#departments" },
  { label: "By City", href: "/jobs#cities" },
];

const agenciesMenu = [
  { label: "FPSC Jobs", href: "/agencies/fpsc" },
  { label: "PPSC Jobs", href: "/agencies/ppsc" },
  { label: "NTS Jobs", href: "/agencies/nts" },
  { label: "PTS Jobs", href: "/agencies/pts" },
  { label: "SPSC Jobs", href: "/agencies/spsc" },
  { label: "KPPSC Jobs", href: "/agencies/kppsc" },
];

const moreMenu = [
  { label: "Blog", href: "/blog" },
  { label: "MCQs", href: "/mcqs" },
  { label: "Past Papers", href: "/pastpapers" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="link-nav flex items-center gap-1 py-2"
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-[var(--line)] rounded-xl shadow-lg py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-[#344054] hover:bg-[var(--cream)] hover:text-[var(--green)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[var(--line)]">
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--ink)]">
          <span className="w-8 h-8 rounded-lg bg-[var(--green)] text-white flex items-center justify-center text-sm font-bold">
            P
          </span>
          PakCareerHub
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/" className="link-nav text-[var(--green)]">Home</Link>
          <Dropdown label="Jobs" items={jobsMenu} />
          <Dropdown label="Agencies" items={agenciesMenu} />
          <Link href="/results" className="link-nav">Results</Link>
          <Link href="/rollnoslips" className="link-nav">Roll No Slips</Link>
          <Link href="/admissions" className="link-nav">Admissions</Link>
          <Dropdown label="More" items={moreMenu} />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center border border-[var(--line)] rounded-lg px-4 py-2 text-sm font-semibold text-[var(--ink)] hover:border-[var(--green)] hover:text-[var(--green)]"
          >
            Admin
          </Link>
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--line)] bg-white px-5 py-4 space-y-3">
          <Link href="/" className="block link-nav" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/jobs" className="block link-nav" onClick={() => setMobileOpen(false)}>All Jobs</Link>
          <Link href="/jobs?type=government" className="block link-nav" onClick={() => setMobileOpen(false)}>Government Jobs</Link>
          <Link href="/jobs?type=private" className="block link-nav" onClick={() => setMobileOpen(false)}>Private Jobs</Link>
          <Link href="/results" className="block link-nav" onClick={() => setMobileOpen(false)}>Results</Link>
          <Link href="/rollnoslips" className="block link-nav" onClick={() => setMobileOpen(false)}>Roll No Slips</Link>
          <Link href="/admissions" className="block link-nav" onClick={() => setMobileOpen(false)}>Admissions</Link>
          <Link href="/blog" className="block link-nav" onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="/admin" className="block link-nav" onClick={() => setMobileOpen(false)}>Admin</Link>
        </div>
      )}
    </header>
  );
}

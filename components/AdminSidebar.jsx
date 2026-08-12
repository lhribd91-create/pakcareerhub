"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "grid" },
  { label: "Jobs", href: "/admin/jobs", icon: "briefcase" },
  { label: "Departments", href: "/admin/departments", icon: "building" },
  { label: "Cities", href: "/admin/cities", icon: "pin" },
  { label: "Categories", href: "/admin/categories", icon: "tag" },
  { label: "Results & Slips", href: "/admin/results", icon: "doc" },
  { label: "Admissions", href: "/admin/admissions", icon: "cap" },
  { label: "Blog Posts", href: "/admin/blog", icon: "post" },
  { label: "MCQs", href: "/admin/mcqs", icon: "book" },
  { label: "Past Papers", href: "/admin/pastpapers", icon: "paper" },
];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" };
  switch (name) {
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
    case "briefcase":
      return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.7" /></svg>;
    case "building":
      return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.7" /><path d="M8 8h1M12 8h1M16 8h1M8 12h1M12 12h1M16 12h1M8 16h1M12 16h1M16 16h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
    case "pin":
      return <svg {...common}><path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>;
    case "tag":
      return <svg {...common}><path d="M3 12l9-9h6a2 2 0 012 2v6l-9 9-8-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><circle cx="16" cy="8" r="1.3" fill="currentColor" /></svg>;
    case "doc":
      return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "cap":
      return <svg {...common}><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" stroke="currentColor" strokeWidth="1.7" /></svg>;
    case "post":
      return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
    case "book":
      return <svg {...common}><path d="M4 5a2 2 0 012-2h11v16H6a2 2 0 00-2 2V5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M17 19a2 2 0 002-2V3" stroke="currentColor" strokeWidth="1.7" /></svg>;
    case "paper":
      return <svg {...common}><path d="M8 3h8l4 4v14H8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /><path d="M8 3v14H4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>;
    default:
      return null;
  }
}

export default function AdminSidebar({ email }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="w-64 shrink-0 bg-[var(--navy)] text-white min-h-screen flex flex-col">
      <div className="p-5 flex items-center gap-2 font-bold text-lg border-b border-white/10">
        <span className="w-8 h-8 rounded-lg bg-[var(--green)] text-white flex items-center justify-center text-sm">
          P
        </span>
        Admin Panel
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-[var(--green)] text-white" : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 12l9-9 9 9M5 10v10h14V10" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
          View Site
        </Link>
        {email && <p className="text-xs text-gray-400 truncate">{email}</p>}
        <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Logout
        </button>
      </div>
    </div>
  );
}

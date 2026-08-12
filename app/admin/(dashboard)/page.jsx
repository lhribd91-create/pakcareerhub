import Link from "next/link";
import { getAll } from "@/lib/db";

function StatCard({ label, value, href }) {
  return (
    <Link href={href} className="card p-5">
      <p className="text-sm text-[var(--muted)] mb-2">{label}</p>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <span className="text-sm text-[var(--green)] font-semibold">View / Manage &rarr;</span>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const jobs = getAll("jobs");
  const departments = getAll("departments");
  const cities = getAll("cities");
  const results = getAll("results");
  const rollnoslips = getAll("rollnoslips");
  const admissions = getAll("admissions");
  const blog = getAll("blog");
  const mcqs = getAll("mcqs");
  const pastpapers = getAll("pastpapers");

  const govtCount = jobs.filter((j) => j.type === "government").length;
  const privateCount = jobs.filter((j) => j.type === "private").length;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-[var(--muted)] mb-8">Overview and management of PakCareerHub.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total Jobs" value={jobs.length} href="/admin/jobs" />
        <StatCard label="Departments" value={departments.length} href="/admin/departments" />
        <StatCard label="Cities" value={cities.length} href="/admin/cities" />
        <StatCard label="Govt Jobs" value={govtCount} href="/admin/jobs" />
        <StatCard label="Private Jobs" value={privateCount} href="/admin/jobs" />
        <StatCard label="Results & Slips" value={results.length + rollnoslips.length} href="/admin/results" />
        <StatCard label="Admissions" value={admissions.length} href="/admin/admissions" />
        <StatCard label="Blog Posts" value={blog.length} href="/admin/blog" />
        <StatCard label="MCQs" value={mcqs.length} href="/admin/mcqs" />
        <StatCard label="Past Papers" value={pastpapers.length} href="/admin/pastpapers" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/jobs/new" className="btn-primary px-4 py-2 text-sm">+ Post New Job</Link>
            <Link href="/admin/departments" className="border border-[var(--line)] rounded-lg px-4 py-2 text-sm font-semibold hover:border-[var(--green)]">+ Add Department</Link>
            <Link href="/admin/admissions" className="border border-[var(--line)] rounded-lg px-4 py-2 text-sm font-semibold hover:border-[var(--green)]">+ Add Admission</Link>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-bold mb-4">System Status</h2>
          <p className="text-sm text-[var(--muted)]">
            Data is stored in a local JSON file for this demo build. All changes made here reflect
            immediately on the live site. For production, connect a real database (see README).
          </p>
        </div>
      </div>
    </div>
  );
}

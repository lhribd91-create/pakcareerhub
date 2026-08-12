import { getAll } from "@/lib/db";
import JobCard from "@/components/JobCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function JobsPage({ searchParams }) {
  const sp = await searchParams;
  const q = (sp.q || "").toLowerCase();
  const city = (sp.city || "").toLowerCase();
  const type = sp.type || "";
  const departmentId = sp.department || "";

  const allJobs = getAll("jobs");
  const departments = getAll("departments");
  const cities = getAll("cities");

  const jobs = allJobs.filter((job) => {
    if (q) {
      const hay = `${job.title} ${job.organization} ${(job.tags || []).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (city && !job.city?.toLowerCase().includes(city)) return false;
    if (type && job.type !== type) return false;
    if (departmentId && job.departmentId !== departmentId) return false;
    return true;
  });

  return (
    <div className="container-px max-w-7xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
        <p className="text-[var(--muted)]">{jobs.length} jobs found</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
          <form method="get" className="card p-5 space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-1.5">Keyword</label>
              <input
                name="q"
                defaultValue={sp.q || ""}
                placeholder="Job title, organization..."
                className="w-full border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--green)]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">City</label>
              <input
                name="city"
                defaultValue={sp.city || ""}
                placeholder="e.g. Lahore"
                className="w-full border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--green)]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">Job Type</label>
              <select name="type" defaultValue={type} className="w-full border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--green)]">
                <option value="">All Types</option>
                <option value="government">Government</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-1.5">Department</label>
              <select name="department" defaultValue={departmentId} className="w-full border border-[var(--line)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--green)]">
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-primary w-full py-2.5">Apply Filters</button>
            <Link href="/jobs" className="block text-center text-sm text-[var(--muted)] hover:text-[var(--green)]">
              Clear filters
            </Link>
          </form>

          <div id="cities" className="card p-5">
            <h3 className="font-semibold mb-3 text-sm">Browse by City</h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link
                  key={c.id}
                  href={`/jobs?city=${encodeURIComponent(c.name)}`}
                  className="badge hover:border-[var(--green)] hover:text-[var(--green)]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {jobs.length === 0 ? (
            <div className="card p-12 text-center text-[var(--muted)]">
              No jobs match your filters. Try adjusting your search.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

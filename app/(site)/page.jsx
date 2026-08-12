import Link from "next/link";
import { getAll } from "@/lib/db";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function HomePage() {
  const jobs = getAll("jobs");
  const departments = getAll("departments");
  const cities = getAll("cities");
  const results = getAll("results");
  const rollnoslips = getAll("rollnoslips");
  const admissions = getAll("admissions");

  const govtJobs = jobs.filter((j) => j.type === "government").slice(0, 6);
  const privateJobs = jobs.filter((j) => j.type === "private").slice(0, 4);

  const deptCounts = departments.map((d) => ({
    ...d,
    count: jobs.filter((j) => j.departmentId === d.id).length,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className="container-px max-w-5xl mx-auto py-20 text-center">
          <span className="badge bg-white/10 text-white border-white/20 mb-6">
            Pakistan&apos;s Premier Job Portal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Find Your Next Career Move in Government or Private Sector
          </h1>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
            The most trusted destination for FPSC, PPSC, NTS, and top private
            company jobs across Pakistan. Updated daily.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--navy-light)] text-white">
        <div className="container-px max-w-7xl mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold">{jobs.length}+</div>
            <div className="text-sm text-gray-300 tracking-wide">ACTIVE JOBS</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">{departments.length}</div>
            <div className="text-sm text-gray-300 tracking-wide">DEPARTMENTS</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">{cities.length}</div>
            <div className="text-sm text-gray-300 tracking-wide">CITIES</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold">
              {new Set(jobs.map((j) => j.organization)).size}
            </div>
            <div className="text-sm text-gray-300 tracking-wide">COMPANIES</div>
          </div>
        </div>
      </section>

      {/* Latest Government Jobs */}
      <section className="container-px max-w-7xl mx-auto py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-[var(--green)] text-xs font-bold tracking-widest mb-1">
              &bull; OFFICIAL NOTIFICATIONS
            </p>
            <h2 className="text-3xl font-bold">Latest Government Jobs</h2>
          </div>
          <Link href="/jobs?type=government" className="border border-[var(--line)] rounded-lg px-4 py-2 text-sm font-semibold hover:border-[var(--green)] hover:text-[var(--green)]">
            View All Govt Jobs
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {govtJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Browse by Department */}
      <section id="departments" className="bg-[var(--cream)] py-16">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Browse by Department</h2>
            <p className="text-[var(--muted)]">
              Find the most sought-after federal and provincial government positions across Pakistan.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {deptCounts.map((dept) => (
              <Link
                key={dept.id}
                href={`/jobs?department=${dept.id}`}
                className="card p-5 flex flex-col items-center text-center gap-2"
              >
                <div className="w-11 h-11 rounded-full bg-[var(--cream)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="7" width="18" height="13" rx="2" stroke="#344054" strokeWidth="1.7" />
                    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#344054" strokeWidth="1.7" />
                  </svg>
                </div>
                <div className="font-semibold text-sm">{dept.name}</div>
                <div className="text-xs text-[var(--muted)]">{dept.count} Jobs</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Private Jobs */}
      <section className="container-px max-w-7xl mx-auto py-16">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-blue-600 text-xs font-bold tracking-widest mb-1">
              &bull; CORPORATE SECTOR
            </p>
            <h2 className="text-3xl font-bold">Latest Private Jobs</h2>
          </div>
          <Link href="/jobs?type=private" className="border border-[var(--line)] rounded-lg px-4 py-2 text-sm font-semibold hover:border-[var(--green)] hover:text-[var(--green)]">
            View All Private Jobs
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Results / Roll No Slips / Admissions */}
      <section className="container-px max-w-7xl mx-auto pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                Latest Results
              </h3>
              <Link href="/results" className="text-sm font-semibold text-[var(--green)]">View All</Link>
            </div>
            <ul className="space-y-3">
              {results.map((r) => (
                <li key={r.id} className="flex items-center justify-between text-sm border-b border-[var(--line)] pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-[var(--muted)] text-xs">{r.organization}</p>
                  </div>
                  <span className="text-[var(--muted)] text-xs whitespace-nowrap">{formatDate(r.date)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
                  <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                Roll No Slips
              </h3>
              <Link href="/rollnoslips" className="text-sm font-semibold text-[var(--green)]">View All</Link>
            </div>
            <ul className="space-y-3">
              {rollnoslips.map((r) => (
                <li key={r.id} className="flex items-center justify-between text-sm border-b border-[var(--line)] pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-[var(--muted)] text-xs">{r.organization}</p>
                  </div>
                  <span className="text-[var(--muted)] text-xs whitespace-nowrap">{formatDate(r.date)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
                  <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                Admissions
              </h3>
              <Link href="/admissions" className="text-sm font-semibold text-[var(--green)]">View All</Link>
            </div>
            <ul className="space-y-3">
              {admissions.map((a) => (
                <li key={a.id} className="flex items-center justify-between text-sm border-b border-[var(--line)] pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-[var(--muted)] text-xs">{a.organization}</p>
                  </div>
                  <span className="text-red-500 text-xs whitespace-nowrap">Due: {formatDate(a.dueDate)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

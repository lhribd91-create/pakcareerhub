import { getAll } from "@/lib/db";
import JobCard from "@/components/JobCard";
import { notFound } from "next/navigation";

export default async function AgencyPage({ params }) {
  const { slug } = await params;
  const agencies = getAll("agencies");
  const agency = agencies.find((a) => a.id === slug);
  if (!agency) notFound();

  const jobs = getAll("jobs").filter((j) => j.agencyId === slug);

  return (
    <div className="container-px max-w-7xl mx-auto py-12">
      <div className="mb-8">
        <span className="badge bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]/30 mb-3">
          Agency
        </span>
        <h1 className="text-3xl font-bold mb-2">{agency.name} Jobs</h1>
        <p className="text-[var(--muted)]">{agency.fullName} &mdash; {jobs.length} open positions</p>
      </div>

      {jobs.length === 0 ? (
        <div className="card p-12 text-center text-[var(--muted)]">
          No open positions from {agency.name} right now. Check back soon.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

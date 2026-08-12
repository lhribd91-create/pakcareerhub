import { getById, getAll } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobCard from "@/components/JobCard";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = getById("jobs", id);
  if (!job) notFound();

  const related = getAll("jobs")
    .filter((j) => j.id !== job.id && (j.type === job.type || j.departmentId === job.departmentId))
    .slice(0, 3);

  return (
    <div className="container-px max-w-5xl mx-auto py-12">
      <Link href="/jobs" className="text-sm text-[var(--muted)] hover:text-[var(--green)] flex items-center gap-1 mb-6">
        &larr; Back to Jobs
      </Link>

      <div className="card p-8 mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{job.title}</h1>
            <p className="text-[var(--muted)]">{job.organization}</p>
          </div>
          <span className={`badge ${job.type === "government" ? "bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]/30" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
            {job.type === "government" ? "Government" : "Private"}
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[var(--cream)] rounded-xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Location</p>
            <p className="font-semibold">{job.city}</p>
          </div>
          <div className="bg-[var(--cream)] rounded-xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Deadline</p>
            <p className="font-semibold">{formatDate(job.deadline)}</p>
          </div>
          <div className="bg-[var(--cream)] rounded-xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Vacancies</p>
            <p className="font-semibold">{job.vacancies || "N/A"}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg mb-2">Job Description</h2>
          <p className="text-[var(--muted)] leading-relaxed">{job.description}</p>
        </div>

        {job.eligibility && (
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Eligibility Criteria</h2>
            <p className="text-[var(--muted)] leading-relaxed">{job.eligibility}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {(job.tags || []).map((tag) => (
            <span key={tag} className="badge text-[var(--muted)]">{tag}</span>
          ))}
        </div>

        <button className="btn-primary px-8 py-3 w-full sm:w-auto">Apply Now</button>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Related Jobs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

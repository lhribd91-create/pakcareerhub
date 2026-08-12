import Link from "next/link";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="card p-6 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-lg bg-[var(--cream)] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#344054" strokeWidth="1.7" />
            <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#344054" strokeWidth="1.7" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--ink)] leading-snug">{job.title}</h3>
          <p className="text-sm text-[var(--muted)]">{job.organization}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          {job.city}
        </span>
        <span className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Full Time
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-sm text-[var(--muted)] border-t border-[var(--line)] pt-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        Deadline: {formatDate(job.deadline)}
      </div>

      <div className="flex flex-wrap gap-2">
        {(job.tags || []).slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={`badge ${
              tag.toLowerCase() === "government" || tag.toLowerCase() === "private"
                ? "bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]/30"
                : "text-[var(--muted)]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

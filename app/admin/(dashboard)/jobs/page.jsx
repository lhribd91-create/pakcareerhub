"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/data/jobs");
    const data = await res.json();
    setJobs(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id) {
    if (!confirm("Delete this job posting? This cannot be undone.")) return;
    await fetch(`/api/data/jobs/${id}`, { method: "DELETE" });
    load();
  }

  const filtered = jobs.filter((j) =>
    `${j.title} ${j.organization}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Manage Jobs</h1>
        <Link href="/admin/jobs/new" className="btn-primary px-4 py-2.5 text-sm">
          + Add New Job
        </Link>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search jobs..."
        className="w-full max-w-md border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)] mb-6"
      />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-left text-[var(--muted)]">
              <th className="p-4">Job Title</th>
              <th className="p-4">Organization</th>
              <th className="p-4">Type</th>
              <th className="p-4">Deadline</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4 text-[var(--muted)]" colSpan={5}>Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td className="p-4 text-[var(--muted)]" colSpan={5}>No jobs found.</td></tr>
            ) : (
              filtered.map((job) => (
                <tr key={job.id} className="border-b border-[var(--line)] last:border-0">
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4 text-[var(--muted)]">{job.organization}</td>
                  <td className="p-4">
                    <span className={`badge ${job.type === "government" ? "bg-[var(--green)]/10 text-[var(--green)] border-[var(--green)]/30" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="p-4 text-[var(--muted)]">{job.deadline}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/jobs/${job.id}/edit`} className="text-[var(--green)] font-semibold">Edit</Link>
                      <button onClick={() => onDelete(job.id)} className="text-red-600 font-semibold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

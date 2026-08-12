"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const emptyJob = {
  title: "",
  organization: "",
  type: "government",
  departmentId: "",
  agencyId: "",
  city: "",
  deadline: "",
  vacancies: "",
  description: "",
  eligibility: "",
  tags: "",
  featured: false,
};

export default function JobForm({ initialJob }) {
  const router = useRouter();
  const [form, setForm] = useState(
    initialJob
      ? { ...initialJob, tags: (initialJob.tags || []).join(", ") }
      : emptyJob
  );
  const [departments, setDepartments] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/data/departments").then((r) => r.json()).then((d) => setDepartments(d.items || []));
    fetch("/api/data/agencies").then((r) => r.json()).then((d) => setAgencies(d.items || []));
  }, []);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      vacancies: form.vacancies ? Number(form.vacancies) : 0,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      departmentId: form.departmentId || null,
      agencyId: form.agencyId || null,
    };

    try {
      const url = initialJob ? `/api/data/jobs/${initialJob.id}` : "/api/data/jobs";
      const method = initialJob ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError("Failed to save job. Please check the fields and try again.");
        setSaving(false);
        return;
      }
      router.push("/admin/jobs");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-5 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="text-sm font-semibold block mb-1.5">Job Title *</label>
          <input required value={form.title} onChange={(e) => set("title", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">Organization *</label>
          <input required value={form.organization} onChange={(e) => set("organization", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">Job Type *</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]">
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">City *</label>
          <input required value={form.city} onChange={(e) => set("city", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">Deadline *</label>
          <input required type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">Department</label>
          <select value={form.departmentId || ""} onChange={(e) => set("departmentId", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]">
            <option value="">None</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">Agency (for FPSC/PPSC/NTS pages)</label>
          <select value={form.agencyId || ""} onChange={(e) => set("agencyId", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]">
            <option value="">None</option>
            {agencies.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1.5">Vacancies</label>
          <input type="number" min="0" value={form.vacancies} onChange={(e) => set("vacancies", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-semibold block mb-1.5">Tags (comma separated)</label>
          <input value={form.tags} onChange={(e) => set("tags", e.target.value)}
            placeholder="Government, FPSC, IT Jobs"
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-semibold block mb-1.5">Description *</label>
          <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm font-semibold block mb-1.5">Eligibility Criteria</label>
          <textarea rows={3} value={form.eligibility} onChange={(e) => set("eligibility", e.target.value)}
            className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="featured" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} />
          <label htmlFor="featured" className="text-sm font-medium">Feature this job on homepage</label>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn-primary px-6 py-2.5 disabled:opacity-60">
          {saving ? "Saving..." : initialJob ? "Update Job" : "Post Job"}
        </button>
      </div>
    </form>
  );
}

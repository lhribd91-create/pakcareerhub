"use client";

import { useEffect, useState } from "react";

export default function McqsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ question: "", category: "", options: ["", "", "", ""], correctIndex: 0 });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/data/mcqs");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function onSave(e) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/data/mcqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ question: "", category: "", options: ["", "", "", ""], correctIndex: 0 });
    load();
  }

  async function onDelete(id) {
    if (!confirm("Delete this MCQ?")) return;
    await fetch(`/api/data/mcqs/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">MCQs</h1>
          <p className="text-[var(--muted)] text-sm">Manage practice MCQs shown on the MCQ Practice page.</p>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="btn-primary px-4 py-2.5 text-sm">
          + Add New MCQ
        </button>
      </div>

      {showForm && (
        <form onSubmit={onSave} className="card p-6 my-6 space-y-4 max-w-2xl">
          <div>
            <label className="text-sm font-semibold block mb-1.5">Question *</label>
            <input required value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1.5">Category</label>
            <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]" />
          </div>
          {form.options.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                required
                value={opt}
                onChange={(e) => {
                  const opts = [...form.options];
                  opts[idx] = e.target.value;
                  setForm((f) => ({ ...f, options: opts }));
                }}
                placeholder={`Option ${idx + 1}`}
                className="flex-1 border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]"
              />
              <label className="flex items-center gap-1.5 text-sm whitespace-nowrap">
                <input type="radio" name="correct" checked={form.correctIndex === idx} onChange={() => setForm((f) => ({ ...f, correctIndex: idx }))} />
                Correct
              </label>
            </div>
          ))}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary px-5 py-2 text-sm disabled:opacity-60">
              {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-[var(--line)] rounded-lg px-5 py-2 text-sm font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-x-auto mt-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-left text-[var(--muted)]">
              <th className="p-4">Question</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4 text-[var(--muted)]" colSpan={3}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="p-4 text-[var(--muted)]" colSpan={3}>No MCQs yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-[var(--line)] last:border-0">
                  <td className="p-4">{item.question}</td>
                  <td className="p-4 text-[var(--muted)]">{item.category}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => onDelete(item.id)} className="text-red-600 font-semibold">Delete</button>
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

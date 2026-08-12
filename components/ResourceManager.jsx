"use client";

import { useEffect, useState } from "react";

export default function ResourceManager({ collection, title, description, fields, columns, wrapperClassName = "p-8" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(`/api/data/${collection}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [collection]);

  function openNew() {
    setForm({});
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
  }

  async function onSave(e) {
    e.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/data/${collection}/${editingId}` : `/api/data/${collection}`;
    const method = editingId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setForm({});
    setEditingId(null);
    load();
  }

  async function onDelete(id) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/data/${collection}/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className={wrapperClassName}>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-[var(--muted)] text-sm">{description}</p>}
        </div>
        <button onClick={openNew} className="btn-primary px-4 py-2.5 text-sm">
          + Add New
        </button>
      </div>

      {showForm && (
        <form onSubmit={onSave} className="card p-6 my-6 space-y-4 max-w-2xl">
          <h2 className="font-bold">{editingId ? "Edit Item" : "Add New Item"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="text-sm font-semibold block mb-1.5">{f.label}{f.required && " *"}</label>
                {f.type === "textarea" ? (
                  <textarea
                    required={f.required}
                    rows={3}
                    value={form[f.name] || ""}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]"
                  />
                ) : (
                  <input
                    required={f.required}
                    type={f.type || "text"}
                    value={form[f.name] || ""}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                    className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--green)]"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary px-5 py-2 text-sm disabled:opacity-60">
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm({}); setEditingId(null); }}
              className="border border-[var(--line)] rounded-lg px-5 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-x-auto mt-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line)] text-left text-[var(--muted)]">
              {columns.map((c) => <th key={c.key} className="p-4">{c.label}</th>)}
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-4 text-[var(--muted)]" colSpan={columns.length + 1}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="p-4 text-[var(--muted)]" colSpan={columns.length + 1}>No items yet. Add your first one.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-[var(--line)] last:border-0">
                  {columns.map((c) => (
                    <td key={c.key} className="p-4">{item[c.key]}</td>
                  ))}
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => openEdit(item)} className="text-[var(--green)] font-semibold">Edit</button>
                      <button onClick={() => onDelete(item.id)} className="text-red-600 font-semibold">Delete</button>
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

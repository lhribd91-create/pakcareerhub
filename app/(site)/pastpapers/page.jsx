import { getAll } from "@/lib/db";

export default function PastPapersPage() {
  const papers = getAll("pastpapers");
  return (
    <div className="container-px max-w-5xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Past Papers</h1>
        <p className="text-[var(--muted)]">Previous years' test and exam papers.</p>
      </div>
      {papers.length === 0 ? (
        <div className="card p-12 text-center text-[var(--muted)]">No past papers uploaded yet.</div>
      ) : (
        <div className="card divide-y divide-[var(--line)]">
          {papers.map((p) => (
            <div key={p.id} className="p-5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-[var(--muted)]">{p.organization}</p>
              </div>
              <span className="badge">{p.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

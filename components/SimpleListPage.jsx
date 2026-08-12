function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function SimpleListPage({ title, subtitle, items, dateField, dateLabel = "Date", icon }) {
  return (
    <div className="container-px max-w-5xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-[var(--muted)]">{subtitle}</p>
      </div>

      {items.length === 0 ? (
        <div className="card p-12 text-center text-[var(--muted)]">Nothing to show yet.</div>
      ) : (
        <div className="card divide-y divide-[var(--line)]">
          {items.map((item) => (
            <div key={item.id} className="p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--cream)] flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-[var(--muted)]">{item.organization}</p>
                </div>
              </div>
              <span className="text-sm text-[var(--muted)] whitespace-nowrap">
                {dateLabel}: {formatDate(item[dateField])}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { getAll } from "@/lib/db";
import SimpleListPage from "@/components/SimpleListPage";

export default function RollNoSlipsPage() {
  const items = getAll("rollnoslips");
  return (
    <SimpleListPage
      title="Roll No Slips"
      subtitle="Download roll number slips for upcoming and recent tests."
      items={items}
      dateField="date"
      dateLabel="Issued"
      icon={
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      }
    />
  );
}

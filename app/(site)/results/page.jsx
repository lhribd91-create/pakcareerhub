import { getAll } from "@/lib/db";
import SimpleListPage from "@/components/SimpleListPage";

export default function ResultsPage() {
  const results = getAll("results");
  return (
    <SimpleListPage
      title="Latest Results"
      subtitle="Announced results for government exams and tests across Pakistan."
      items={results}
      dateField="date"
      dateLabel="Announced"
      icon={
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      }
    />
  );
}

import { getAll } from "@/lib/db";
import SimpleListPage from "@/components/SimpleListPage";

export default function AdmissionsPage() {
  const items = getAll("admissions");
  return (
    <SimpleListPage
      title="Admissions"
      subtitle="University admissions and scholarship opportunities across Pakistan."
      items={items}
      dateField="dueDate"
      dateLabel="Due"
      icon={
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
          <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      }
    />
  );
}

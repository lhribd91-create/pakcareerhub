import { getAll } from "@/lib/db";
import SimpleListPage from "@/components/SimpleListPage";

export default function ScholarshipsPage() {
  const items = getAll("admissions").filter((a) =>
    a.title.toLowerCase().includes("scholarship")
  );
  return (
    <SimpleListPage
      title="Scholarships"
      subtitle="Scholarship programs currently open for applications."
      items={items}
      dateField="dueDate"
      dateLabel="Due"
      icon={
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--green)]">
          <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      }
    />
  );
}

import JobForm from "@/components/JobForm";

export default function NewJobPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Post New Job</h1>
      <p className="text-[var(--muted)] mb-6">This job will immediately appear on the public site.</p>
      <JobForm />
    </div>
  );
}

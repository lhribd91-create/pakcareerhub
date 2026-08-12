import { getById } from "@/lib/db";
import { notFound } from "next/navigation";
import JobForm from "@/components/JobForm";

export default async function EditJobPage({ params }) {
  const { id } = await params;
  const job = getById("jobs", id);
  if (!job) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-1">Edit Job</h1>
      <p className="text-[var(--muted)] mb-6">Update details for &quot;{job.title}&quot;.</p>
      <JobForm initialJob={job} />
    </div>
  );
}

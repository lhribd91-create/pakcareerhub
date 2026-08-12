"use client";
import ResourceManager from "@/components/ResourceManager";

export default function AdmissionsAdminPage() {
  return (
    <ResourceManager
      collection="admissions"
      title="Admissions"
      description="Manage admissions and scholarship listings."
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "organization", label: "Organization", required: true },
        { name: "dueDate", label: "Due Date", type: "date", required: true },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "organization", label: "Organization" },
        { key: "dueDate", label: "Due Date" },
      ]}
    />
  );
}

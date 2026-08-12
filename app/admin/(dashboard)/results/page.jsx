"use client";
import ResourceManager from "@/components/ResourceManager";

export default function ResultsAdminPage() {
  return (
    <div className="p-8 space-y-10">
      <ResourceManager
        collection="results"
        title="Results"
        description="Manage announced results shown on the Results page."
        fields={[
          { name: "title", label: "Title", required: true },
          { name: "organization", label: "Organization", required: true },
          { name: "date", label: "Date", type: "date", required: true },
        ]}
        columns={[
          { key: "title", label: "Title" },
          { key: "organization", label: "Organization" },
          { key: "date", label: "Date" },
        ]}
        wrapperClassName=""
      />
      <ResourceManager
        collection="rollnoslips"
        title="Roll No Slips"
        description="Manage roll number slips shown on the Roll No Slips page."
        fields={[
          { name: "title", label: "Title", required: true },
          { name: "organization", label: "Organization", required: true },
          { name: "date", label: "Date", type: "date", required: true },
        ]}
        columns={[
          { key: "title", label: "Title" },
          { key: "organization", label: "Organization" },
          { key: "date", label: "Date" },
        ]}
        wrapperClassName=""
      />
    </div>
  );
}

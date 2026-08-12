"use client";
import ResourceManager from "@/components/ResourceManager";

export default function PastPapersAdminPage() {
  return (
    <ResourceManager
      collection="pastpapers"
      title="Past Papers"
      description="Manage past paper listings."
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "organization", label: "Organization", required: true },
        { name: "year", label: "Year", required: true },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "organization", label: "Organization" },
        { key: "year", label: "Year" },
      ]}
    />
  );
}

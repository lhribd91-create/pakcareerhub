"use client";
import ResourceManager from "@/components/ResourceManager";

export default function BlogAdminPage() {
  return (
    <ResourceManager
      collection="blog"
      title="Blog Posts"
      description="Manage blog articles shown on the Blog page."
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "date", label: "Date", type: "date", required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { name: "content", label: "Full Content", type: "textarea" },
      ]}
      columns={[
        { key: "title", label: "Title" },
        { key: "date", label: "Date" },
      ]}
    />
  );
}

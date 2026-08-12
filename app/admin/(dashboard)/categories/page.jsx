"use client";
import ResourceManager from "@/components/ResourceManager";

export default function CategoriesAdminPage() {
  return (
    <ResourceManager
      collection="categories"
      title="Categories"
      description="Manage tag categories used on job cards (e.g. IT Jobs, Bank Jobs)."
      fields={[{ name: "name", label: "Category Name", required: true }]}
      columns={[{ key: "name", label: "Name" }, { key: "id", label: "ID" }]}
    />
  );
}

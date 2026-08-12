"use client";
import ResourceManager from "@/components/ResourceManager";

export default function DepartmentsAdminPage() {
  return (
    <ResourceManager
      collection="departments"
      title="Departments"
      description="Manage departments/agencies used for grouping jobs (e.g. FBR, WAPDA, Police)."
      fields={[{ name: "name", label: "Department Name", required: true }]}
      columns={[{ key: "name", label: "Name" }, { key: "id", label: "ID" }]}
    />
  );
}

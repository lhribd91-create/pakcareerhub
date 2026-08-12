"use client";
import ResourceManager from "@/components/ResourceManager";

export default function CitiesAdminPage() {
  return (
    <ResourceManager
      collection="cities"
      title="Cities"
      description="Manage the list of cities jobs can be filtered by."
      fields={[{ name: "name", label: "City Name", required: true }]}
      columns={[{ key: "name", label: "Name" }, { key: "id", label: "ID" }]}
    />
  );
}

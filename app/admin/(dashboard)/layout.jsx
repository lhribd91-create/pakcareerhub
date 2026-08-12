import AdminSidebar from "@/components/AdminSidebar";
import { ADMIN_EMAIL } from "@/lib/auth";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--cream)]">
      <AdminSidebar email={ADMIN_EMAIL} />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

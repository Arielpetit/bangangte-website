import type { Metadata } from "next";
import { AdminProvider } from "./_components/AdminContext";
import { Shell } from "./_components/Shell";
import "./admin.css";

export const metadata: Metadata = { title: "Espace agents", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <Shell>{children}</Shell>
    </AdminProvider>
  );
}

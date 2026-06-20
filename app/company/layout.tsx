import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
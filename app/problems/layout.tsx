import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function GoalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

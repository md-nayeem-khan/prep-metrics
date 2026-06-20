import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function BehavioralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default async function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

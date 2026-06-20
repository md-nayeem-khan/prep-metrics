import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function RevisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

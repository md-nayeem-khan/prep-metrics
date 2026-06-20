import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function MockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

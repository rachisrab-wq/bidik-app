import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

export function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardOverview />
    </DashboardShell>
  );
}

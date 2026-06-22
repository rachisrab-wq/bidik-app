import { BarChart3, Home, PenLine, Route, Target, UserRound } from "lucide-react";
import type { NavigationItem } from "@/types/navigation";

export const dashboardNavigation: NavigationItem[] = [
  {
    label: "Ringkasan",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Input Data",
    href: "/onboarding",
    icon: PenLine,
  },
  {
    label: "Target SMA",
    icon: Target,
    disabled: true,
    badge: "Dashboard",
  },
  {
    label: "Gap Analysis",
    icon: BarChart3,
    disabled: true,
    badge: "Berikutnya",
  },
  {
    label: "Perjalanan Belajar",
    icon: Route,
    disabled: true,
    badge: "Segera",
  },
  {
    label: "Profil",
    icon: UserRound,
    disabled: true,
    badge: "Phase 2",
  },
];

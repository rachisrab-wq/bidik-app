import type { Metadata } from "next";
import { LandingPage } from "@/features/landing/components/landing-page";

export const metadata: Metadata = {
  title: "Menuju SMA Impianmu",
};

export default function HomePage() {
  return <LandingPage />;
}

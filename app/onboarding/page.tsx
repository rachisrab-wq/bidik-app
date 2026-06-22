import type { Metadata } from "next";
import { OnboardingPage } from "@/features/onboarding/components/onboarding-page";

export const metadata: Metadata = {
  title: "Onboarding Siswa",
};

export default function StudentOnboardingPage() {
  return <OnboardingPage />;
}

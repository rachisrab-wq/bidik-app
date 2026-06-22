import { HeroSection } from "@/features/landing/components/hero-section";
import { HowItWorksSection } from "@/features/landing/components/how-it-works-section";
import { SiteFooter } from "@/features/landing/components/site-footer";
import { SiteHeader } from "@/features/landing/components/site-header";
import { ValueSection } from "@/features/landing/components/value-section";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfe] text-ink">
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <ValueSection />
        <HowItWorksSection />
      </main>
      <SiteFooter />
    </div>
  );
}

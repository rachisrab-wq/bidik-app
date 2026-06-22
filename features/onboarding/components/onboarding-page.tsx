import { Badge } from "@/components/ui/badge";
import { OnboardingForm } from "@/features/onboarding/components/onboarding-form";

export function OnboardingPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f6f7fb] px-4 py-8 sm:px-7">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-7 max-w-3xl">
          <Badge>MVP BIDIK</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-[-.04em] text-ink sm:text-5xl">
            Mulai prediksi peluang SMA impianmu
          </h1>
          <p className="mt-3 text-sm font-medium leading-6 text-muted sm:text-base">
            Isi data akademik inti, pilih target SMA, lalu BIDIK akan
            menghitung rata-rata rapor, nilai TKA, skor akhir, dan ranking SMA
            yang paling sesuai.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import {
  BarChart3,
  Gauge,
  GraduationCap,
  RefreshCcw,
  Target,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalculationBreakdown } from "@/features/dashboard/components/calculation-breakdown";
import { MetricCard } from "@/features/dashboard/components/metric-card";
import { NoProfileState } from "@/features/dashboard/components/no-profile-state";
import { RecommendationTable } from "@/features/dashboard/components/recommendation-table";
import { TargetPredictionsCard } from "@/features/dashboard/components/target-predictions-card";
import { useStudentProfile } from "@/features/onboarding/providers/student-profile-provider";
import { calculateAcademicScores } from "@/features/prediction/lib/calculate-scores";
import {
  createSchoolPrediction,
  findSchoolsByIds,
  rankRecommendedSchools,
} from "@/features/prediction/lib/predict-schools";
import type { PredictionStatus } from "@/types/school";

const formatScore = (value: number) => value.toFixed(2);

const statusTone: Record<
  PredictionStatus,
  "safe" | "warning" | "ambitious"
> = {
  Aman: "safe",
  Kompetitif: "warning",
  Ambisius: "ambitious",
};

const formatSignedScore = (value: number) =>
  value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);

export function DashboardOverview() {
  const { profile, isLoaded, clearProfile } = useStudentProfile();

  if (!isLoaded) {
    return (
      <main
        id="main-content"
        className="mx-auto max-w-[1180px] px-4 py-8 sm:px-7"
      >
        <div className="h-48 animate-pulse rounded-3xl bg-white" />
      </main>
    );
  }

  if (!profile) {
    return (
      <main
        id="main-content"
        className="mx-auto max-w-[1180px] px-4 py-8 sm:px-7"
      >
        <div className="mb-7">
          <Badge>Phase 2 Onboarding</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-[-.04em] text-ink">
            Control center BIDIK
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">
            Isi onboarding terlebih dahulu agar BIDIK bisa menghitung peluang
            masuk SMA dari data akademikmu.
          </p>
        </div>
        <NoProfileState />
      </main>
    );
  }

  const calculation = calculateAcademicScores(profile);
  const targetSchools = findSchoolsByIds(profile.targetSmaIds);
  const targetPredictions = targetSchools.map((school) =>
    createSchoolPrediction(school, calculation.skorAkhir),
  );
  const primaryTargetPrediction = targetPredictions[0] ?? null;
  const primaryTargetSchool = primaryTargetPrediction?.school ?? null;
  const recommendations = rankRecommendedSchools(calculation.skorAkhir);

  return (
    <main id="main-content" className="mx-auto max-w-[1180px] px-4 py-8 sm:px-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Badge>Phase 2 Onboarding Siswa</Badge>
          <h1 className="mt-3 text-3xl font-black tracking-[-.04em] text-ink">
            Halo, {profile.namaSiswa}
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-muted">
            BIDIK membaca data onboarding lokalmu dan membandingkan skor akhir
            dengan target SMA Negeri Surabaya untuk tahun masuk{" "}
            {profile.tahunMasukSma}.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/onboarding">
            <RefreshCcw size={17} aria-hidden="true" />
            Perbarui data
          </Link>
        </Button>
      </div>

      <section
        aria-label="Ringkasan peluang siswa"
        className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-5"
      >
        <MetricCard
          title="Target SMA"
          value={primaryTargetSchool?.nama ?? "Belum valid"}
          description={
            primaryTargetSchool
              ? `${targetSchools.length} target dipilih · utama di ${primaryTargetSchool.kecamatan}`
              : "Pilih ulang SMA tujuan."
          }
          icon={Target}
        />
        <MetricCard
          title="Rata-rata rapor"
          value={formatScore(calculation.rataRataRapor)}
          description="Dari semester 1 sampai 5."
          icon={BarChart3}
        />
        <MetricCard
          title="Nilai TKA"
          value={formatScore(calculation.nilaiTka)}
          description="Rata-rata Matematika dan Bahasa Indonesia."
          icon={GraduationCap}
        />
        <MetricCard
          title="Skor akhir"
          value={formatScore(calculation.skorAkhir)}
          description="Rapor 60% + TKA 40%."
          icon={Gauge}
        />
        <MetricCard
          title="Status utama"
          value={primaryTargetPrediction?.status ?? "Belum valid"}
          description={
            primaryTargetPrediction
              ? `${primaryTargetPrediction.peluangMasuk}% peluang · selisih ${formatSignedScore(
                  primaryTargetPrediction.selisihNilai,
                )}`
              : "Target SMA tidak ditemukan."
          }
          icon={Trophy}
          tone={
            primaryTargetPrediction
              ? statusTone[primaryTargetPrediction.status]
              : "default"
          }
        />
      </section>

      {targetPredictions.length > 0 && (
        <section className="mt-7">
          <TargetPredictionsCard
            predictions={targetPredictions}
            tahunMasukSma={profile.tahunMasukSma}
          />
        </section>
      )}

      <section className="mt-7">
        <CalculationBreakdown profile={profile} calculation={calculation} />
      </section>

      <section className="mt-7">
        <RecommendationTable recommendations={recommendations} />
      </section>

      <section className="mt-7 rounded-2xl border border-[#e9eaf0] bg-white p-5 text-sm font-medium leading-6 text-muted">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Data tersimpan sementara di localStorage browser. Gunakan tombol
            perbarui jika nilai, domisili, tahun masuk, atau target SMA berubah.
          </p>
          <Button type="button" variant="ghost" size="sm" onClick={clearProfile}>
            Reset data lokal
          </Button>
        </div>
      </section>
    </main>
  );
}

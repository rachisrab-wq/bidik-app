"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  semesterFields,
  targetFields,
  tkaFields,
} from "@/features/onboarding/lib/onboarding-fields";
import { surabayaDistricts } from "@/features/onboarding/lib/surabaya-districts";
import { useStudentProfile } from "@/features/onboarding/providers/student-profile-provider";
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/features/onboarding/schemas/onboarding-schema";
import { surabayaHighSchools } from "@/features/schools/data/surabaya-schools";
import { cn } from "@/lib/utils";
import type { StudentProfile } from "@/types/student";

const currentYear = new Date().getFullYear();

const defaultValues: Partial<OnboardingFormValues> = {
  namaSiswa: "",
  asalSmp: "",
  kecamatanDomisili: "",
  tahunMasukSma: currentYear,
  targetSmaUtamaId: "",
  targetSmaKeduaId: "",
  targetSmaKetigaId: "",
};

const selectClassName =
  "flex h-11 w-full rounded-xl border border-[#dfe1e9] bg-white px-3 text-sm font-semibold text-ink shadow-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10";

const formatPreviewScore = (value: number | null) =>
  value === null ? "—" : value.toFixed(2);

const toScore = (value: unknown) => {
  const parsed = typeof value === "number" ? value : Number(value);

  return Number.isFinite(parsed) ? parsed : null;
};

const calculateAveragePreview = (values: unknown[]) => {
  const scores = values.map(toScore);

  if (scores.some((score) => score === null)) {
    return null;
  }

  const totalScore = scores.reduce<number>(
    (total, score) => total + (score ?? 0),
    0,
  );

  return Math.round((totalScore / scores.length) * 100) / 100;
};

const calculateFinalScorePreview = (
  rataRataRapor: number | null,
  rataRataTka: number | null,
) => {
  if (rataRataRapor === null || rataRataTka === null) {
    return null;
  }

  return Math.round((rataRataRapor * 0.6 + rataRataTka * 0.4) * 100) / 100;
};

const collectTargetIds = (values: OnboardingFormValues) =>
  [
    values.targetSmaUtamaId,
    values.targetSmaKeduaId,
    values.targetSmaKetigaId,
  ].filter(Boolean);

const toStudentProfile = (values: OnboardingFormValues): StudentProfile => ({
  namaSiswa: values.namaSiswa,
  asalSmp: values.asalSmp,
  kecamatanDomisili: values.kecamatanDomisili,
  tahunMasukSma: values.tahunMasukSma,
  nilaiSemester: {
    semester1: values.semester1,
    semester2: values.semester2,
    semester3: values.semester3,
    semester4: values.semester4,
    semester5: values.semester5,
  },
  nilaiTka: {
    matematika: values.tkaMatematika,
    bahasaIndonesia: values.tkaBahasaIndonesia,
  },
  targetSmaIds: collectTargetIds(values),
  submittedAt: new Date().toISOString(),
});

type ErrorMessageProps = {
  message?: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) {
    return null;
  }

  return <p className="text-xs font-semibold text-[#b44848]">{message}</p>;
}

export function OnboardingForm() {
  const router = useRouter();
  const { saveProfile } = useStudentProfile();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: "onBlur",
    defaultValues,
  });

  const watchedValues = watch();
  const selectedTargetIds = collectTargetIds(watchedValues);

  const preview = useMemo(() => {
    const rataRataRapor = calculateAveragePreview(
      semesterFields.map((field) => watchedValues[field.name]),
    );
    const rataRataTka = calculateAveragePreview(
      tkaFields.map((field) => watchedValues[field.name]),
    );

    return {
      rataRataRapor,
      rataRataTka,
      skorAkhir: calculateFinalScorePreview(rataRataRapor, rataRataTka),
    };
  }, [watchedValues]);

  const onSubmit = (values: OnboardingFormValues) => {
    saveProfile(toStudentProfile(values));
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#efedff] text-primary">
              <GraduationCap size={20} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-black">Data siswa</h2>
              <p className="text-sm font-medium text-muted">
                BIDIK memakai data dasar siswa untuk konteks prediksi SMA.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="namaSiswa">Nama</Label>
            <Input
              id="namaSiswa"
              autoComplete="name"
              placeholder="Nama siswa"
              aria-invalid={Boolean(errors.namaSiswa)}
              {...register("namaSiswa")}
            />
            <ErrorMessage message={errors.namaSiswa?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="asalSmp">Asal SMP</Label>
            <Input
              id="asalSmp"
              placeholder="Contoh: SMPN 1 Surabaya"
              aria-invalid={Boolean(errors.asalSmp)}
              {...register("asalSmp")}
            />
            <ErrorMessage message={errors.asalSmp?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kecamatanDomisili">Domisili kecamatan</Label>
            <select
              id="kecamatanDomisili"
              className={cn(
                selectClassName,
                errors.kecamatanDomisili &&
                  "border-[#d56b6b] focus:ring-[#d56b6b]/10",
              )}
              aria-invalid={Boolean(errors.kecamatanDomisili)}
              {...register("kecamatanDomisili")}
            >
              <option value="">Pilih kecamatan Surabaya</option>
              {surabayaDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors.kecamatanDomisili?.message} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tahunMasukSma">Tahun masuk SMA</Label>
            <Input
              id="tahunMasukSma"
              type="number"
              min={currentYear}
              max={currentYear + 6}
              inputMode="numeric"
              aria-invalid={Boolean(errors.tahunMasukSma)}
              {...register("tahunMasukSma")}
            />
            <ErrorMessage message={errors.tahunMasukSma?.message} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-black">Nilai rapor</h2>
          <p className="text-sm font-medium text-muted">
            Masukkan nilai semester 1 sampai 5 dalam rentang 0-100. Rata-rata
            dihitung otomatis.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {semesterFields.map((field) => (
            <div className="space-y-2" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step={0.01}
                placeholder="0-100"
                aria-invalid={Boolean(errors[field.name])}
                {...register(field.name)}
              />
              <ErrorMessage message={errors[field.name]?.message} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-black">Nilai TKA</h2>
          <p className="text-sm font-medium text-muted">
            Masukkan nilai Matematika dan Bahasa Indonesia. Rata-rata TKA
            dihitung otomatis.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {tkaFields.map((field) => (
            <div className="space-y-2" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step={0.01}
                placeholder="0-100"
                aria-invalid={Boolean(errors[field.name])}
                {...register(field.name)}
              />
              <ErrorMessage message={errors[field.name]?.message} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-black">Target SMA</h2>
          <p className="text-sm font-medium text-muted">
            Pilih maksimal 3 SMA Negeri Surabaya. Target pertama menjadi target
            utama di dashboard.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {targetFields.map((field) => {
            const currentValue = watchedValues[field.name];
            const disabledTargetIds = selectedTargetIds.filter(
              (targetId) => targetId !== currentValue,
            );

            return (
              <div className="space-y-2" key={field.name}>
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <span className="text-[11px] font-bold text-muted">
                    {field.helper}
                  </span>
                </div>
                <select
                  id={field.name}
                  className={cn(
                    selectClassName,
                    errors[field.name] &&
                      "border-[#d56b6b] focus:ring-[#d56b6b]/10",
                  )}
                  aria-invalid={Boolean(errors[field.name])}
                  {...register(field.name)}
                >
                  <option value="">
                    {field.name === "targetSmaUtamaId"
                      ? "Pilih target utama"
                      : "Tidak memilih"}
                  </option>
                  {surabayaHighSchools.map((school) => (
                    <option
                      key={school.id}
                      value={school.id}
                      disabled={disabledTargetIds.includes(school.id)}
                    >
                      {school.nama} — {school.kecamatan}
                    </option>
                  ))}
                </select>
                <ErrorMessage message={errors[field.name]?.message} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-[#dcd7ff] bg-gradient-to-r from-[#f7f6ff] to-white">
        <CardHeader>
          <h2 className="text-lg font-black">Ringkasan hasil</h2>
          <p className="text-sm font-medium text-muted">
            Formula skor akhir: 60% rapor + 40% TKA.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
              Rata-rata rapor
            </p>
            <p className="mt-2 text-2xl font-black text-ink">
              {formatPreviewScore(preview.rataRataRapor)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
              Rata-rata TKA
            </p>
            <p className="mt-2 text-2xl font-black text-ink">
              {formatPreviewScore(preview.rataRataTka)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 p-4">
            <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
              Skor akhir
            </p>
            <p className="mt-2 text-2xl font-black text-primary">
              {formatPreviewScore(preview.skorAkhir)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold leading-5 text-muted">
          Data disimpan sementara di localStorage browser. Belum tersambung ke
          Supabase.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          Simpan dan lihat dashboard
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}

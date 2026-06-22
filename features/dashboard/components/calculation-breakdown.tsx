import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { AcademicCalculation, StudentProfile } from "@/types/student";

type CalculationBreakdownProps = {
  profile: StudentProfile;
  calculation: AcademicCalculation;
};

const formatScore = (value: number) => value.toFixed(2);

export function CalculationBreakdown({
  profile,
  calculation,
}: CalculationBreakdownProps) {
  const semesterScores = Object.values(profile.nilaiSemester);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#efedff] text-primary">
            <Calculator size={19} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-black">Proses perhitungan</h2>
            <p className="text-sm font-medium text-muted">
              Transparan, supaya siswa tahu angka BIDIK berasal dari mana.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-[#f7f8fb] p-4">
          <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
            Rata-rata rapor
          </p>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">
            ({semesterScores.map(formatScore).join(" + ")}) / 5 ={" "}
            {formatScore(calculation.rataRataRapor)}
          </p>
        </div>
        <div className="rounded-2xl bg-[#f7f8fb] p-4">
          <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
            Nilai TKA
          </p>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">
            ({formatScore(profile.nilaiTka.matematika)} +{" "}
            {formatScore(profile.nilaiTka.bahasaIndonesia)}) / 2 ={" "}
            {formatScore(calculation.nilaiTka)}
          </p>
        </div>
        <div className="rounded-2xl bg-[#f7f8fb] p-4">
          <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
            Skor akhir
          </p>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">
            ({formatScore(calculation.rataRataRapor)} × 0.6) + (
            {formatScore(calculation.nilaiTka)} × 0.4) ={" "}
            {formatScore(calculation.skorAkhir)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

import type { AcademicCalculation, StudentProfile } from "@/types/student";

const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100;

export function calculateAcademicScores(
  profile: StudentProfile,
): AcademicCalculation {
  const semesterValues = Object.values(profile.nilaiSemester);
  const rataRataRapor = roundToTwoDecimals(
    semesterValues.reduce((total, score) => total + score, 0) /
      semesterValues.length,
  );
  const nilaiTka = roundToTwoDecimals(
    (profile.nilaiTka.matematika + profile.nilaiTka.bahasaIndonesia) / 2,
  );
  const weightedRapor = roundToTwoDecimals(rataRataRapor * 0.6);
  const weightedTka = roundToTwoDecimals(nilaiTka * 0.4);
  const skorAkhir = roundToTwoDecimals(weightedRapor + weightedTka);

  return {
    rataRataRapor,
    nilaiTka,
    skorAkhir,
    weightedRapor,
    weightedTka,
  };
}

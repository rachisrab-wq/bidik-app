import { surabayaHighSchools } from "@/features/schools/data/surabaya-schools";
import type {
  PredictionStatus,
  SchoolPrediction,
  SurabayaHighSchool,
} from "@/types/school";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundToTwoDecimals = (value: number) => Math.round(value * 100) / 100;

export function getPredictionStatus(
  skorAkhir: number,
  nilaiAcuan: number,
): PredictionStatus {
  const selisihNilai = skorAkhir - nilaiAcuan;

  if (selisihNilai > 1) {
    return "Aman";
  }

  if (Math.abs(selisihNilai) <= 1) {
    return "Kompetitif";
  }

  return "Ambisius";
}

export function calculateOpportunityPercentage(selisihNilai: number) {
  return Math.round(clamp(50 + selisihNilai * 12, 5, 96));
}

export function createSchoolPrediction(
  school: SurabayaHighSchool,
  skorAkhir: number,
): SchoolPrediction {
  const selisihNilai = roundToTwoDecimals(skorAkhir - school.nilai_acuan);
  const peluangMasuk = calculateOpportunityPercentage(selisihNilai);

  return {
    school,
    status: getPredictionStatus(skorAkhir, school.nilai_acuan),
    selisihNilai,
    peluangMasuk,
    rankingScore: peluangMasuk + school.daya_tampung / 1000,
  };
}

export function rankRecommendedSchools(
  skorAkhir: number,
  schools = surabayaHighSchools,
) {
  return schools
    .map((school) => createSchoolPrediction(school, skorAkhir))
    .sort((first, second) => {
      if (second.peluangMasuk !== first.peluangMasuk) {
        return second.peluangMasuk - first.peluangMasuk;
      }

      return second.rankingScore - first.rankingScore;
    });
}

export function findSchoolById(schoolId: string) {
  return surabayaHighSchools.find((school) => school.id === schoolId) ?? null;
}

export function findSchoolsByIds(schoolIds: string[]) {
  return schoolIds
    .map((schoolId) => findSchoolById(schoolId))
    .filter((school): school is SurabayaHighSchool => Boolean(school));
}

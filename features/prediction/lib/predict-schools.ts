import { surabayaHighSchools } from "@/features/schools/data/surabaya-schools";
import type {
  PredictionStatus,
  SchoolPrediction,
  SurabayaHighSchool,
} from "@/types/school";

const roundToTwoDecimals = (value: number) =>
  Math.round(value * 100) / 100;

export function getPredictionStatus(
  skorAkhir: number,
  nilaiAcuan: number,
): PredictionStatus {
  const gap = skorAkhir - nilaiAcuan;

  if (gap >= 2) {
    return "Aman";
  }

  if (gap >= -1) {
    return "Kompetitif";
  }

  return "Ambisius";
}

export function calculateOpportunityPercentage(
  skorAkhir: number,
  nilaiAcuan: number,
) {
  const gap = skorAkhir - nilaiAcuan;

  if (gap >= 6) return 95;
  if (gap >= 4) return 88;
  if (gap >= 2) return 78;
  if (gap >= 1) return 68;
  if (gap >= 0) return 58;

  if (gap >= -1) return 45;
  if (gap >= -2) return 35;
  if (gap >= -3) return 25;

  return 15;
}

export function createSchoolPrediction(
  school: SurabayaHighSchool,
  skorAkhir: number,
): SchoolPrediction {
  const selisihNilai = roundToTwoDecimals(
    skorAkhir - school.nilai_acuan,
  );

  const peluangMasuk = calculateOpportunityPercentage(
    skorAkhir,
    school.nilai_acuan,
  );

  return {
    school,
    status: getPredictionStatus(
      skorAkhir,
      school.nilai_acuan,
    ),
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
    .map((school) =>
      createSchoolPrediction(school, skorAkhir),
    )
    .sort((first, second) => {
      if (second.peluangMasuk !== first.peluangMasuk) {
        return second.peluangMasuk - first.peluangMasuk;
      }

      return second.rankingScore - first.rankingScore;
    });
}

export function findSchoolById(schoolId: string) {
  return (
    surabayaHighSchools.find(
      (school) => school.id === schoolId,
    ) ?? null
  );
}

export function findSchoolsByIds(
  schoolIds: string[],
) {
  return schoolIds
    .map((schoolId) => findSchoolById(schoolId))
    .filter(
      (school): school is SurabayaHighSchool =>
        Boolean(school),
    );
}

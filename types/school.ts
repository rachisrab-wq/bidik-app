export type SurabayaHighSchool = {
  id: string;
  nama: string;
  kecamatan: string;
  nilai_acuan: number;
  daya_tampung: number;
};

export type PredictionStatus = "Aman" | "Kompetitif" | "Ambisius";

export type SchoolPrediction = {
  school: SurabayaHighSchool;
  status: PredictionStatus;
  selisihNilai: number;
  peluangMasuk: number;
  rankingScore: number;
};

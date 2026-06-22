export type SemesterScores = {
  semester1: number;
  semester2: number;
  semester3: number;
  semester4: number;
  semester5: number;
};

export type TkaScores = {
  matematika: number;
  bahasaIndonesia: number;
};

export type StudentProfile = {
  namaSiswa: string;
  asalSmp: string;
  kecamatanDomisili: string;
  tahunMasukSma: number;
  nilaiSemester: SemesterScores;
  nilaiTka: TkaScores;
  targetSmaIds: string[];
  submittedAt: string;
};

export type AcademicCalculation = {
  rataRataRapor: number;
  nilaiTka: number;
  skorAkhir: number;
  weightedRapor: number;
  weightedTka: number;
};

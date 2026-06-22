import type { StudentProfile } from "@/types/student";

const STUDENT_PROFILE_STORAGE_KEY = "bidik.student-profile.v2";

type LegacyStudentProfile = Omit<
  StudentProfile,
  "tahunMasukSma" | "targetSmaIds"
> & {
  tahunMasukSma?: number;
  targetSmaId?: string;
  targetSmaIds?: string[];
};

const currentYear = new Date().getFullYear();

function normalizeStoredProfile(
  profile: LegacyStudentProfile,
): StudentProfile | null {
  const targetSmaIds =
    profile.targetSmaIds ??
    (profile.targetSmaId ? [profile.targetSmaId] : []);

  if (
    !profile.namaSiswa ||
    !profile.asalSmp ||
    !profile.kecamatanDomisili ||
    targetSmaIds.length === 0
  ) {
    return null;
  }

  return {
    namaSiswa: profile.namaSiswa,
    asalSmp: profile.asalSmp,
    kecamatanDomisili: profile.kecamatanDomisili,
    tahunMasukSma: profile.tahunMasukSma ?? currentYear,
    nilaiSemester: profile.nilaiSemester,
    nilaiTka: profile.nilaiTka,
    targetSmaIds,
    submittedAt: profile.submittedAt,
  };
}

export function readStoredStudentProfile(): StudentProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawProfile = window.localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return null;
  }

  try {
    return normalizeStoredProfile(JSON.parse(rawProfile) as LegacyStudentProfile);
  } catch {
    window.localStorage.removeItem(STUDENT_PROFILE_STORAGE_KEY);
    return null;
  }
}

export function writeStoredStudentProfile(profile: StudentProfile) {
  window.localStorage.setItem(
    STUDENT_PROFILE_STORAGE_KEY,
    JSON.stringify(profile),
  );
}

export function clearStoredStudentProfile() {
  window.localStorage.removeItem(STUDENT_PROFILE_STORAGE_KEY);
}

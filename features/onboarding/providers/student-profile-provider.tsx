"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import {
  clearStoredStudentProfile,
  readStoredStudentProfile,
  writeStoredStudentProfile,
} from "@/features/onboarding/lib/student-profile-storage";
import type { StudentProfile } from "@/types/student";

type StudentProfileContextValue = {
  profile: StudentProfile | null;
  isLoaded: boolean;
  saveProfile: (profile: StudentProfile) => void;
  clearProfile: () => void;
};

const StudentProfileContext =
  createContext<StudentProfileContextValue | null>(null);

export function StudentProfileProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProfile(readStoredStudentProfile());
    setIsLoaded(true);
  }, []);

  const saveProfile = useCallback((nextProfile: StudentProfile) => {
    setProfile(nextProfile);
    writeStoredStudentProfile(nextProfile);
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    clearStoredStudentProfile();
  }, []);

  const value = useMemo(
    () => ({
      profile,
      isLoaded,
      saveProfile,
      clearProfile,
    }),
    [clearProfile, isLoaded, profile, saveProfile],
  );

  return (
    <StudentProfileContext.Provider value={value}>
      {children}
    </StudentProfileContext.Provider>
  );
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext);

  if (!context) {
    throw new Error(
      "useStudentProfile must be used within StudentProfileProvider",
    );
  }

  return context;
}

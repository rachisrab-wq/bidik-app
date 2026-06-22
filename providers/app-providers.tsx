"use client";

import type { PropsWithChildren } from "react";
import { StudentProfileProvider } from "@/features/onboarding/providers/student-profile-provider";
import { QueryProvider } from "@/providers/query-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <StudentProfileProvider>{children}</StudentProfileProvider>
    </QueryProvider>
  );
}

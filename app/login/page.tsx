import type { Metadata } from "next";
import { AuthPage } from "@/features/auth/components/auth-page";

export const metadata: Metadata = {
  title: "Masuk",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Card, CardContent } from "@/components/ui/card";
import { AuthForm } from "@/features/auth/components/auth-form";

type AuthPageProps = {
  mode: "login" | "register";
};

export function AuthPage({ mode }: AuthPageProps) {
  const isRegister = mode === "register";

  return (
    <main
      id="main-content"
      className="grid min-h-screen place-items-center bg-[#f6f7fb] px-4 py-10"
    >
      <div className="w-full max-w-md">
        <div className="mb-7 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md text-xs font-bold text-[#747c91] hover:text-primary"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Beranda
          </Link>
        </div>
        <Card className="shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eeebff] text-primary">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <h1 className="mt-5 text-2xl font-black tracking-[-.035em]">
              {isRegister ? "Buat akun siswa" : "Masuk ke BIDIK"}
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-muted">
              {isRegister
                ? "Persiapkan akun untuk memulai perjalanan menuju SMA impian."
                : "Akses control center perjalanan akademikmu."}
            </p>
            <AuthForm mode={mode} />
          </CardContent>
        </Card>
        <p className="mt-5 text-center text-sm font-medium text-[#747c91]">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <Link
            href={isRegister ? "/login" : "/register"}
            className="rounded-md font-black text-primary hover:underline"
          >
            {isRegister ? "Masuk" : "Daftar"}
          </Link>
        </p>
      </div>
    </main>
  );
}

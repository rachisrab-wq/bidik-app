"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginSchema,
  registerSchema,
  type LoginValues,
  type RegisterValues,
} from "@/features/auth/schemas/auth-schema";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === "register";
  const schema = isRegister ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      ...(isRegister ? { fullName: "" } : {}),
    },
  });

  return (
    <form
      className="mt-7 space-y-5"
      onSubmit={handleSubmit(() => undefined)}
      noValidate
    >
      {isRegister && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama lengkap</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Nama siswa"
            aria-invalid={Boolean(
              "fullName" in errors && errors.fullName,
            )}
            {...register("fullName")}
          />
          {"fullName" in errors && errors.fullName && (
            <p className="text-xs font-semibold text-[#b44848]">
              {errors.fullName.message}
            </p>
          )}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs font-semibold text-[#b44848]">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Kata sandi</Label>
        <Input
          id="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          placeholder="Minimal 8 karakter"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs font-semibold text-[#b44848]">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled
        aria-describedby="auth-status"
      >
        <LockKeyhole size={17} aria-hidden="true" />
        {isRegister ? "Daftar dengan Supabase" : "Masuk dengan Supabase"}
      </Button>
      <p
        id="auth-status"
        className="rounded-xl bg-[#f5f3ff] px-4 py-3 text-center text-xs font-semibold leading-5 text-[#69618e]"
      >
        Belum aktif. Formulir dan validasi sudah siap, tetapi autentikasi
        menunggu konfigurasi Supabase resmi.
      </p>
    </form>
  );
}

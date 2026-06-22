import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Masukkan alamat email yang valid."),
  password: z.string().min(8, "Kata sandi minimal 8 karakter."),
});

export const registerSchema = loginSchema.extend({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter."),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

import { z } from "zod";

const currentYear = new Date().getFullYear();

const scoreSchema = z.preprocess(
  (value) => (value === "" ? undefined : Number(value)),
  z
    .number({
      required_error: "Nilai wajib diisi.",
      invalid_type_error: "Nilai harus berupa angka.",
    })
    .min(0, "Nilai minimal 0.")
    .max(100, "Nilai maksimal 100."),
);

const optionalTargetSchema = z.string().optional().default("");

export const onboardingSchema = z
  .object({
    namaSiswa: z.string().min(2, "Nama siswa minimal 2 karakter."),
    asalSmp: z.string().min(2, "Asal SMP wajib diisi."),
    kecamatanDomisili: z
      .string()
      .min(2, "Pilih kecamatan domisili."),
    tahunMasukSma: z.coerce
      .number({
        invalid_type_error: "Tahun masuk harus berupa angka.",
      })
      .int("Tahun masuk harus berupa tahun valid.")
      .min(currentYear, `Tahun masuk minimal ${currentYear}.`)
      .max(currentYear + 6, `Tahun masuk maksimal ${currentYear + 6}.`),
    semester1: scoreSchema,
    semester2: scoreSchema,
    semester3: scoreSchema,
    semester4: scoreSchema,
    semester5: scoreSchema,
    tkaMatematika: scoreSchema,
    tkaBahasaIndonesia: scoreSchema,
    targetSmaUtamaId: z.string().min(1, "Pilih target SMA utama."),
    targetSmaKeduaId: optionalTargetSchema,
    targetSmaKetigaId: optionalTargetSchema,
  })
  .superRefine((values, context) => {
    const selectedTargets = [
      values.targetSmaUtamaId,
      values.targetSmaKeduaId,
      values.targetSmaKetigaId,
    ].filter(Boolean);
    const uniqueTargets = new Set(selectedTargets);

    if (uniqueTargets.size !== selectedTargets.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Target SMA tidak boleh sama.",
        path: ["targetSmaKeduaId"],
      });
    }
  });

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;

import type { Metadata } from "next";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BIDIK — Menuju SMA Impianmu",
    template: "%s | BIDIK",
  },
  description:
    "Platform pendamping siswa SMP untuk mengukur dan meningkatkan peluang masuk SMA impian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Lewati ke konten utama
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

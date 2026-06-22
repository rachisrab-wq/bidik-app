import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Route,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-[#ece9ff] blur-3xl" />
      <div className="mx-auto grid max-w-[1180px] items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.03fr_.97fr] lg:px-4 lg:py-24">
        <div className="relative z-10">
          <Badge className="gap-2 px-3.5 py-2">
            <Route size={15} aria-hidden="true" />
            Google Maps menuju SMA impianmu
          </Badge>
          <h1 className="mt-7 max-w-[690px] text-[44px] font-black leading-[1.08] tracking-[-0.052em] text-[#18213c] sm:text-[58px] lg:text-[64px]">
            Lihat peluang masuk SMA impianmu.
            <span className="mt-2 block bg-gradient-to-r from-[#594be0] to-[#8777ef] bg-clip-text text-transparent">
              Tingkatkan secara terarah.
            </span>
          </h1>
          <p className="mt-7 max-w-[600px] text-base font-medium leading-8 text-[#68718b] sm:text-lg">
            BIDIK membantu siswa SMP memahami posisi akademik, target sekolah,
            dan langkah belajar berikutnya dalam satu perjalanan yang terukur.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/onboarding">
                Cek Peluang SMA Impianmu
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">Lihat Dashboard</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#707991]">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#26ad88]" aria-hidden="true" />
              Fokus pada target sekolah
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#26ad88]" aria-hidden="true" />
              Berbasis data akademik
            </span>
          </div>
        </div>

        <Card className="relative z-10 overflow-hidden rounded-[28px] border-white p-5 shadow-[0_35px_80px_rgba(49,42,114,.15)] sm:p-7">
          <div className="flex items-center justify-between border-b border-[#ececf3] pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#9299ad]">
                Control center siswa
              </p>
              <h2 className="mt-1.5 text-xl font-black tracking-tight">
                Perjalanan menuju SMA
              </h2>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eeeaff] text-primary">
              <GraduationCap size={22} aria-hidden="true" />
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              {
                icon: Target,
                title: "Target SMA",
                copy: "Tentukan sekolah tujuanmu.",
              },
              {
                icon: BarChart3,
                title: "Peluang & gap",
                copy: "Akan dihitung dari data akademikmu.",
              },
              {
                icon: Route,
                title: "Langkah berikutnya",
                copy: "Diarahkan berdasarkan kebutuhan terbesar.",
              },
            ].map(({ icon: Icon, title, copy }, index) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-[#ececf3] p-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1efff] text-primary">
                  <Icon size={19} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black">{title}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted">{copy}</p>
                </div>
                <span className="ml-auto text-xs font-black text-[#b0b4c0]">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-[#f7f6ff] p-4 text-xs font-semibold leading-5 text-[#656d84]">
            Mulai dari onboarding, lalu dashboard menghitung skor akhir dan
            rekomendasi SMA secara langsung.
          </div>
        </Card>
      </div>
    </section>
  );
}

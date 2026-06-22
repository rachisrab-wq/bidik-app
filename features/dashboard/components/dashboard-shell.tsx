"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";

export function DashboardShell({ children }: PropsWithChildren) {
  const { isOpen, open, close } = useMobileNavigation();

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <DashboardSidebar />
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu dashboard"
        >
          <button
            type="button"
            aria-label="Tutup menu dashboard"
            className="absolute inset-0 cursor-default bg-[#12172c]/45 backdrop-blur-sm"
            onClick={close}
          />
          <div className="relative">
            <DashboardSidebar />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute right-3 top-3"
              aria-label="Tutup menu"
              onClick={close}
            >
              <X size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#e9eaf0] bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden"
              aria-label="Buka menu dashboard"
              onClick={open}
            >
              <Menu size={18} aria-hidden="true" />
            </Button>
            <div className="lg:hidden">
              <Logo compact />
            </div>
            <div>
              <p className="text-xs font-black text-ink sm:text-sm">
                Dashboard siswa
              </p>
              <p className="hidden text-[11px] font-semibold text-muted sm:block">
                Prediksi peluang berdasarkan data onboarding
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">Kembali ke beranda</Link>
          </Button>
        </header>
        {children}
      </div>
    </div>
  );
}

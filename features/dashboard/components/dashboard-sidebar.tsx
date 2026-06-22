"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { dashboardNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-[#e9eaf0] bg-white px-4 py-6">
      <div className="px-2">
        <Logo />
      </div>
      <p className="mt-9 px-3 text-[11px] font-black uppercase tracking-[.16em] text-[#9ca2b2]">
        Control Center
      </p>
      <nav aria-label="Navigasi dashboard" className="mt-3 space-y-1">
        {dashboardNavigation.map(({ label, href, icon: Icon, disabled, badge }) => {
          const content = (
            <>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
              {badge && (
                <Badge className="ml-auto bg-[#f0f1f4] px-2 py-0.5 text-[9px] text-[#818899]">
                  {badge}
                </Badge>
              )}
            </>
          );

          if (disabled || !href) {
            return (
              <button
                key={label}
                type="button"
                disabled
                aria-label={`${label}, belum tersedia`}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold text-[#a1a6b3]"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-extrabold transition-colors",
                pathname === href
                  ? "bg-[#efedff] text-primary"
                  : "text-[#5f687f] hover:bg-[#f3f3f8] hover:text-primary",
              )}
            >
              {content}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-[#e8e5ff] bg-[#f7f6ff] p-4">
        <p className="text-xs font-black text-primary">MVP Prediksi Lokal</p>
        <p className="mt-1.5 text-[11px] font-semibold leading-5 text-[#747b92]">
          Data siswa disimpan lokal di browser dan belum tersambung ke
          Supabase.
        </p>
      </div>
    </aside>
  );
}

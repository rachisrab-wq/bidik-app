import Link from "next/link";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  light?: boolean;
  compact?: boolean;
};

export function Logo({ light = false, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="BIDIK, kembali ke beranda"
      className="inline-flex items-center gap-2.5 rounded-lg"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#6559ec] to-[#4c3ed4] shadow-[0_8px_22px_rgba(91,80,230,.28)]">
        <Target size={21} strokeWidth={2.6} className="text-white" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ffbc48]" />
      </span>
      {!compact && (
        <span
          className={cn(
            "text-[21px] font-black tracking-[-0.045em]",
            light ? "text-white" : "text-ink",
          )}
        >
          BIDIK
        </span>
      )}
    </Link>
  );
}

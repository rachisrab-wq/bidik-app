import Link from "next/link";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer id="faq" className="bg-[#171b31] px-5 py-12 text-white">
      <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <Logo light />
          <p className="mt-3 text-sm text-white/60">
            Lihat peluang. Tutup gap. Menuju SMA impianmu.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm font-semibold text-white/70">
          <Link href="/login" className="rounded-md hover:text-white">
            Masuk
          </Link>
          <Link href="/register" className="rounded-md hover:text-white">
            Daftar
          </Link>
          <span>© 2026 BIDIK</span>
        </div>
      </div>
    </footer>
  );
}

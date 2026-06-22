import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Manfaat", href: "#manfaat" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  return (
    <header className="relative z-30 border-b border-[#eeeff4] bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 lg:px-4"
      >
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md text-sm font-semibold text-[#59617a] transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Masuk</Link>
          </Button>
          <Button asChild size="sm" className="sm:h-11 sm:px-5 sm:text-sm">
            <Link href="/register">Cek Peluang SMA</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

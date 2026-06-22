import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function NoProfileState() {
  return (
    <Card className="border-[#dcd7ff] bg-gradient-to-br from-[#f7f6ff] to-white">
      <CardContent className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-3xl bg-primary text-white">
          <Target size={24} aria-hidden="true" />
        </div>
        <div className="max-w-2xl">
          <h2 className="text-xl font-black tracking-[-.03em] text-ink">
            Mulai dari data siswa dulu
          </h2>
          <p className="mt-2 text-sm font-medium leading-6 text-muted">
            Dashboard BIDIK membutuhkan nilai rapor, nilai TKA, dan target SMA
            agar bisa menghitung peluang masuk secara nyata.
          </p>
        </div>
        <Button asChild className="md:ml-auto">
          <Link href="/onboarding">
            Isi onboarding
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

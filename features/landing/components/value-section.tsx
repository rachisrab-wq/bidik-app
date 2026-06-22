import { BarChart3, Compass, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Mulai dari tujuan",
    copy: "Perjalanan belajar disusun dari SMA yang ingin dituju, bukan dari daftar soal acak.",
  },
  {
    icon: BarChart3,
    title: "Kenali posisi",
    copy: "Data akademik membantu siswa memahami jarak antara kemampuan saat ini dan target.",
  },
  {
    icon: Compass,
    title: "Ambil langkah tepat",
    copy: "Rekomendasi berikutnya diprioritaskan berdasarkan dampaknya pada peluang masuk.",
  },
];

export function ValueSection() {
  return (
    <section id="manfaat" className="border-y border-[#eeeff5] bg-white py-20">
      <div className="mx-auto max-w-[1180px] px-5 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[.2em] text-primary">
            Bukan bank soal
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">
            Strategi yang berpusat pada SMA tujuan
          </h2>
          <p className="mt-4 leading-7 text-muted">
            Setiap bagian BIDIK dirancang untuk menjawab: seberapa dekat siswa
            dengan SMA impiannya?
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, copy }) => (
            <Card key={title} className="transition hover:-translate-y-1 hover:shadow-soft">
              <CardContent>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#efedff] text-primary">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-muted">
                  {copy}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

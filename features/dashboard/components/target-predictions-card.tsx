import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PredictionStatus, SchoolPrediction } from "@/types/school";

type TargetPredictionsCardProps = {
  predictions: SchoolPrediction[];
  tahunMasukSma: number;
};

const statusClassName: Record<PredictionStatus, string> = {
  Aman: "bg-[#eaf8f4] text-[#238f70]",
  Kompetitif: "bg-[#fff6dc] text-[#a36b00]",
  Ambisius: "bg-[#fff0f0] text-[#b44848]",
};

const formatSignedScore = (value: number) =>
  value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);

export function TargetPredictionsCard({
  predictions,
  tahunMasukSma,
}: TargetPredictionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-black">Target SMA pilihanmu</h2>
        <p className="text-sm font-medium text-muted">
          Target masuk tahun {tahunMasukSma}. Target pertama dipakai sebagai
          fokus utama dashboard.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        {predictions.map((prediction, index) => (
          <div
            key={prediction.school.id}
            className="rounded-2xl border border-[#e9eaf0] bg-[#fbfbfd] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[.13em] text-[#9097aa]">
                  Target {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-black text-ink">
                  {prediction.school.nama}
                </h3>
                <p className="mt-1 text-xs font-semibold text-muted">
                  {prediction.school.kecamatan} · acuan{" "}
                  {prediction.school.nilai_acuan.toFixed(2)}
                </p>
              </div>
              <Badge
                className={cn(
                  "px-3 py-1",
                  statusClassName[prediction.status],
                )}
              >
                {prediction.status}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-[11px] font-bold text-muted">Peluang</p>
                <p className="mt-1 font-black text-ink">
                  {prediction.peluangMasuk}%
                </p>
              </div>
              <div className="rounded-xl bg-white p-3">
                <p className="text-[11px] font-bold text-muted">Selisih</p>
                <p className="mt-1 font-black text-ink">
                  {formatSignedScore(prediction.selisihNilai)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

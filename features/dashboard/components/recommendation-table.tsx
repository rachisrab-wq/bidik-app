import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PredictionStatus, SchoolPrediction } from "@/types/school";

type RecommendationTableProps = {
  recommendations: SchoolPrediction[];
};

const statusClassName: Record<PredictionStatus, string> = {
  Aman: "bg-[#eaf8f4] text-[#238f70]",
  Kompetitif: "bg-[#fff6dc] text-[#a36b00]",
  Ambisius: "bg-[#fff0f0] text-[#b44848]",
};

const formatSignedScore = (value: number) =>
  value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);

export function RecommendationTable({
  recommendations,
}: RecommendationTableProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-black">5 SMA paling cocok</h2>
        <p className="text-sm font-medium text-muted">
          Diurutkan dari peluang tertinggi berdasarkan skor akhir siswa
          dibanding nilai acuan sekolah.
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-[#e9eaf0]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#f7f8fb] text-xs uppercase tracking-[.12em] text-[#7e879e]">
                <tr>
                  <th className="px-4 py-3 font-black">Rank</th>
                  <th className="px-4 py-3 font-black">SMA</th>
                  <th className="px-4 py-3 font-black">Kecamatan</th>
                  <th className="px-4 py-3 font-black">Acuan</th>
                  <th className="px-4 py-3 font-black">Selisih</th>
                  <th className="px-4 py-3 font-black">Peluang</th>
                  <th className="px-4 py-3 font-black">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf0f5] bg-white">
                {recommendations.slice(0, 5).map((recommendation, index) => (
                  <tr key={recommendation.school.id}>
                    <td className="px-4 py-4 font-black text-primary">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-4 font-black text-ink">
                      {recommendation.school.nama}
                    </td>
                    <td className="px-4 py-4 font-semibold text-muted">
                      {recommendation.school.kecamatan}
                    </td>
                    <td className="px-4 py-4 font-semibold text-muted">
                      {recommendation.school.nilai_acuan.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 font-black text-ink">
                      {formatSignedScore(recommendation.selisihNilai)}
                    </td>
                    <td className="px-4 py-4 font-black text-ink">
                      {recommendation.peluangMasuk}%
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        className={cn(
                          "px-3 py-1",
                          statusClassName[recommendation.status],
                        )}
                      >
                        {recommendation.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

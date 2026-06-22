import { LockKeyhole, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type DataStatusCardProps = {
  title: string;
  description: string;
  phase: string;
  icon: LucideIcon;
};

export function DataStatusCard({
  title,
  description,
  phase,
  icon: Icon,
}: DataStatusCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f0eeff] text-primary">
            <Icon size={20} aria-hidden="true" />
          </div>
          <Badge className="bg-[#f1f2f5] text-[#7d8496]">{phase}</Badge>
        </div>
        <h2 className="mt-5 text-base font-black">{title}</h2>
        <p className="mt-2 min-h-12 text-sm font-medium leading-6 text-muted">
          {description}
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#f7f7fa] px-3 py-2.5 text-xs font-bold text-[#858b9c]">
          <LockKeyhole size={15} aria-hidden="true" />
          Belum tersedia
        </div>
      </CardContent>
    </Card>
  );
}

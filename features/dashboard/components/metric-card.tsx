import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone?: "default" | "safe" | "warning" | "ambitious";
};

const toneClassName = {
  default: "bg-[#efedff] text-primary",
  safe: "bg-[#eaf8f4] text-[#238f70]",
  warning: "bg-[#fff6dc] text-[#a36b00]",
  ambitious: "bg-[#fff0f0] text-[#b44848]",
};

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "default",
}: MetricCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.13em] text-[#9097aa]">
              {title}
            </p>
            <p className="mt-3 text-2xl font-black tracking-[-.03em] text-ink">
              {value}
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-muted">
              {description}
            </p>
          </div>
          <div
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
              toneClassName[tone],
            )}
          >
            <Icon size={20} aria-hidden="true" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

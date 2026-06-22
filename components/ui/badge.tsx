import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[#efedff] px-2.5 py-1 text-[11px] font-extrabold text-primary",
        className,
      )}
      {...props}
    />
  );
}

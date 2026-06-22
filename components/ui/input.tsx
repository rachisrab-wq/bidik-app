import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#dfe1e9] bg-white px-3 text-sm text-ink shadow-sm outline-none placeholder:text-[#9ba1b1] focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:bg-[#f5f6f8] disabled:text-[#969cac]",
        className,
      )}
      {...props}
    />
  );
}

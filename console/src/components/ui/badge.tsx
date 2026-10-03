import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  children,
}: {
  className?: string;
  tone?: "neutral" | "success" | "danger" | "warning" | "web3";
  children: ReactNode;
}) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    danger: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    warning: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    web3: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  };
  return (
    <span className={cn("inline-flex rounded-lg px-2 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

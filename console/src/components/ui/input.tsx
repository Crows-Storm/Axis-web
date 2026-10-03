import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-200 bg-transparent px-3 text-sm outline-none ring-indigo-500 placeholder:text-slate-400 focus-visible:ring-2 dark:border-slate-800",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

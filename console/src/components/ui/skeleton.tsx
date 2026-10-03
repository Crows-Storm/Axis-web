import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-800", className)} />;
}

/** 报表页骨架：模拟 KPI + 图表 + 列表，而不是整块灰底 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="报表加载中">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="mt-3 h-8 w-32" />
            <Skeleton className="mt-2 h-3 w-16" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200/80 p-5 lg:col-span-2 dark:border-slate-800">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-4 h-64 w-full" />
        </div>
        <div className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-64 w-full rounded-full" />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200/80 p-5 dark:border-slate-800">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

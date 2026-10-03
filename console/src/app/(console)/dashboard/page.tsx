"use client";

import { Suspense } from "react";
import { DashboardView } from "@/features/dashboard/dashboard-view";
import { DashboardSkeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardView />
    </Suspense>
  );
}

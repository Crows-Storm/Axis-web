"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatAmount, formatPercent } from "@/lib/format";
import {
  allocation,
  cashflowByRange,
  dashboardKpis,
  type RangeKey,
} from "@/features/dashboard/mock";

const RANGES: RangeKey[] = ["7D", "30D", "YTD", "ALL"];
const PIE_COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#8B5CF6"];

export function DashboardView() {
  const [range, setRange] = useState<RangeKey>("30D");
  const [weights, setWeights] = useState(allocation);

  const series = cashflowByRange[range];
  const totalWeight = useMemo(
    () => weights.reduce((sum, item) => sum + item.value, 0),
    [weights],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">报表分析</h1>
        <div className="flex gap-1 rounded-lg border border-slate-200 p-1 dark:border-slate-800">
          {RANGES.map((key) => (
            <Button
              key={key}
              size="sm"
              variant={range === key ? "default" : "ghost"}
              onClick={() => setRange(key)}
            >
              {key}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <Card key={kpi.key}>
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-mono text-2xl font-semibold tabular-nums">
                {kpi.kind === "amount" ? formatAmount(kpi.value) : formatPercent(kpi.value)}
              </p>
              <p className={kpi.delta >= 0 ? "text-sm text-emerald-500" : "text-sm text-rose-500"}>
                {kpi.delta >= 0 ? "+" : ""}
                {formatPercent(kpi.delta)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>收支趋势</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#33415533" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="expense" stroke="#F43F5E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>资产配置模拟</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={weights} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                  {weights.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {weights.map((item, index) => (
                <label key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-12">{item.name}</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={item.value}
                    aria-label={`${item.name}配置比例`}
                    onChange={(event) => {
                      const next = [...weights];
                      next[index] = { ...item, value: Number(event.target.value) };
                      setWeights(next);
                    }}
                    className="flex-1"
                  />
                  <span className="font-mono w-8 text-right">{item.value}%</span>
                </label>
              ))}
              <p className="text-xs text-slate-500">合计 {totalWeight}%（模拟测算，不落库）</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

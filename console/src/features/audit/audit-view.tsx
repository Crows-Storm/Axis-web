"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, type Column } from "@/components/ui/data-table";
import { formatAmount } from "@/lib/format";
import { useRealtimeChannel } from "@/hooks/use-realtime";

interface AuditRow {
  id: string;
  at: string;
  actor: string;
  action: string;
  amount: number;
  flag: "normal" | "large" | "freq";
}

const rows: AuditRow[] = [
  { id: "1", at: "2026-10-03 09:12", actor: "self", action: "更新邮箱", amount: 0, flag: "normal" },
  { id: "2", at: "2026-10-03 10:01", actor: "self", action: "链上转出", amount: 52000, flag: "large" },
  { id: "3", at: "2026-10-03 10:08", actor: "self", action: "链上转出", amount: 1800, flag: "freq" },
  { id: "4", at: "2026-10-02 18:22", actor: "ops", action: "导出报表", amount: 0, flag: "normal" },
];

const columns: Column<AuditRow>[] = [
  { key: "at", header: "时间" },
  { key: "actor", header: "操作者" },
  { key: "action", header: "动作" },
  {
    key: "amount",
    header: "金额",
    numeric: true,
    render: (row) => (row.amount ? formatAmount(row.amount) : "—"),
  },
  {
    key: "flag",
    header: "标记",
    render: (row) =>
      row.flag === "large" ? (
        <Badge tone="danger">大额</Badge>
      ) : row.flag === "freq" ? (
        <Badge tone="warning">频繁转账</Badge>
      ) : (
        <Badge>正常</Badge>
      ),
  },
];

export function AuditView() {
  useRealtimeChannel("audit");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">审计合规</h1>
        <div className="flex gap-2">
          <Button variant="outline">导出 Excel</Button>
          <Button>导出 PDF</Button>
        </div>
      </div>
      <ol className="space-y-2 border-l border-slate-200 pl-4 dark:border-slate-800">
        {rows.map((row) => (
          <li key={row.id} className="relative text-sm">
            <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-indigo-500" />
            <span className="font-mono text-xs text-slate-500">{row.at}</span>
            <p>
              {row.actor} {row.action}
            </p>
          </li>
        ))}
      </ol>
      <DataTable
        columns={columns}
        rows={rows}
        expandedRender={(row) => `不可变记录 #${row.id} · 哈希占位 sha256:${row.id.padStart(16, "0")}`}
      />
    </div>
  );
}

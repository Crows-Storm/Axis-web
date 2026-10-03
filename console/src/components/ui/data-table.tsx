"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Column<T> {
  key: keyof T & string;
  header: string;
  numeric?: boolean;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  pageSize?: number;
  expandedRender?: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  pageSize = 8,
  expandedRender,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key ?? "id");
  const [asc, setAsc] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q))
      : rows;
    return [...list].sort((a, b) => {
      const av = String(a[sortKey as keyof T] ?? "");
      const bv = String(b[sortKey as keyof T] ?? "");
      return asc ? av.localeCompare(bv, "zh-CN", { numeric: true }) : bv.localeCompare(av, "zh-CN", { numeric: true });
    });
  }, [rows, query, sortKey, asc]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-3">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        placeholder="筛选…"
        aria-label="表格筛选"
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/80">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={cn("px-3 py-2 font-medium", col.numeric ? "text-right" : "text-left")}>
                  <button
                    type="button"
                    className="hover:text-indigo-600"
                    onClick={() => {
                      if (sortKey === col.key) setAsc(!asc);
                      else {
                        setSortKey(col.key);
                        setAsc(true);
                      }
                    }}
                  >
                    {col.header}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row) => (
              <Fragment key={row.id}>
                <tr
                  className="cursor-pointer border-t border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                  onClick={() => setOpenId(openId === row.id ? null : row.id)}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn("px-3 py-2", col.numeric && "text-right font-mono tabular-nums")}
                    >
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
                {openId === row.id && expandedRender && (
                  <tr className="bg-slate-50/80 dark:bg-slate-900/50">
                    <td colSpan={columns.length} className="px-4 py-3 text-xs text-slate-500">
                      {expandedRender(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end gap-2 text-xs">
        <span>
          {page}/{pages} · {total} 条
        </span>
        <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          上一页
        </Button>
        <Button size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>
          下一页
        </Button>
      </div>
    </div>
  );
}

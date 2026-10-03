"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const actions = ["READ", "CREATE", "UPDATE", "DELETE", "AUDIT"] as const;
const roles = ["admin", "editor", "auditor"] as const;
const menus = ["dashboard", "wallets", "audit", "rbac"] as const;

type Action = (typeof actions)[number];
type Role = (typeof roles)[number];
type Menu = (typeof menus)[number];

const seed: Record<Role, Record<Menu, Action[]>> = {
  admin: {
    dashboard: [...actions],
    wallets: [...actions],
    audit: [...actions],
    rbac: [...actions],
  },
  editor: {
    dashboard: ["READ"],
    wallets: ["READ", "CREATE", "UPDATE"],
    audit: ["READ"],
    rbac: ["READ"],
  },
  auditor: {
    dashboard: ["READ"],
    wallets: ["READ"],
    audit: ["READ", "AUDIT"],
    rbac: ["READ"],
  },
};

export function RbacMatrix() {
  const [matrix, setMatrix] = useState(seed);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">角色权限矩阵</h1>
      <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr>
              <th className="px-3 py-2 text-left">角色 / 菜单</th>
              {menus.map((menu) => (
                <th key={menu} className="px-3 py-2 text-left">
                  {menu}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-3 py-2 font-medium">{role}</td>
                {menus.map((menu) => (
                  <td key={menu} className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {actions.map((action) => {
                        const on = matrix[role][menu].includes(action);
                        return (
                          <button
                            key={action}
                            type="button"
                            className={cn(
                              "rounded-lg px-2 py-0.5 text-xs",
                              on ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800",
                            )}
                            onClick={() => {
                              setMatrix((prev) => {
                                const current = new Set(prev[role][menu]);
                                if (current.has(action)) current.delete(action);
                                else current.add(action);
                                    return {
                                      ...prev,
                                      [role]: {
                                        ...prev[role],
                                        [menu]: Array.from(current) as Action[],
                                      },
                                    };
                              });
                            }}
                          >
                            {action}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { GripVertical } from "lucide-react";

interface MenuNode {
  id: string;
  name: string;
  icon: string;
  children?: MenuNode[];
}

const initial: MenuNode[] = [
  { id: "dash", name: "报表分析", icon: "LayoutDashboard" },
  {
    id: "wallet",
    name: "钱包",
    icon: "Wallet",
    children: [
      { id: "fiat", name: "法币", icon: "Banknote" },
      { id: "web3", name: "Web3", icon: "Hexagon" },
    ],
  },
  { id: "audit", name: "审计", icon: "ShieldCheck" },
];

export function MenuTree() {
  const [tree, setTree] = useState(initial);

  const move = (from: number, to: number) => {
    setTree((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      if (!item) return prev;
      next.splice(to, 0, item);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">菜单配置</h1>
      <ul className="space-y-2">
        {tree.map((node, index) => (
          <li key={node.id} className="rounded-xl border border-slate-200/80 p-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="上移"
                disabled={index === 0}
                onClick={() => move(index, index - 1)}
              >
                <GripVertical className="h-4 w-4 text-slate-400" />
              </button>
              <span className="text-sm font-medium">{node.name}</span>
              <span className="ml-auto font-mono text-xs text-slate-400">{node.icon}</span>
            </div>
            {node.children && (
              <ul className="mt-2 space-y-1 pl-8 text-sm text-slate-500">
                {node.children.map((child) => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

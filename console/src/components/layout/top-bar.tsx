"use client";

import { usePathname } from "next/navigation";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { navItems } from "@/config/nav";

export function TopBar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const current = navItems.find((item) => pathname.startsWith(item.href));

  return (
    <header className="flex h-14 items-center gap-4 border-b border-slate-200/80 px-6 dark:border-slate-800">
      <nav aria-label="面包屑" className="text-sm text-slate-500">
        <span>控制台</span>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-slate-100">{current?.label ?? "页面"}</span>
      </nav>
      <div className="relative ml-auto w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input className="pl-9" placeholder="全局搜索账户、交易、菜单…" aria-label="全局搜索" />
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label="切换主题"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </header>
  );
}

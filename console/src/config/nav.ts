import { LayoutDashboard, Wallet, ShieldCheck, Settings2, Users, ListTree, type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "报表分析", icon: LayoutDashboard },
  { href: "/wallets", label: "钱包管理", icon: Wallet },
  { href: "/audit", label: "审计合规", icon: ShieldCheck },
  { href: "/admin/rbac", label: "角色权限", icon: Users },
  { href: "/admin/menus", label: "菜单配置", icon: ListTree },
  { href: "/settings", label: "个人设置", icon: Settings2 },
];

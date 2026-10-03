"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount } from "@/lib/format";

const fiatAccounts = [
  { id: "cny-1", name: "招行储蓄", balance: 86200.12, kind: "银行卡" },
  { id: "cash-1", name: "现金", balance: 3200, kind: "现金" },
];

const tokens = [
  { id: "eth", symbol: "ETH", amount: 1.24, price: 18200, change: 0.021, thumb: "Ξ" },
  { id: "usdc", symbol: "USDC", amount: 4200, price: 7.2, change: 0.001, thumb: "$" },
];

export function WalletsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">钱包管理</h1>
        <div className="flex items-center gap-2">
          <Badge tone="web3">链上同步 · 空闲</Badge>
          <ConnectButton />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>法币账户</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fiatAccounts.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200/80 px-3 py-2 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.kind}</p>
                </div>
                <p className="font-mono tabular-nums">{formatAmount(item.balance)}</p>
              </div>
            ))}
            <Button variant="outline" size="sm">
              CSV 导入预览
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Web3 Token</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tokens.map((token) => (
              <div key={token.id} className="flex items-center gap-3 rounded-lg border border-violet-200/40 px-3 py-2 dark:border-violet-900/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600/20 text-violet-400">
                  {token.thumb}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{token.symbol}</p>
                  <p className="text-xs text-slate-500">{token.amount} · 24h {token.change > 0 ? "+" : ""}{(token.change * 100).toFixed(2)}%</p>
                </div>
                <p className="font-mono text-sm tabular-nums">{formatAmount(token.amount * token.price)}</p>
              </div>
            ))}
            <Button variant="web3" size="sm">
              预估 Gas 并签名
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

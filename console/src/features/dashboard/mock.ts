export type RangeKey = "7D" | "30D" | "YTD" | "ALL";

export interface KpiCard {
  key: string;
  label: string;
  value: number;
  delta: number;
  kind: "amount" | "percent" | "ratio";
}

export interface CashflowPoint {
  label: string;
  income: number;
  expense: number;
}

export interface AllocationSlice {
  name: string;
  value: number;
}

export const dashboardKpis: KpiCard[] = [
  { key: "net", label: "净资产", value: 1284_320.55, delta: 0.042, kind: "amount" },
  { key: "flow", label: "月度收支", value: 18_240, delta: -0.016, kind: "amount" },
  { key: "yield", label: "投资收益率", value: 0.086, delta: 0.011, kind: "percent" },
  { key: "web3", label: "Web3 持仓占比", value: 0.23, delta: 0.03, kind: "ratio" },
];

export const cashflowByRange: Record<RangeKey, CashflowPoint[]> = {
  "7D": [
    { label: "D1", income: 1200, expense: 800 },
    { label: "D2", income: 900, expense: 1100 },
    { label: "D3", income: 1500, expense: 700 },
    { label: "D4", income: 800, expense: 900 },
    { label: "D5", income: 2100, expense: 400 },
    { label: "D6", income: 600, expense: 1300 },
    { label: "D7", income: 1700, expense: 950 },
  ],
  "30D": Array.from({ length: 8 }, (_, i) => ({
    label: `W${i + 1}`,
    income: 4000 + i * 220,
    expense: 2800 + (i % 3) * 400,
  })),
  YTD: [
    { label: "Q1", income: 42000, expense: 31000 },
    { label: "Q2", income: 48000, expense: 33500 },
    { label: "Q3", income: 51000, expense: 36000 },
    { label: "Q4", income: 39000, expense: 28000 },
  ],
  ALL: [
    { label: "2023", income: 160000, expense: 120000 },
    { label: "2024", income: 188000, expense: 141000 },
    { label: "2025", income: 210000, expense: 150000 },
  ],
};

export const allocation: AllocationSlice[] = [
  { name: "现金", value: 22 },
  { name: "权益", value: 38 },
  { name: "固收", value: 17 },
  { name: "Web3", value: 23 },
];

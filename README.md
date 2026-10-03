# PFC Console

Personal Finance Console 脚手架。后续按模块提需求时：先简述实现思路，确认后再写完整代码。

## 启动

```bash
cd console
cp .env.example .env.local
npm install
npm run dev
```

打开 http://localhost:3000 ，默认进入 `/dashboard`。

## 约定

- Go 信封：`{ code, message, data }`，HTTP 客户端见 `src/lib/api/client.ts`
- 请求头自动带 `X-Request-ID`
- 不要把密钥、助记词、真实 RPC Key 写进仓库
- 组件单文件不超过约 300 行；禁止 `any`

## 页面

| 路径 | 模块 |
|------|------|
| `/dashboard` | 报表 KPI / 趋势 / 配置模拟 |
| `/wallets` | 法币 + RainbowKit |
| `/audit` | 审计时间轴 + 表格 |
| `/admin/rbac` | 权限矩阵 |
| `/admin/menus` | 菜单树排序 |
| `/settings` | 安全 / 通知 |

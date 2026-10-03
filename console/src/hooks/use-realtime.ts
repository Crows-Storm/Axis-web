"use client";

/** 行情/审计告警的实时通道占位，后续接 WebSocket 或 SSE */
export function useRealtimeChannel(channel: "market" | "audit") {
  return {
    channel,
    status: "idle" as const,
    connect: () => undefined,
    disconnect: () => undefined,
  };
}

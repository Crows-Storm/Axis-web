import axios, { type AxiosError } from "axios";
import { toast } from "sonner";
import { generateRequestId } from "@/lib/utils";
import { toApiError } from "@/lib/api/errors";
import type { ApiEnvelope } from "@/lib/api/types";
import { useAuthStore } from "@/stores/auth-store";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:18802/api",
  timeout: 15_000,
});

http.interceptors.request.use((config) => {
  config.headers["X-Request-ID"] = generateRequestId();
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiEnvelope<unknown> | undefined;
    if (payload && typeof payload.code === "number" && payload.code !== 0) {
      const err = toApiError(response.status, payload.code, payload.message);
      toast.error(err.message);
      return Promise.reject(err);
    }
    return response;
  },
  (error: AxiosError<ApiEnvelope<unknown>>) => {
    const status = error.response?.status ?? 500;
    const code = error.response?.data?.code ?? status;
    const message = error.response?.data?.message ?? error.message;
    const err = toApiError(status, code, message);
    toast.error(err.message);
    if (status === 401) {
      useAuthStore.getState().clear();
    }
    return Promise.reject(err);
  },
);

export async function apiGet<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const { data } = await http.get<ApiEnvelope<T>>(url, { params });
  return data.data;
}

export async function apiSend<T>(
  method: "post" | "put" | "patch" | "delete",
  url: string,
  body?: unknown,
): Promise<T> {
  const { data } = await http.request<ApiEnvelope<T>>({ method, url, data: body });
  return data.data;
}

export { http };

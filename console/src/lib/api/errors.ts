import { ApiError } from "@/lib/api/types";

const HTTP_MESSAGES: Record<number, string> = {
  400: "请求参数无效",
  401: "登录已失效，请重新登录",
  403: "没有权限执行该操作",
  404: "资源不存在",
  409: "资源冲突",
  429: "请求过于频繁",
  500: "服务暂时不可用",
  502: "上游服务异常",
  503: "服务维护中",
};

/** 将 HTTP 状态与业务 code 映射为面向用户的中文说明 */
export function mapApiError(httpStatus: number, code: number, message: string): string {
  if (code === 2001 || code === 2002 || code === 2003 || httpStatus === 401) {
    return HTTP_MESSAGES[401];
  }
  if (code === 2004 || code === 2005 || httpStatus === 403) {
    return HTTP_MESSAGES[403];
  }
  if (httpStatus === 400 || code === 1000 || code === 1002) {
    return message || HTTP_MESSAGES[400];
  }
  return HTTP_MESSAGES[httpStatus] ?? message ?? "未知错误";
}

export function toApiError(httpStatus: number, code: number, message: string): ApiError {
  return new ApiError(mapApiError(httpStatus, code, message), code, httpStatus);
}

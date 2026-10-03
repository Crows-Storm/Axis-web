/** 对齐 Axis Go 后端 server.Success / Error* 信封 */
export interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
  timestamp?: string;
}

export interface PageQuery {
  page: number;
  pageSize: number;
}

export interface PageData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export class ApiError extends Error {
  readonly code: number;
  readonly httpStatus: number;

  constructor(message: string, code: number, httpStatus: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.httpStatus = httpStatus;
  }
}

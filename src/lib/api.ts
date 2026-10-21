import { NextResponse } from "next/server";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
};

export function ok<T>(data: T, init?: ResponseInit & { meta?: Record<string, unknown> }) {
  const { meta, ...rest } = init || {};
  const body: ApiSuccess<T> = { success: true, data, ...(meta ? { meta } : {}) };
  return NextResponse.json(body, { status: 200, ...rest });
}

export function created<T>(data: T) {
  return NextResponse.json({ success: true, data } satisfies ApiSuccess<T>, {
    status: 201,
  });
}

export function fail(
  message: string,
  status = 400,
  options?: { code?: string; details?: unknown },
) {
  const body: ApiError = {
    success: false,
    error: {
      message,
      code: options?.code,
      details: options?.details,
    },
  };
  return NextResponse.json(body, { status });
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

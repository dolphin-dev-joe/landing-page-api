import { env } from "../env.ts";
import type { Handler } from "./request_id.ts";

export function corsMiddleware(handler: Handler): Handler {
  return async (req: Request) => {
    const origin = req.headers.get("origin");
    const allowedOrigins = env.CORS_ORIGINS;

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin && allowedOrigins.includes(origin) ? origin : "",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    const response = await handler(req);
    const headers = new Headers(response.headers);

    if (origin && allowedOrigins.includes(origin)) {
      headers.set("Access-Control-Allow-Origin", origin);
      headers.set("Access-Control-Allow-Credentials", "true");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };
}

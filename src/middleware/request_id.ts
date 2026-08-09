import { randomUUID } from "crypto";

export type Handler = (req: Request) => Promise<Response> | Response;

export function requestIdMiddleware(handler: Handler): Handler {
  return async (req: Request) => {
    const requestId = randomUUID();

    const response = await handler(req);

    const headers = new Headers(response.headers);
    headers.set("X-Request-Id", requestId);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };
}

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function jsonResponse<T>(data: T, status: HttpStatusCode = HttpStatus.OK): Response {
  const response: ApiResponse<T> = {
    success: status >= 200 && status < 300,
    data,
  };

  return new Response(JSON.stringify(response), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function errorResponse(message: string, status: HttpStatusCode = HttpStatus.BAD_REQUEST): Response {
  const response: ApiResponse = {
    success: false,
    error: message,
  };

  return new Response(JSON.stringify(response), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function createdResponse<T>(data: T): Response {
  return jsonResponse(data, HttpStatus.CREATED);
}

export function noContentResponse(): Response {
  return new Response(null, { status: HttpStatus.NO_CONTENT });
}

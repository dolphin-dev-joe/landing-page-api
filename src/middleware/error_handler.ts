import { AppError } from "../lib/errors.ts";
import { errorResponse, HttpStatus } from "../lib/http.ts";
import { logger } from "../lib/logger.ts";
import type { Handler } from "./request_id.ts";

export function errorHandler(handler: Handler): Handler {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      if (error instanceof AppError) {
        logger.warn("Application error", {
          code: error.code,
          message: error.message,
          details: error.details,
        });
        return errorResponse(error.message, error.statusCode);
      }

      logger.error("Unexpected error", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });

      return errorResponse("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}

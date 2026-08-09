import { db, siteSettings } from "../db/index.ts";
import { eq } from "drizzle-orm";
import { errorResponse, HttpStatus } from "../lib/http.ts";
import type { Handler } from "./request_id.ts";

export function maintenanceMiddleware(handler: Handler): Handler {
  return async (req: Request) => {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/api/admin") || url.pathname === "/api/health") {
      return handler(req);
    }

    try {
      const settings = await db.query.siteSettings.findFirst();

      if (settings?.maintenanceMode) {
        return errorResponse(
          settings.maintenanceMessage || "Site is under maintenance. Please check back later.",
          HttpStatus.SERVICE_UNAVAILABLE
        );
      }
    } catch (error) {
    }

    return handler(req);
  };
}

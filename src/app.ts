import { Hono } from "hono";
import { cors } from "hono/cors";
import { publicRoutes } from "./modules/public/public.routes.ts";
import { healthRoutes } from "./modules/health/health.routes.ts";
import { docsRoutes } from "./modules/docs/docs.routes.ts";
import { env } from "./env.ts";
import { logger } from "./lib/logger.ts";

export function createApp() {
  const app = new Hono();

  // CORS middleware
  app.use(
    "*",
    cors({
      origin: (origin) => {
        return env.CORS_ORIGINS.includes(origin) ? origin : undefined;
      },
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      maxAge: 86400,
    })
  );

  // Request logging
  app.use("*", async (c, next) => {
    const url = new URL(c.req.url);
    logger.info(`${c.req.method} ${url.pathname}`);
    await next();
  });

  // Global error handler
  app.onError((err, c) => {
    logger.error(`Error: ${err.message}`, err);

    // Check if we can determine the status code or error type
    // In Hono, we don't have the 'code' property on Error by default

    // For now returning 500, similar to the original fallback
    c.status(500);
    return c.json({
      success: false,
      error: "Internal server error",
    });
  });

  // Not Found handler
  app.notFound((c) => {
    c.status(404);
    return c.json({
      success: false,
      error: "Route not found",
    });
  });

  // Routes
  app.route("/", healthRoutes);
  app.route("/", docsRoutes);
  app.route("/", publicRoutes);

  return app;
}

import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { sql } from "drizzle-orm";

export const healthRoutes = new Hono().basePath("/api").get("/health", async (c) => {
  try {
    await db.execute(sql`SELECT 1`);

    return c.json({
      success: true,
      data: {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
    });
  } catch (error) {
    c.status(503);
    return c.json({
      success: false,
      error: "Database connection failed",
    });
  }
});

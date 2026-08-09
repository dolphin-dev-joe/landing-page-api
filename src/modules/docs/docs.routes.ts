import { Hono } from "hono";
import { docsController } from "./docs.controller.ts";
import { env } from "../../env.ts";

// This route handler ONLY works in development mode
export const docsRoutes = new Hono().basePath("/docs");

// Guard
docsRoutes.use('*', async (c, next) => {
  if (env.NODE_ENV !== "development") {
    c.status(404);
    return c.json({
      success: false,
      error: "Not found",
    });
  }
  await next();
});

docsRoutes
  // Login page (GET)
  .get("/login", (c) => docsController.showLoginPage(c.req.raw))
  // Login handler (POST)
  .post("/login", (c) => docsController.handleLogin(c.req.raw))
  // Logout handler (GET)
  .get("/logout", (c) => docsController.handleLogout(c.req.raw))
  // API documentation page (GET) - protected by session
  .get("/", (c) => docsController.showApiDocs(c.req.raw));

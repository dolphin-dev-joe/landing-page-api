import { createApp } from "./app.ts";
import { env } from "./env.ts";
import { logger } from "./lib/logger.ts";

const app = createApp();

Bun.serve({
  port: parseInt(env.PORT),
  hostname: env.HOST, // Ensure we respect the HOST env var if needed, or default to localhost
  fetch: app.fetch,
});

logger.info(`Server running at http://${env.HOST}:${env.PORT}`);
logger.info(`Environment: ${env.NODE_ENV}`);

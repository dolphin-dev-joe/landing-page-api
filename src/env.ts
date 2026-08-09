import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("3000"),
  HOST: z.string().default("0.0.0.0"),

  // Support DATABASE_URL (e.g., for Neon, Supabase, etc.)
  DATABASE_URL: z.string(),

  CORS_ORIGINS: z
    .string()
    .default("http://localhost:3000")
    .transform((val) => val.split(",").map((origin) => origin.trim())),

  RATE_LIMIT_WINDOW_MS: z.string().default("900000").transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().default("100").transform(Number),

  MAINTENANCE_MODE: z.string().default("false").transform((val) => val === "true"),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;

import { env } from "../env.ts";
import { RateLimitError } from "./errors.ts";

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

export function checkRateLimit(identifier: string): void {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetAt) {
    store.set(identifier, {
      count: 1,
      resetAt: now + env.RATE_LIMIT_WINDOW_MS,
    });
    return;
  }

  if (record.count >= env.RATE_LIMIT_MAX_REQUESTS) {
    throw new RateLimitError("Rate limit exceeded. Please try again later.");
  }

  record.count++;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetAt) {
      store.delete(key);
    }
  }
}, 60000);

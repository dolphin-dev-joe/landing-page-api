import { pgTable, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  config: jsonb("config").notNull(), // Store all settings as JSON
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;

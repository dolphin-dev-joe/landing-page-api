import { pgTable, bigserial, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const homeSections = pgTable("home_sections", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  sectionKey: varchar("section_key", { length: 50 }).notNull().unique(), // hero, why_us, banner, etc.
  title: varchar("title", { length: 150 }),
  subtitle: text("subtitle"),
  imageUrl: text("image_url"),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaLink: varchar("cta_link", { length: 255 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type HomeSection = typeof homeSections.$inferSelect;
export type NewHomeSection = typeof homeSections.$inferInsert;

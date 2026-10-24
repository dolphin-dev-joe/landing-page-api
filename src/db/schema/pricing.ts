import { pgTable, varchar, text, integer, boolean, timestamp, numeric, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const pricingCategories = pgTable("pricing_categories", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }), // English Name
  description: text("description"),
  descriptionEn: text("description_en"), // English Description
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pricingItems = pgTable("pricing_items", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  categoryId: uuid("category_id").notNull().references(() => pricingCategories.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  nameEn: varchar("name_en", { length: 150 }), // English Name
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 10 }).notNull(), // kg, pcs, psg
  unitEn: varchar("unit_en", { length: 10 }),      // English Unit (e.g. pairs)
  durationText: varchar("duration_text", { length: 50 }), // "2 hari", "24 jam"
  durationTextEn: varchar("duration_text_en", { length: 50 }), // "2 days", "24 hours"
  notes: text("notes"),
  notesEn: text("notes_en"), // English Notes
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PricingCategory = typeof pricingCategories.$inferSelect;
export type NewPricingCategory = typeof pricingCategories.$inferInsert;
export type PricingItem = typeof pricingItems.$inferSelect;
export type NewPricingItem = typeof pricingItems.$inferInsert;

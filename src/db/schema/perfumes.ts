import { pgTable, bigserial, varchar, integer, boolean, timestamp, bigint } from "drizzle-orm/pg-core";

export const perfumeCategories = pgTable("perfume_categories", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }), // English Name
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const perfumes = pgTable("perfumes", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  categoryId: bigint("category_id", { mode: "number" }).notNull().references(() => perfumeCategories.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  nameEn: varchar("name_en", { length: 150 }), // English Name
  popular: boolean("popular").notNull().default(false), // Popular perfume flag
  fabricSafe: boolean("fabric_safe").notNull().default(true), // Safe for all fabrics
  longLasting: boolean("long_lasting").notNull().default(false), // Long-lasting scent (3-5 days)
  premium: boolean("premium").notNull().default(false), // Premium quality import
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PerfumeCategory = typeof perfumeCategories.$inferSelect;
export type NewPerfumeCategory = typeof perfumeCategories.$inferInsert;
export type Perfume = typeof perfumes.$inferSelect;
export type NewPerfume = typeof perfumes.$inferInsert;

import { pgTable, varchar, text, boolean, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }),
  zipCode: varchar("zip_code", { length: 20 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  hours: text("hours"),
  mapUrl: varchar("map_url", { length: 500 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Location = typeof locations.$inferSelect;
export type NewLocation = typeof locations.$inferInsert;

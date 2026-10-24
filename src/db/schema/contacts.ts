import { pgTable, varchar, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  type: varchar("type", { length: 50 }).notNull(), // whatsapp, instagram, email, phone, etc.
  label: varchar("label", { length: 100 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;

import { pgTable, bigserial, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
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

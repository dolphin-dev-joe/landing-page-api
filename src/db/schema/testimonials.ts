import { pgTable, bigserial, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const testimonials = pgTable("testimonials", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  customerRole: varchar("customer_role", { length: 255 }),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  imageUrl: varchar("image_url", { length: 500 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

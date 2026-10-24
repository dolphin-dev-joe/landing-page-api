import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const articleStatusEnum = pgEnum("article_status", [
  "draft",
  "published",
  "archived",
]);

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  coverImage: varchar("cover_image", { length: 500 }),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  status: articleStatusEnum("status").notNull().default("draft"),
  viewsCount: integer("views_count").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

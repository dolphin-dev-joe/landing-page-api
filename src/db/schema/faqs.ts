import { pgTable, bigserial, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const faqs = pgTable("faqs", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  questionEn: varchar("question_en", { length: 255 }), // English Question
  answer: text("answer").notNull(),
  answerEn: text("answer_en"), // English Answer
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Faq = typeof faqs.$inferSelect;
export type NewFaq = typeof faqs.$inferInsert;

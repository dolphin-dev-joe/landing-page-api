import { pgTable, bigserial, varchar, text, integer, boolean, timestamp, numeric, bigint, jsonb } from "drizzle-orm/pg-core";

// Site Settings
export const siteSettings = pgTable("site_settings", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  config: jsonb("config").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Home Sections
export const homeSections = pgTable("home_sections", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  sectionKey: varchar("section_key", { length: 50 }).notNull().unique(),
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

// Testimonials
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

// Locations
export const locations = pgTable("locations", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
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

// Contacts
export const contacts = pgTable("contacts", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Pricing Categories
export const pricingCategories = pgTable("pricing_categories", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
  description: text("description"),
  descriptionEn: text("description_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Pricing Items
export const pricingItems = pgTable("pricing_items", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  categoryId: bigint("category_id", { mode: "number" }).notNull().references(() => pricingCategories.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  nameEn: varchar("name_en", { length: 150 }),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 10 }).notNull(),
  unitEn: varchar("unit_en", { length: 10 }),
  durationText: varchar("duration_text", { length: 50 }),
  durationTextEn: varchar("duration_text_en", { length: 50 }),
  notes: text("notes"),
  notesEn: text("notes_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Perfume Categories
export const perfumeCategories = pgTable("perfume_categories", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Perfumes
export const perfumes = pgTable("perfumes", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  categoryId: bigint("category_id", { mode: "number" }).notNull().references(() => perfumeCategories.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 150 }).notNull(),
  nameEn: varchar("name_en", { length: 150 }),
  popular: boolean("popular").notNull().default(false),
  fabricSafe: boolean("fabric_safe").notNull().default(true),
  longLasting: boolean("long_lasting").notNull().default(false),
  premium: boolean("premium").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// FAQs
export const faqs = pgTable("faqs", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  questionEn: varchar("question_en", { length: 255 }),
  answer: text("answer").notNull(),
  answerEn: text("answer_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

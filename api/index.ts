import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, uuid, varchar, text, integer, boolean, timestamp, numeric, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { sql, eq, and, ilike, desc } from "drizzle-orm";

// Database setup
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString, {
  max: 1,
  ssl: 'require'
});
const db = drizzle(client);

// Schema definitions
const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  config: jsonb("config").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

const homeSections = pgTable("home_sections", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
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

const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
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

const locations = pgTable("locations", {
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

const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  type: varchar("type", { length: 50 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

const pricingCategories = pgTable("pricing_categories", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
  description: text("description"),
  descriptionEn: text("description_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

const pricingItems = pgTable("pricing_items", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  categoryId: uuid("category_id").notNull().references(() => pricingCategories.id, { onDelete: "cascade" }),
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

const perfumeCategories = pgTable("perfume_categories", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

const perfumes = pgTable("perfumes", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  categoryId: uuid("category_id").notNull().references(() => perfumeCategories.id, { onDelete: "cascade" }),
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

const articleStatusEnum = pgEnum("article_status", ["draft", "published", "archived"]);

const articles = pgTable("articles", {
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

const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v7()`),
  question: varchar("question", { length: 255 }).notNull(),
  questionEn: varchar("question_en", { length: 255 }),
  answer: text("answer").notNull(),
  answerEn: text("answer_en"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

const app = new Hono();

// CORS middleware
app.use("*", cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "https://www.dolphin-laundry-kupang.biz.id"],
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

// Root
app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Dolphin Laundry API is running!",
  });
});

// Health check
app.get("/api/health", async (c) => {
  try {
    await db.execute(sql`SELECT 1`);
    return c.json({
      success: true,
      data: {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
      },
    });
  } catch (error) {
    return c.json({
      success: false,
      error: "Database connection failed",
    }, 503);
  }
});

// Get all landing page data (optimized single call)
app.get("/api/landing-page", async (c) => {
  try {
    const [
      pricingCategoriesData,
      pricingItemsData,
      perfumeCategoriesData,
      perfumesData,
      faqsData,
      testimonialsData,
      locationsData,
      contactsData,
      homeSectionsData,
      settingsData,
    ] = await Promise.all([
      db.select().from(pricingCategories).where(eq(pricingCategories.isActive, true)),
      db.select().from(pricingItems).where(eq(pricingItems.isActive, true)),
      db.select().from(perfumeCategories).where(eq(perfumeCategories.isActive, true)),
      db.select().from(perfumes).where(eq(perfumes.isActive, true)),
      db.select().from(faqs).where(eq(faqs.isActive, true)),
      db.select().from(testimonials).where(eq(testimonials.isActive, true)),
      db.select().from(locations).where(eq(locations.isActive, true)),
      db.select().from(contacts).where(eq(contacts.isActive, true)),
      db.select().from(homeSections).where(eq(homeSections.isActive, true)),
      db.select().from(siteSettings).limit(1),
    ]);

    return c.json({
      success: true,
      data: {
        pricingCategories: pricingCategoriesData,
        pricingItems: pricingItemsData,
        perfumeCategories: perfumeCategoriesData,
        perfumes: perfumesData,
        faqs: faqsData,
        testimonials: testimonialsData,
        locations: locationsData,
        contacts: contactsData,
        homeSections: homeSectionsData,
        settings: settingsData[0] || null,
      },
    });
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return c.json({
      success: false,
      error: "Failed to fetch landing page data",
    }, 500);
  }
});

// Pricing endpoints
app.get("/api/pricing", async (c) => {
  try {
    const [categories, items] = await Promise.all([
      db.select().from(pricingCategories).where(eq(pricingCategories.isActive, true)),
      db.select().from(pricingItems).where(eq(pricingItems.isActive, true)),
    ]);
    return c.json({
      success: true,
      data: {
        categories,
        items
      }
    });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch pricing" }, 500);
  }
});

// Perfumes endpoints
app.get("/api/perfumes", async (c) => {
  try {
    const [categories, items] = await Promise.all([
      db.select().from(perfumeCategories).where(eq(perfumeCategories.isActive, true)),
      db.select().from(perfumes).where(eq(perfumes.isActive, true)),
    ]);
    return c.json({
      success: true,
      data: {
        categories,
        items
      }
    });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch perfumes" }, 500);
  }
});

// FAQs endpoints
app.get("/api/faqs", async (c) => {
  try {
    const data = await db.select().from(faqs).where(eq(faqs.isActive, true));
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch FAQs" }, 500);
  }
});

// Testimonials endpoints
app.get("/api/testimonials", async (c) => {
  try {
    const data = await db.select().from(testimonials).where(eq(testimonials.isActive, true));
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch testimonials" }, 500);
  }
});

// Locations endpoints
app.get("/api/locations", async (c) => {
  try {
    const data = await db.select().from(locations).where(eq(locations.isActive, true));
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch locations" }, 500);
  }
});

// Contacts endpoints
app.get("/api/contacts", async (c) => {
  try {
    const data = await db.select().from(contacts).where(eq(contacts.isActive, true));
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch contacts" }, 500);
  }
});

// Home sections endpoints
app.get("/api/home-sections", async (c) => {
  try {
    const data = await db.select().from(homeSections).where(eq(homeSections.isActive, true));
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch home sections" }, 500);
  }
});

// Get specific home section by key
app.get("/api/home-sections/:sectionKey", async (c) => {
  try {
    const sectionKey = c.req.param("sectionKey");
    const data = await db.select().from(homeSections)
      .where(eq(homeSections.sectionKey, sectionKey))
      .limit(1);

    if (data.length === 0) {
      return c.json({ success: false, error: "Section not found" }, 404);
    }

    return c.json({ success: true, data: data[0] });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch home section" }, 500);
  }
});

// Site settings endpoints
app.get("/api/settings", async (c) => {
  try {
    const data = await db.select().from(siteSettings).limit(1);
    return c.json({ success: true, data: data[0] || null });
  } catch (error) {
    return c.json({ success: false, error: "Failed to fetch settings" }, 500);
  }
});

// Articles list endpoint
app.get("/api/articles", async (c) => {
  try {
    const page = Math.max(1, Number(c.req.query("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(c.req.query("limit") || "9")));
    const q = c.req.query("q");
    const offset = (page - 1) * limit;

    const where = q
      ? and(eq(articles.status, "published"), ilike(articles.title, `${q}%`))
      : eq(articles.status, "published");

    const [items, countResult] = await Promise.all([
      db.select().from(articles).where(where).orderBy(desc(articles.createdAt)).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(articles).where(where),
    ]);

    return c.json({ success: true, data: { items, total: Number(countResult[0]?.count ?? 0) } });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return c.json({ success: false, error: "Failed to fetch articles" }, 500);
  }
});

// Article detail by slug endpoint
app.get("/api/articles/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");

    const [item] = await db
      .select()
      .from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.status, "published")))
      .limit(1);

    if (!item) {
      return c.json({ success: false, error: "Article not found" }, 404);
    }

    // Increment view count (fire-and-forget)
    db.update(articles)
      .set({ viewsCount: sql`${articles.viewsCount} + 1` })
      .where(eq(articles.id, item.id))
      .catch(() => {});

    return c.json({ success: true, data: item });
  } catch (error) {
    console.error("Error fetching article:", error);
    return c.json({ success: false, error: "Failed to fetch article" }, 500);
  }
});

// Not Found handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: "Route not found",
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({
    success: false,
    error: "Internal server error",
  }, 500);
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;

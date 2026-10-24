import {
  db,
  pricingCategories,
  pricingItems,
  perfumeCategories,
  perfumes,
  faqs,
  testimonials,
  locations,
  homeSections,
  siteSettings,
  contacts,
  articles,
  type NewContact,
} from "../../db/index.ts";
import { eq, and, ilike, desc, sql } from "drizzle-orm";

export class PublicRepository {
  // Get all pricing with categories and items
  async getAllPricing() {
    const categories = await db
      .select()
      .from(pricingCategories)
      .where(eq(pricingCategories.isActive, true))
      .orderBy(pricingCategories.sortOrder);

    const items = await db
      .select()
      .from(pricingItems)
      .where(eq(pricingItems.isActive, true))
      .orderBy(pricingItems.sortOrder);

    return categories.map((category) => {
      const catItems = items.filter((item) => item.categoryId === category.id);

      // Group items by name to handle nested services
      const groupedItems: Record<string, typeof items> = {};
      for (const item of catItems) {
        if (!groupedItems[item.name]) {
          groupedItems[item.name] = [];
        }
        groupedItems[item.name]!.push(item);
      }

      const finalItems = Object.values(groupedItems).map((group) => {
        if (group.length === 0) return null;

        // Check if items have 'notes' indicating service type (e.g., "Dry Clean", "Laundry Khusus")
        const hasServiceType = group.some((i) =>
          i.notes && (i.notes.includes("Dry Clean") || i.notes.includes("Laundry Khusus"))
        );

        if (hasServiceType && group.length > 1) {
          // Nested structure for items with sub-services
          const firstItem = group[0];
          if (!firstItem) return null;

          return {
            name: firstItem.name,
            nameEn: firstItem.nameEn || firstItem.name,
            services: group.map((i) => ({
              type: i.notes || "Standard",
              typeEn: i.notesEn || i.notes || "Standard",
              price: this.formatPrice(i.price, i.unit),
              priceEn: this.formatPrice(i.price, i.unitEn || i.unit, "en"),
              duration: i.durationText || "",
              durationEn: i.durationTextEn || i.durationText || "",
            })),
          };
        } else {
          // Flat structure for simple items
          const item = group[0];
          if (!item) return null;

          return {
            name: item.name,
            nameEn: item.nameEn || item.name,
            price: this.formatPrice(item.price, item.unit),
            priceEn: this.formatPrice(item.price, item.unitEn || item.unit, "en"),
            duration: item.durationText || "",
            durationEn: item.durationTextEn || item.durationText || "",
          };
        }
      }).filter((item): item is NonNullable<typeof item> => item !== null);

      return {
        category: category.name,
        categoryEn: category.nameEn || category.name,
        icon: this.getCategoryIcon(category.name),
        description: category.description || "",
        descriptionEn: category.descriptionEn || category.description || "",
        items: finalItems,
      };
    });
  }

  private getCategoryIcon(categoryName: string): string {
    // Map category names to icon names
    const iconMap: Record<string, string> = {
      "Laundry Reguler": "Droplet",
      "Express": "Zap",
      "Dry Clean & Laundry Khusus": "ShirtIcon",
    };
    return iconMap[categoryName] || "Circle";
  }

  private formatPrice(price: string | number, unit: string | null, lang: string = "id") {
    const p = Number(price);

    // Special case for price = 0 (like "Boneka" with custom pricing)
    if (p === 0) {
      return lang === "en"
        ? "Price and time estimate depends on size"
        : "Estimasi harga dan waktu tergantung ukuran";
    }

    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(p)
      .replace("Rp", "Rp ");

    if (unit && unit.trim()) {
      return `${formatted} / ${unit}`;
    }
    return formatted;
  }

  // Get all perfumes with categories
  async getAllPerfumes() {
    const categories = await db
      .select()
      .from(perfumeCategories)
      .where(eq(perfumeCategories.isActive, true))
      .orderBy(perfumeCategories.sortOrder);

    const perfumeList = await db
      .select()
      .from(perfumes)
      .where(eq(perfumes.isActive, true))
      .orderBy(perfumes.sortOrder);

    return categories.map(category => ({
      ...category,
      perfumes: perfumeList.filter(perfume => perfume.categoryId === category.id),
    }));
  }

  async getAllFaqs() {
    return await db.select().from(faqs).where(eq(faqs.isActive, true)).orderBy(faqs.sortOrder);
  }

  async getAllTestimonials() {
    return await db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(testimonials.sortOrder);
  }

  async getAllLocations() {
    return await db.select().from(locations).where(eq(locations.isActive, true)).orderBy(locations.sortOrder);
  }

  async getHomeSection(sectionKey: string) {
    const result = await db.select().from(homeSections).where(eq(homeSections.sectionKey, sectionKey)).limit(1);
    return result[0] || null;
  }

  async getAllHomeSections() {
    return await db.select().from(homeSections).where(eq(homeSections.isActive, true)).orderBy(homeSections.sortOrder);
  }

  async getSiteSettings() {
    const result = await db.select().from(siteSettings).limit(1);
    return result[0] || null;
  }

  async getAllContacts() {
    return await db.select().from(contacts).where(eq(contacts.isActive, true)).orderBy(contacts.sortOrder);
  }

  async getPublishedArticles(page: number, limit: number, search?: string) {
    const conditions = [eq(articles.status, "published")];

    if (search) {
      conditions.push(ilike(articles.title, `${search}%`));
    }

    const where = and(...conditions);

    const [items, countResult] = await Promise.all([
      db
        .select()
        .from(articles)
        .where(where)
        .orderBy(desc(articles.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db
        .select({ count: sql<number>`count(*)` })
        .from(articles)
        .where(where),
    ]);

    return { items, total: Number(countResult[0]?.count ?? 0) };
  }

  async getPublishedArticleBySlug(slug: string) {
    const [item] = await db
      .select()
      .from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.status, "published")))
      .limit(1);

    return item ?? null;
  }

  async incrementArticleViews(id: string) {
    await db
      .update(articles)
      .set({ viewsCount: sql`${articles.viewsCount} + 1` })
      .where(eq(articles.id, id));
  }
}

export const publicRepo = new PublicRepository();

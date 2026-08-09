import { relations } from "drizzle-orm";
import { pricingCategories, pricingItems } from "./schema/pricing.ts";
import { perfumeCategories, perfumes } from "./schema/perfumes.ts";

// Pricing relations
export const pricingCategoriesRelations = relations(pricingCategories, ({ many }) => ({
  items: many(pricingItems),
}));

export const pricingItemsRelations = relations(pricingItems, ({ one }) => ({
  category: one(pricingCategories, {
    fields: [pricingItems.categoryId],
    references: [pricingCategories.id],
  }),
}));

// Perfume relations
export const perfumeCategoriesRelations = relations(perfumeCategories, ({ many }) => ({
  perfumes: many(perfumes),
}));

export const perfumesRelations = relations(perfumes, ({ one }) => ({
  category: one(perfumeCategories, {
    fields: [perfumes.categoryId],
    references: [perfumeCategories.id],
  }),
}));

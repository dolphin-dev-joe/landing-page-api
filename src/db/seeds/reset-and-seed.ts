import { sql } from "drizzle-orm";
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
} from "../index.ts";
import { getSeedData } from "./data.ts";
import { logger } from "../../lib/logger.ts";

async function resetAndSeed() {
  try {
    logger.info("Starting database reset and seed...");

    // Truncate all tables and reset sequences
    logger.info("Truncating all tables...");
    await db.execute(sql`TRUNCATE TABLE pricing_items RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE pricing_categories RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE perfumes RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE perfume_categories RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE faqs RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE testimonials RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE locations RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE contacts RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE home_sections RESTART IDENTITY CASCADE`);
    await db.execute(sql`TRUNCATE TABLE site_settings RESTART IDENTITY CASCADE`);

    logger.info("All tables truncated successfully!");

    // Get fresh seed data
    const data = await getSeedData();

    // Insert pricing categories first
    logger.info("Seeding pricing categories...");
    const insertedCategories = await db.insert(pricingCategories).values(data.pricingCategories).returning({ id: pricingCategories.id });
    logger.info(`Inserted ${insertedCategories.length} pricing categories with IDs: ${insertedCategories.map(c => c.id).join(', ')}`);

    // Map old categoryId to new IDs
    const categoryIdMap: Record<number, number> = {
      1: insertedCategories[0].id,
      2: insertedCategories[1].id,
      3: insertedCategories[2].id,
    };

    // Update pricingItems with correct category IDs
    const updatedPricingItems = data.pricingItems.map(item => ({
      ...item,
      categoryId: categoryIdMap[item.categoryId],
    }));

    logger.info("Seeding pricing items...");
    await db.insert(pricingItems).values(updatedPricingItems);
    logger.info(`Inserted ${updatedPricingItems.length} pricing items`);

    // Insert perfume categories
    logger.info("Seeding perfume categories...");
    const insertedPerfumeCategories = await db.insert(perfumeCategories).values(data.perfumeCategories).returning({ id: perfumeCategories.id });
    logger.info(`Inserted ${insertedPerfumeCategories.length} perfume categories`);

    // Map old perfume categoryId to new IDs
    const perfumeCategoryIdMap: Record<number, number> = {};
    insertedPerfumeCategories.forEach((cat, index) => {
      perfumeCategoryIdMap[index + 1] = cat.id;
    });

    // Update perfumes with correct category IDs
    const updatedPerfumes = data.perfumes.map(perfume => ({
      ...perfume,
      categoryId: perfumeCategoryIdMap[perfume.categoryId],
    }));

    logger.info("Seeding perfumes...");
    await db.insert(perfumes).values(updatedPerfumes);
    logger.info(`Inserted ${updatedPerfumes.length} perfumes`);

    logger.info("Seeding FAQs...");
    await db.insert(faqs).values(data.faqs);
    logger.info(`Inserted ${data.faqs.length} FAQs`);

    logger.info("Seeding testimonials...");
    await db.insert(testimonials).values(data.testimonials);
    logger.info(`Inserted ${data.testimonials.length} testimonials`);

    logger.info("Seeding locations...");
    await db.insert(locations).values(data.locations);
    logger.info(`Inserted ${data.locations.length} locations`);

    logger.info("Seeding contacts...");
    await db.insert(contacts).values(data.contacts);
    logger.info(`Inserted ${data.contacts.length} contacts`);

    logger.info("Seeding home sections...");
    await db.insert(homeSections).values(data.homeSections);
    logger.info(`Inserted ${data.homeSections.length} home sections`);

    logger.info("Seeding site settings...");
    await db.insert(siteSettings).values(data.siteSettings);
    logger.info(`Inserted ${data.siteSettings.length} site settings`);

    logger.info("Database reset and seed completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Error resetting and seeding database", error);
    process.exit(1);
  }
}

resetAndSeed();

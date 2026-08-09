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

async function seed() {
  try {
    logger.info("Starting database seeding...");

    const data = await getSeedData();

    logger.info("Seeding pricing categories...");
    await db.insert(pricingCategories).values(data.pricingCategories).onConflictDoNothing();

    logger.info("Seeding pricing items...");
    await db.insert(pricingItems).values(data.pricingItems).onConflictDoNothing();

    logger.info("Seeding perfume categories...");
    await db.insert(perfumeCategories).values(data.perfumeCategories).onConflictDoNothing();

    logger.info("Seeding perfumes...");
    await db.insert(perfumes).values(data.perfumes).onConflictDoNothing();

    logger.info("Seeding FAQs...");
    await db.insert(faqs).values(data.faqs).onConflictDoNothing();

    logger.info("Seeding testimonials...");
    await db.insert(testimonials).values(data.testimonials).onConflictDoNothing();

    logger.info("Seeding locations...");
    await db.insert(locations).values(data.locations).onConflictDoNothing();

    logger.info("Seeding contacts...");
    await db.insert(contacts).values(data.contacts).onConflictDoNothing();

    logger.info("Seeding home sections...");
    await db.insert(homeSections).values(data.homeSections).onConflictDoNothing();

    logger.info("Seeding site settings...");
    await db.insert(siteSettings).values(data.siteSettings).onConflictDoNothing();

    logger.info("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Error seeding database", error);
    process.exit(1);
  }
}

seed();

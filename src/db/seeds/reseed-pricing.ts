import {
  db,
  pricingCategories,
  pricingItems,
} from "../index.ts";
import { getSeedData } from "./data.ts";
import { logger } from "../../lib/logger.ts";

async function reseedPricing() {
  try {
    logger.info("Starting pricing data reseed...");

    // Delete old data (items first due to foreign key constraint)
    logger.info("Deleting old pricing items...");
    await db.delete(pricingItems);

    logger.info("Deleting old pricing categories...");
    await db.delete(pricingCategories);

    // Get fresh seed data
    const data = await getSeedData();

    // Insert new data
    logger.info("Inserting new pricing categories...");
    await db.insert(pricingCategories).values(data.pricingCategories);

    logger.info("Inserting new pricing items...");
    await db.insert(pricingItems).values(data.pricingItems);

    logger.info("Pricing data reseed completed successfully!");
    logger.info(`Inserted ${data.pricingCategories.length} categories and ${data.pricingItems.length} items`);

    process.exit(0);
  } catch (error) {
    logger.error("Error reseeding pricing data", error);
    process.exit(1);
  }
}

reseedPricing();

import { db, pricingCategories, pricingItems } from "../index.ts";
import { logger } from "../../lib/logger.ts";

async function verifyPricing() {
  try {
    logger.info("Verifying pricing data...");

    // Fetch all categories
    const categories = await db.select().from(pricingCategories);
    logger.info(`\nFound ${categories.length} pricing categories:`);
    categories.forEach((cat) => {
      logger.info(`  - ${cat.name} (${cat.nameEn}): ${cat.description} (${cat.descriptionEn})`);
    });

    // Fetch sample items from each category
    logger.info(`\nSample pricing items:`);
    const items = await db.select().from(pricingItems).limit(10);
    items.forEach((item) => {
      logger.info(`  - ${item.name} (${item.nameEn}): ${item.price} ${item.unit} (${item.unitEn}) - ${item.durationText} (${item.durationTextEn})`);
    });

    logger.info("\nVerification completed!");
    process.exit(0);
  } catch (error) {
    logger.error("Error verifying pricing data", error);
    process.exit(1);
  }
}

verifyPricing();

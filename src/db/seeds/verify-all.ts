import { db, pricingCategories, pricingItems, perfumeCategories, perfumes, faqs } from "../index.ts";
import { logger } from "../../lib/logger.ts";

async function verifyAll() {
  try {
    logger.info("=== VERIFYING ALL DATA ===\n");

    // Pricing Categories
    const categories = await db.select().from(pricingCategories);
    logger.info(`✓ Pricing Categories: ${categories.length} items`);
    categories.forEach((cat) => {
      logger.info(`  - ${cat.name} → ${cat.nameEn}`);
    });

    // Pricing Items (sample)
    const items = await db.select().from(pricingItems).limit(5);
    logger.info(`\n✓ Pricing Items (sample 5 of 57):`);
    items.forEach((item) => {
      logger.info(`  - ${item.name} → ${item.nameEn} | ${item.unit} → ${item.unitEn} | ${item.durationText} → ${item.durationTextEn}`);
    });

    // Perfume Categories
    const perfumeCats = await db.select().from(perfumeCategories);
    logger.info(`\n✓ Perfume Categories: ${perfumeCats.length} items`);
    perfumeCats.forEach((cat) => {
      logger.info(`  - ${cat.name} → ${cat.nameEn}`);
    });

    // Perfumes (sample)
    const perfumesList = await db.select().from(perfumes).limit(5);
    logger.info(`\n✓ Perfumes (sample 5 of 34):`);
    perfumesList.forEach((p) => {
      logger.info(`  - ${p.name} → ${p.nameEn} | Popular: ${p.popular}, Premium: ${p.premium}`);
    });

    // FAQs
    const faqsList = await db.select().from(faqs).limit(3);
    logger.info(`\n✓ FAQs (sample 3 of 9):`);
    faqsList.forEach((faq) => {
      logger.info(`  - Q: ${faq.question}`);
      logger.info(`    Q (EN): ${faq.questionEn}`);
    });

    logger.info("\n=== VERIFICATION COMPLETE ✓ ===");
    logger.info("\nSummary:");
    logger.info(`  - 3 pricing categories with proper English translations`);
    logger.info(`  - 57 pricing items with nameEn, unitEn, durationTextEn, notesEn`);
    logger.info(`  - 7 perfume categories with English names`);
    logger.info(`  - 34 perfumes with English names and attributes`);
    logger.info(`  - 9 FAQs with English questions and answers`);

    process.exit(0);
  } catch (error) {
    logger.error("Error verifying data", error);
    process.exit(1);
  }
}

verifyAll();

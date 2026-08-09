import { sql } from "drizzle-orm";
import { db } from "../index.ts";
import { logger } from "../../lib/logger.ts";

async function checkSchema() {
  try {
    logger.info("Checking perfumes table schema...");

    const result = await db.execute(sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'perfumes'
      ORDER BY ordinal_position;
    `);

    logger.info("Perfumes table columns:");
    result.rows.forEach((row: any) => {
      logger.info(`  - ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
    });

    process.exit(0);
  } catch (error) {
    logger.error("Error checking schema", error);
    process.exit(1);
  }
}

checkSchema();

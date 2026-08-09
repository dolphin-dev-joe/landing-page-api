import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env.ts";

import * as pricing from "./schema/pricing.ts";
import * as perfumes from "./schema/perfumes.ts";
import * as faqs from "./schema/faqs.ts";
import * as testimonials from "./schema/testimonials.ts";
import * as locations from "./schema/locations.ts";
import * as contacts from "./schema/contacts.ts";
import * as homeSections from "./schema/home_sections.ts";
import * as siteSettings from "./schema/site_settings.ts";
import * as articles from "./schema/articles.ts";

const schema = {
  ...pricing,
  ...perfumes,
  ...faqs,
  ...testimonials,
  ...locations,
  ...contacts,
  ...homeSections,
  ...siteSettings,
  ...articles,
};

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });

export * from "./schema/pricing.ts";
export * from "./schema/perfumes.ts";
export * from "./schema/faqs.ts";
export * from "./schema/testimonials.ts";
export * from "./schema/locations.ts";
export * from "./schema/contacts.ts";
export * from "./schema/home_sections.ts";
export * from "./schema/site_settings.ts";
export * from "./schema/articles.ts";

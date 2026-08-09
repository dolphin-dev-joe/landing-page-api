import { Hono } from "hono";
import { publicController } from "./public.controller.ts";

export const publicRoutes = new Hono().basePath("/api")
  // Get all landing page data (optimized single call)
  .get("/landing-page", (c) => publicController.getLandingPageData(c.req.raw))
  // Pricing endpoints
  .get("/pricing", (c) => publicController.getPricing(c.req.raw))
  // Perfumes endpoints
  .get("/perfumes", (c) => publicController.getPerfumes(c.req.raw))
  // FAQs endpoints
  .get("/faqs", (c) => publicController.getFaqs(c.req.raw))
  // Testimonials endpoints
  .get("/testimonials", (c) => publicController.getTestimonials(c.req.raw))
  // Locations endpoints
  .get("/locations", (c) => publicController.getLocations(c.req.raw))
  // Contacts endpoints (display contact info like whatsapp, instagram, etc.)
  .get("/contacts", (c) => publicController.getContacts(c.req.raw))
  // Home sections endpoints
  .get("/home-sections", (c) => publicController.getHomeSections(c.req.raw))
  // Get specific home section by key
  .get("/home-sections/:sectionKey", (c) =>
    publicController.getHomeSection(c.req.raw, c.req.param("sectionKey"))
  )
  // Site settings endpoints
  .get("/settings", (c) => publicController.getSiteSettings(c.req.raw))
  // Articles endpoints
  .get("/articles", (c) => publicController.getArticles(c.req.raw))
  .get("/articles/:slug", (c) =>
    publicController.getArticle(c.req.raw, c.req.param("slug"))
  );

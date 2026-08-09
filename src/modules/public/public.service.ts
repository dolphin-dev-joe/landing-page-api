import { publicRepo } from "./public.repo.ts";

export class PublicService {
  // Get all data for landing page (optimized single call)
  async getLandingPageData() {
    const [pricing, perfumes, faqs, testimonials, locations, contacts, homeSections, siteSettings] = await Promise.all([
      publicRepo.getAllPricing(),
      publicRepo.getAllPerfumes(),
      publicRepo.getAllFaqs(),
      publicRepo.getAllTestimonials(),
      publicRepo.getAllLocations(),
      publicRepo.getAllContacts(),
      publicRepo.getAllHomeSections(),
      publicRepo.getSiteSettings(),
    ]);

    return {
      pricing,
      perfumes,
      faqs,
      testimonials,
      locations,
      contacts,
      homeSections,
      siteSettings,
    };
  }

  async getPricing() {
    return await publicRepo.getAllPricing();
  }

  async getPerfumes() {
    return await publicRepo.getAllPerfumes();
  }

  async getFaqs() {
    return await publicRepo.getAllFaqs();
  }

  async getTestimonials() {
    return await publicRepo.getAllTestimonials();
  }

  async getLocations() {
    return await publicRepo.getAllLocations();
  }

  async getContacts() {
    return await publicRepo.getAllContacts();
  }

  async getHomeSections() {
    return await publicRepo.getAllHomeSections();
  }

  async getHomeSection(sectionKey: string) {
    return await publicRepo.getHomeSection(sectionKey);
  }

  async getSiteSettings() {
    return await publicRepo.getSiteSettings();
  }

  async getArticles(page: number, limit: number, search?: string) {
    return await publicRepo.getPublishedArticles(page, limit, search);
  }

  async getArticle(slug: string) {
    const article = await publicRepo.getPublishedArticleBySlug(slug);
    if (article) {
      // fire-and-forget — don't block the response
      publicRepo.incrementArticleViews(article.id).catch(() => {});
    }
    return article;
  }
}

export const publicService = new PublicService();

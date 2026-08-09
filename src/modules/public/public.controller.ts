import { publicService } from "./public.service.ts";
import { jsonResponse, errorResponse, HttpStatus } from "../../lib/http.ts";

export class PublicController {
  // Get all data for landing page (single optimized call)
  async getLandingPageData(req: Request): Promise<Response> {
    const data = await publicService.getLandingPageData();
    return jsonResponse(data);
  }

  async getPricing(req: Request): Promise<Response> {
    const data = await publicService.getPricing();
    return jsonResponse(data);
  }

  async getPerfumes(req: Request): Promise<Response> {
    const data = await publicService.getPerfumes();
    return jsonResponse(data);
  }

  async getFaqs(req: Request): Promise<Response> {
    const data = await publicService.getFaqs();
    return jsonResponse(data);
  }

  async getTestimonials(req: Request): Promise<Response> {
    const data = await publicService.getTestimonials();
    return jsonResponse(data);
  }

  async getLocations(req: Request): Promise<Response> {
    const data = await publicService.getLocations();
    return jsonResponse(data);
  }

  async getContacts(req: Request): Promise<Response> {
    const data = await publicService.getContacts();
    return jsonResponse(data);
  }

  async getHomeSections(req: Request): Promise<Response> {
    const data = await publicService.getHomeSections();
    return jsonResponse(data);
  }

  async getHomeSection(req: Request, sectionKey: string): Promise<Response> {
    const data = await publicService.getHomeSection(sectionKey);
    if (!data) {
      return errorResponse("Section not found", HttpStatus.NOT_FOUND);
    }
    return jsonResponse(data);
  }

  async getSiteSettings(req: Request): Promise<Response> {
    const data = await publicService.getSiteSettings();
    return jsonResponse(data);
  }

  async getArticles(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit") || "10")));
    const search = url.searchParams.get("q") || undefined;

    const data = await publicService.getArticles(page, limit, search);
    return jsonResponse(data);
  }

  async getArticle(req: Request, slug: string): Promise<Response> {
    const data = await publicService.getArticle(slug);
    if (!data) {
      return errorResponse("Article not found", HttpStatus.NOT_FOUND);
    }
    return jsonResponse(data);
  }
}

export const publicController = new PublicController();

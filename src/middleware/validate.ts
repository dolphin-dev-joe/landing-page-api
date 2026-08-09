import { z, ZodSchema } from "zod";
import { ValidationError } from "../lib/errors.ts";

export async function validateBody<T>(req: Request, schema: ZodSchema<T>): Promise<T> {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError("Validation failed", error.errors);
    }
    throw new ValidationError("Invalid request body");
  }
}

export function validateQuery<T>(url: URL, schema: ZodSchema<T>): T {
  try {
    const params = Object.fromEntries(url.searchParams.entries());
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError("Validation failed", error.errors);
    }
    throw new ValidationError("Invalid query parameters");
  }
}

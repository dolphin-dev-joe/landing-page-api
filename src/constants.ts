export const ROLES = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Insufficient permissions",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation failed",
  INTERNAL_ERROR: "Internal server error",
} as const;

export const CACHE_DURATION = {
  SHORT: 60,
  MEDIUM: 300,
  LONG: 3600,
  DAY: 86400,
} as const;

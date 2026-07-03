const HTTP_STATUS = Object.freeze({
  // 2xx Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // 4xx Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
});

const ERROR_CODES = Object.freeze({
  // Generic (safe fallback)
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",

  // Validation (safe to expose)
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",

  // Auth (intentionally vague to avoid leaking info)
  AUTH_FAILED: "AUTH_FAILED", // covers invalid email/password
  UNAUTHORIZED_ACCESS: "UNAUTHORIZED_ACCESS",
  ACCESS_DENIED: "ACCESS_DENIED",
  TOKEN_INVALID: "TOKEN_INVALID_OR_EXPIRED",


  // Resource (avoid confirming existence when sensitive)
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",

  // Conflict
  RESOURCE_ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS",

  // Rate limiting / abuse protection
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",

  // File handling (safe, generic)
  INVALID_FILE_TYPE: "INVALID_FILE_TYPE",
  FILE_TOO_LARGE: "FILE_TOO_LARGE",

  // External / dependency
  EXTERNAL_SERVICE_FAILURE: "EXTERNAL_SERVICE_FAILURE",
});

module.exports = {
  HTTP_STATUS,
  ERROR_CODES,
};

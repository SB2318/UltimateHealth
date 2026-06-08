/**
 * UltimateHealth Security Module - Main Export
 * 
 * Production-grade security features including:
 * - JWT authentication with refresh tokens
 * - Role-Based Access Control (RBAC)
 * - Audit logging
 * - API rate limiting
 * - Input validation & sanitization
 * - Security headers
 */

const jwtConfig = require('./config/jwt.config');
const rbacConfig = require('./config/rbac.config');

// Services
const jwtService = require('./services/jwt.service');
const auditService = require('./services/audit.service');

// Middleware
const authMiddleware = require('./middleware/auth.middleware');
const rbacMiddleware = require('./middleware/rbac.middleware');
const rateLimiterMiddleware = require('./middleware/rateLimiter.middleware');
const validationMiddleware = require('./middleware/validation.middleware');

// Models
const RefreshToken = require('./models/refresh-token.model');
const AuditLog = require('./models/audit-log.model');

// Routes
const authRoutes = require('./routes/auth.routes');
const auditRoutes = require('./routes/audit.routes');

/**
 * Initialize security module
 * @param {Object} app - Express app instance
 */
const initializeSecurity = (app) => {
  // Apply security headers to all routes
  app.use(rateLimiterMiddleware.securityHeaders);

  // Apply general rate limiting
  app.use(rateLimiterMiddleware.generalRateLimiter);

  // Mount auth routes
  app.use('/api/auth', authRoutes);

  // Mount audit routes (admin only)
  app.use('/api/audit-logs', auditRoutes);
};

/**
 * Get security configuration summary
 */
const getSecurityConfig = () => ({
  jwt: {
    accessTokenExpiry: jwtConfig.accessToken.expiresIn,
    refreshTokenExpiry: jwtConfig.refreshToken.expiresIn,
    rotationEnabled: jwtConfig.security.enableRotation,
  },
  rbac: {
    roles: Object.keys(rbacConfig.roles),
    permissionsConfigured: Object.keys(rbacConfig.permissions).length,
  },
  rateLimits: {
    login: '5 requests per 15 minutes',
    register: '5 requests per hour',
    aiChat: '50 requests per hour',
    passwordReset: '3 requests per hour',
  },
});

module.exports = {
  // Configuration
  jwtConfig,
  rbacConfig,

  // Services
  jwtService,
  auditService,

  // Middleware
  authenticate: authMiddleware.authenticate,
  optionalAuth: authMiddleware.optionalAuth,
  requireRole: authMiddleware.requireRole,
  requirePermission: authMiddleware.requirePermission,
  getPermissionsForRole: authMiddleware.getPermissionsForRole,

  // RBAC Middleware
  requireAdmin: rbacMiddleware.requireAdmin,
  requireReviewer: rbacMiddleware.requireReviewer,
  requireAuthor: rbacMiddleware.requireAuthor,
  requireAuth: rbacMiddleware.requireAuth,
  requirePermissions: rbacMiddleware.requirePermissions,
  requireRoles: rbacMiddleware.requireRoles,
  requireOwnership: rbacMiddleware.requireOwnership,
  canPerformAction: rbacMiddleware.canPerformAction,
  hasRoleOrHigher: rbacMiddleware.hasRoleOrHigher,

  // Rate Limiting
  loginRateLimiter: rateLimiterMiddleware.loginRateLimiter,
  registerRateLimiter: rateLimiterMiddleware.registerRateLimiter,
  aiChatRateLimiter: rateLimiterMiddleware.aiChatRateLimiter,
  passwordResetRateLimiter: rateLimiterMiddleware.passwordResetRateLimiter,
  articleCreationRateLimiter: rateLimiterMiddleware.articleCreationRateLimiter,
  commentRateLimiter: rateLimiterMiddleware.commentRateLimiter,
  securityHeaders: rateLimiterMiddleware.securityHeaders,

  // Validation
  ...validationMiddleware,

  // Models
  RefreshToken,
  AuditLog,

  // Routes
  authRoutes,
  auditRoutes,

  // Utilities
  initializeSecurity,
  getSecurityConfig,
};
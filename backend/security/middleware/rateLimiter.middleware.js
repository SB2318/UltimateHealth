/**
 * Rate Limiting Middleware - API Abuse Protection
 * 
 * Implements rate limiting for:
 * - Login endpoint: 5 requests per 15 minutes
 * - Registration: 5 requests per hour
 * - AI chat: 50 requests per hour
 * - Password reset: 3 requests per hour
 * - General API: configurable per role
 */

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AuditLog = require('../models/audit-log.model');

/**
 * Login rate limiter - 5 requests per 15 minutes per IP
 */
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count all attempts
  keyGenerator: (req) => {
    // Use IP + email combination for better protection
    return `${req.ip}-${req.body?.email || 'unknown'}`;
  },
  handler: async (req, res, next, options) => {
    // Log rate limit event
    await AuditLog.logSecurityEvent({
      userId: null,
      userEmail: req.body?.email || 'unknown',
      role: 'guest',
      action: 'rate_limit_login',
      endpoint: '/auth/login',
      method: 'POST',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: false,
      errorMessage: 'Rate limit exceeded for login',
    });
    res.status(429).json(options.message);
  },
});

/**
 * Registration rate limiter - 5 requests per hour per IP
 */
const registerRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per window
  message: {
    success: false,
    message: 'Too many registration attempts. Please try again after an hour.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip;
  },
  handler: async (req, res, next, options) => {
    await AuditLog.logSecurityEvent({
      userId: null,
      userEmail: req.body?.email || 'unknown',
      role: 'guest',
      action: 'rate_limit_register',
      endpoint: '/auth/register',
      method: 'POST',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: false,
      errorMessage: 'Rate limit exceeded for registration',
    });
    res.status(429).json(options.message);
  },
});

/**
 * AI Chat rate limiter - 50 requests per hour per user
 */
const aiChatRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 requests per window
  message: {
    success: false,
    message: 'AI chat rate limit exceeded. Please try again after an hour.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
  skip: (req) => {
    // Skip rate limiting for admin and reviewer roles
    return req.user && ['admin', 'reviewer'].includes(req.user.role);
  },
});

/**
 * Password reset rate limiter - 3 requests per hour per email
 */
const passwordResetRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 requests per window
  message: {
    success: false,
    message: 'Too many password reset attempts. Please try again after an hour.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return `${req.ip}-${req.body?.email || 'unknown'}`;
  },
  handler: async (req, res, next, options) => {
    await AuditLog.logSecurityEvent({
      userId: null,
      userEmail: req.body?.email || 'unknown',
      role: 'guest',
      action: 'rate_limit_password_reset',
      endpoint: '/auth/forgot-password',
      method: 'POST',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: false,
      errorMessage: 'Rate limit exceeded for password reset',
    });
    res.status(429).json(options.message);
  },
});

/**
 * Article creation rate limiter - 10 requests per hour per user
 */
const articleCreationRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per window
  message: {
    success: false,
    message: 'Too many article creation attempts. Please try again after an hour.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});

/**
 * General API rate limiter - based on role
 */
const generalRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Default 100 requests per hour
  message: {
    success: false,
    message: 'API rate limit exceeded. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
  skip: (req) => {
    // Skip rate limiting for admin role
    return req.user && req.user.role === 'admin';
  },
  // Dynamic max based on role
  max: (req) => {
    if (!req.user) return 50; // Guests
    switch (req.user.role) {
      case 'admin': return 10000;
      case 'reviewer': return 2000;
      case 'author': return 1000;
      case 'user': return 500;
      default: return 100;
    }
  },
});

/**
 * Comment rate limiter - 5 requests per minute per user
 */
const commentRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: {
    success: false,
    message: 'Too many comment submissions. Please slow down.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(429).json(options.message);
  },
});

/**
 * Security headers middleware using Helmet
 */
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://uhsocial.in", "https://api.vultrinference.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

/**
 * CORS configuration
 */
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://uhsocial.in', 'https://www.uhsocial.in'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-Fingerprint', 'X-Requested-With'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

module.exports = {
  loginRateLimiter,
  registerRateLimiter,
  aiChatRateLimiter,
  passwordResetRateLimiter,
  articleCreationRateLimiter,
  generalRateLimiter,
  commentRateLimiter,
  securityHeaders,
  corsOptions,
};
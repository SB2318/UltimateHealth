
const rateLimitResponse = (code, message) => ({
  success: false,
  error: { code, message },
});
const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

const baseConfig = {
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => {
    return req.userId
      ? `user:${req.userId}`
      : `ip:${ipKeyGenerator(req.ip)}`;
  },

  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again later.',
      },
    });
  },
};

/**
 * Global limiter - whole app
 */
const globalLimiter = rateLimit({
  ...baseConfig,
  windowMs: 15 * 60 * 1000,
  max: 300, // 300 requests / 15 min
});


/**
 * Login limiter
 * Prevent brute force
 */
const loginLimiter = rateLimit({
  ...baseConfig,
  windowMs: 15 * 60 * 1000, // 15 min
  keyGenerator: (req) => `ip:${ipKeyGenerator(req.ip)}`, // expilicitly use IP for login attempts, as userId is not available before login
  max: 5,
  skipSuccessfulRequests: true,
});

/**
 * Register limiter
 * Prevent account spam
 */
const registerLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyGenerator: (req) => `ip:${ipKeyGenerator(req.ip)}`, // use IP for registration attempts, as userId is not available before registration
  max: 5,
});

/**
 * Forgot password limiter
 * Prevent reset abuse
 */
const forgotPasswordLimiter = rateLimit({
  ...baseConfig,
  windowMs: 60 * 60 * 1000, // 1 hour
  keyGenerator: (req) => `ip:${ipKeyGenerator(req.ip)}`, // use IP for forgot password attempts, as userId is not available before reset
  max: 3,
});

/**
 * OTP verification limiter
 * Prevent OTP brute force
 */
const otpLimiter = rateLimit({
  ...baseConfig,
  windowMs: 10 * 60 * 1000, // 10 min
  keyGenerator: (req) => `ip:${ipKeyGenerator(req.ip)}`, // use IP for OTP attempts, as userId is not available before verification
  max: 5,
  skipSuccessfulRequests: true,
});

/**
 * Resend OTP limiter
 * Prevent spam sending
 */
const resendOtpLimiter = rateLimit({
  ...baseConfig,
  windowMs: 10 * 60 * 1000, // 10 min
  keyGenerator: (req) => `ip:${ipKeyGenerator(req.ip)}`, // use IP for resend OTP attempts
  max: 3,
});


/**
 * User actions (POST/PUT/DELETE)
 */
const mutationLimiter = rateLimit({
  ...baseConfig,
  windowMs: 5 * 60 * 1000,
  max: 30,
});

/**
 * Search endpoints
 */
const searchLimiter = rateLimit({
  ...baseConfig,
  windowMs: 1 * 60 * 1000,
  max: 20,
});

/**
 * File uploads
 */
const uploadLimiter = rateLimit({
  ...baseConfig,
  windowMs: 10 * 60 * 1000,
  max: 10,
});

/**
 * download/report generation
 */
const heavyOperationLimiter = rateLimit({
  ...baseConfig,
  windowMs: 30 * 60 * 1000,
  max: 5,
});

module.exports = {
  globalLimiter,
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
  otpLimiter,
  resendOtpLimiter,
  mutationLimiter,
  searchLimiter,
  uploadLimiter,
  heavyOperationLimiter,
};
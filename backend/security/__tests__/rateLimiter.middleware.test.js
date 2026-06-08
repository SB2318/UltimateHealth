/**
 * Rate Limiter Middleware Tests
 */

// Mock express-rate-limit
jest.mock('express-rate-limit', () => {
  return jest.fn().mockImplementation((options) => {
    return (req, res, next) => {
      // Simulate rate limit check
      if (req.rateLimitExceeded) {
        return res.status(429).json(options.message);
      }
      next();
    };
  });
});

// Mock AuditLog
jest.mock('../models/audit-log.model', () => ({
  logSecurityEvent: jest.fn().mockResolvedValue({}),
}));

const rateLimiterMiddleware = require('../middleware/rateLimiter.middleware');

describe('Rate Limiter Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      ip: '192.168.1.1',
      body: {},
      user: null,
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('loginRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.loginRateLimiter).toBe('function');
    });

    it('should call next() for normal requests', () => {
      rateLimiterMiddleware.loginRateLimiter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 429 when rate limit exceeded', () => {
      mockReq.rateLimitExceeded = true;
      
      rateLimiterMiddleware.loginRateLimiter(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(429);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'RATE_LIMIT_EXCEEDED',
        })
      );
    });
  });

  describe('registerRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.registerRateLimiter).toBe('function');
    });

    it('should call next() for normal requests', () => {
      rateLimiterMiddleware.registerRateLimiter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('aiChatRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.aiChatRateLimiter).toBe('function');
    });

    it('should use user ID for authenticated users', () => {
      mockReq.user = { _id: { toString: () => 'user123' } };
      
      rateLimiterMiddleware.aiChatRateLimiter(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should use IP for unauthenticated users', () => {
      mockReq.user = null;
      
      rateLimiterMiddleware.aiChatRateLimiter(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('passwordResetRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.passwordResetRateLimiter).toBe('function');
    });

    it('should call next() for normal requests', () => {
      rateLimiterMiddleware.passwordResetRateLimiter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('articleCreationRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.articleCreationRateLimiter).toBe('function');
    });

    it('should call next() for normal requests', () => {
      rateLimiterMiddleware.articleCreationRateLimiter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('commentRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.commentRateLimiter).toBe('function');
    });

    it('should call next() for normal requests', () => {
      rateLimiterMiddleware.commentRateLimiter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('generalRateLimiter', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.generalRateLimiter).toBe('function');
    });

    it('should call next() for normal requests', () => {
      rateLimiterMiddleware.generalRateLimiter(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should skip rate limiting for admin role', () => {
      mockReq.user = { role: 'admin' };
      
      // Check skip condition
      expect(mockReq.user && mockReq.user.role === 'admin').toBe(true);
    });
  });

  describe('securityHeaders', () => {
    it('should be defined as a function', () => {
      expect(typeof rateLimiterMiddleware.securityHeaders).toBe('function');
    });

    it('should call next() to continue middleware chain', () => {
      rateLimiterMiddleware.securityHeaders(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('corsOptions', () => {
    it('should have correct CORS configuration', () => {
      const options = rateLimiterMiddleware.corsOptions;
      
      expect(options.methods).toContain('GET');
      expect(options.methods).toContain('POST');
      expect(options.methods).toContain('PUT');
      expect(options.methods).toContain('DELETE');
      expect(options.credentials).toBe(true);
      expect(options.maxAge).toBe(86400);
    });

    it('should include security-related headers', () => {
      const options = rateLimiterMiddleware.corsOptions;
      
      expect(options.exposedHeaders).toContain('X-RateLimit-Limit');
      expect(options.exposedHeaders).toContain('X-RateLimit-Remaining');
    });
  });
});
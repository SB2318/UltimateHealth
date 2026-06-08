/**
 * RBAC Middleware Tests
 */

// Mock dependencies
jest.mock('../config/rbac.config', () => ({
  roles: {
    guest: 0,
    user: 1,
    author: 2,
    reviewer: 3,
    admin: 4,
  },
  permissions: {
    guest: ['read_articles', 'read_podcasts'],
    user: ['read_articles', 'read_podcasts', 'comment', 'save_articles'],
    author: ['read_articles', 'read_podcasts', 'comment', 'save_articles', 'create_articles', 'edit_own_articles'],
    reviewer: ['read_articles', 'read_podcasts', 'comment', 'save_articles', 'create_articles', 'edit_own_articles', 'review_articles', 'approve_articles'],
    admin: ['full_access'],
  },
  resourcePermissions: {
    articles: {
      create: ['author', 'reviewer', 'admin'],
      read: ['guest', 'user', 'author', 'reviewer', 'admin'],
      update: ['author', 'reviewer', 'admin'],
      delete: ['author', 'admin'],
      review: ['reviewer', 'admin'],
    },
  },
}));

// Mock AuditLog
jest.mock('../models/audit-log.model', () => ({
  create: jest.fn().mockResolvedValue({}),
}));

const {
  createRbacMiddleware,
  requireAdmin,
  requireReviewer,
  requireAuthor,
  requireAuth,
  requirePermissions,
  requireRoles,
  canPerformAction,
  hasRoleOrHigher,
} = require('../middleware/rbac.middleware');

describe('RBAC Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      user: null,
      ip: '192.168.1.1',
      originalUrl: '/api/articles',
      method: 'GET',
      get: jest.fn().mockReturnValue('Mozilla/5.0'),
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  describe('createRbacMiddleware', () => {
    it('should deny access if no user is authenticated', async () => {
      const middleware = createRbacMiddleware({ allowedRoles: ['admin'] });
      
      await middleware(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Authentication required',
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should deny access if user role is not in allowedRoles', async () => {
      mockReq.user = { _id: '123', email: 'test@example.com', role: 'user' };
      
      const middleware = createRbacMiddleware({ allowedRoles: ['admin'] });
      
      await middleware(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'You do not have permission to access this resource',
      });
    });

    it('should allow access if user role is in allowedRoles', async () => {
      mockReq.user = { _id: '123', email: 'test@example.com', role: 'admin' };
      
      const middleware = createRbacMiddleware({ allowedRoles: ['admin'] });
      
      await middleware(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
      expect(mockReq.rbac).toBeDefined();
      expect(mockReq.rbac.role).toBe('admin');
    });

    it('should deny access if user lacks required permissions', async () => {
      mockReq.user = { _id: '123', email: 'test@example.com', role: 'user' };
      
      const middleware = createRbacMiddleware({ 
        requiredPermissions: ['create_articles', 'review_articles'] 
      });
      
      await middleware(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });

    it('should allow access if user has required permissions', async () => {
      mockReq.user = { _id: '123', email: 'test@example.com', role: 'author' };
      
      const middleware = createRbacMiddleware({ 
        requiredPermissions: ['create_articles'] 
      });
      
      await middleware(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow admin with full_access permission to bypass permission checks', async () => {
      mockReq.user = { _id: '123', email: 'test@example.com', role: 'admin' };
      
      const middleware = createRbacMiddleware({ 
        requiredPermissions: ['some_random_permission'] 
      });
      
      await middleware(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('requireAdmin', () => {
    it('should allow admin users', async () => {
      mockReq.user = { _id: '123', email: 'admin@example.com', role: 'admin' };
      
      await requireAdmin(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny non-admin users', async () => {
      mockReq.user = { _id: '123', email: 'user@example.com', role: 'user' };
      
      await requireAdmin(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  describe('requireReviewer', () => {
    it('should allow reviewer users', async () => {
      mockReq.user = { _id: '123', email: 'reviewer@example.com', role: 'reviewer' };
      
      await requireReviewer(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow admin users', async () => {
      mockReq.user = { _id: '123', email: 'admin@example.com', role: 'admin' };
      
      await requireReviewer(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny regular users', async () => {
      mockReq.user = { _id: '123', email: 'user@example.com', role: 'user' };
      
      await requireReviewer(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  describe('requireAuthor', () => {
    it('should allow author users', async () => {
      mockReq.user = { _id: '123', email: 'author@example.com', role: 'author' };
      
      await requireAuthor(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow reviewer users', async () => {
      mockReq.user = { _id: '123', email: 'reviewer@example.com', role: 'reviewer' };
      
      await requireAuthor(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny regular users', async () => {
      mockReq.user = { _id: '123', email: 'user@example.com', role: 'user' };
      
      await requireAuthor(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  describe('requireAuth', () => {
    it('should allow any authenticated user', async () => {
      mockReq.user = { _id: '123', email: 'user@example.com', role: 'user' };
      
      await requireAuth(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny unauthenticated users', async () => {
      await requireAuth(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
  });

  describe('requirePermissions', () => {
    it('should allow user with specific permission', () => {
      mockReq.user = { _id: '123', email: 'user@example.com', role: 'user' };
      
      const middleware = requirePermissions('comment');
      
      middleware(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny user without specific permission', () => {
      mockReq.user = { _id: '123', email: 'guest@example.com', role: 'guest' };
      
      const middleware = requirePermissions('comment');
      
      middleware(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  describe('requireRoles', () => {
    it('should allow user with one of the specified roles', () => {
      mockReq.user = { _id: '123', email: 'author@example.com', role: 'author' };
      
      const middleware = requireRoles('author', 'reviewer', 'admin');
      
      middleware(mockReq, mockRes, mockNext);
      
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny user without any of the specified roles', () => {
      mockReq.user = { _id: '123', email: 'user@example.com', role: 'user' };
      
      const middleware = requireRoles('author', 'reviewer', 'admin');
      
      middleware(mockReq, mockRes, mockNext);
      
      expect(mockRes.status).toHaveBeenCalledWith(403);
    });
  });

  describe('canPerformAction', () => {
    it('should return true for allowed role-action combination', () => {
      const result = canPerformAction('author', 'create', 'articles');
      expect(result).toBe(true);
    });

    it('should return false for disallowed role-action combination', () => {
      const result = canPerformAction('user', 'create', 'articles');
      expect(result).toBe(false);
    });

    it('should return false for non-existent resource', () => {
      const result = canPerformAction('admin', 'create', 'nonexistent');
      expect(result).toBe(false);
    });

    it('should return false for non-existent action', () => {
      const result = canPerformAction('admin', 'nonexistent', 'articles');
      expect(result).toBe(false);
    });
  });

  describe('hasRoleOrHigher', () => {
    it('should return true for same role', () => {
      const result = hasRoleOrHigher('admin', 'admin');
      expect(result).toBe(true);
    });

    it('should return true for higher role', () => {
      const result = hasRoleOrHigher('admin', 'user');
      expect(result).toBe(true);
    });

    it('should return false for lower role', () => {
      const result = hasRoleOrHigher('user', 'admin');
      expect(result).toBe(false);
    });

    it('should return false for invalid role', () => {
      const result = hasRoleOrHigher('guest', 'admin');
      expect(result).toBe(false);
    });
  });
});
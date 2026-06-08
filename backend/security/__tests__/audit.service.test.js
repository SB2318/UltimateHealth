/**
 * Audit Service Tests
 */

// Mock dependencies
jest.mock('../models/audit-log.model', () => ({
  create: jest.fn(),
  logSecurityEvent: jest.fn(),
  logAdminAction: jest.fn(),
  logAuthEvent: jest.fn(),
  getUserActivity: jest.fn(),
  getSecurityIncidents: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
  deleteMany: jest.fn(),
}));

jest.mock('../../models/user.model', () => ({
  findById: jest.fn(),
}));

const auditService = require('../services/audit.service');
const AuditLog = require('../models/audit-log.model');

describe('Audit Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logSecurityEvent', () => {
    it('should log a security event', async () => {
      const mockData = {
        userId: 'user123',
        userEmail: 'test@example.com',
        role: 'user',
        action: 'suspicious_login',
        ipAddress: '192.168.1.1',
        success: false,
      };

      AuditLog.logSecurityEvent.mockResolvedValue({ _id: 'log123' });

      const result = await auditService.logSecurityEvent(mockData);

      expect(AuditLog.logSecurityEvent).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ _id: 'log123' });
    });
  });

  describe('logAdminAction', () => {
    it('should log an admin action', async () => {
      const mockData = {
        userId: 'admin123',
        userEmail: 'admin@example.com',
        role: 'admin',
        action: 'user_ban',
        ipAddress: '192.168.1.1',
        success: true,
      };

      AuditLog.logAdminAction.mockResolvedValue({ _id: 'log456' });

      const result = await auditService.logAdminAction(mockData);

      expect(AuditLog.logAdminAction).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ _id: 'log456' });
    });
  });

  describe('logAuthEvent', () => {
    it('should log an authentication event', async () => {
      const mockData = {
        userId: 'user123',
        userEmail: 'test@example.com',
        role: 'user',
        action: 'login_success',
        ipAddress: '192.168.1.1',
        success: true,
      };

      AuditLog.logAuthEvent.mockResolvedValue({ _id: 'log789' });

      const result = await auditService.logAuthEvent(mockData);

      expect(AuditLog.logAuthEvent).toHaveBeenCalledWith(mockData);
      expect(result).toEqual({ _id: 'log789' });
    });
  });

  describe('logArticleAction', () => {
    it('should log an article action with resource info', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'author@example.com',
        role: 'author',
      };

      const mockArticle = {
        _id: 'article123',
        title: 'Test Article',
        status: 'published',
      };

      const mockReq = {
        originalUrl: '/api/articles/article123',
        method: 'POST',
        ip: '192.168.1.1',
        get: jest.fn().mockReturnValue('Mozilla/5.0'),
      };

      AuditLog.create.mockResolvedValue({ _id: 'log101' });

      await auditService.logArticleAction(mockUser, 'article_created', mockArticle, mockReq);

      expect(AuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user123',
          userEmail: 'author@example.com',
          role: 'author',
          action: 'article_created',
          category: 'article',
          resourceType: 'article',
          resourceId: 'article123',
          metadata: expect.objectContaining({
            articleTitle: 'Test Article',
            articleStatus: 'published',
          }),
        })
      );
    });
  });

  describe('logPodcastAction', () => {
    it('should log a podcast action with resource info', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'author@example.com',
        role: 'author',
      };

      const mockPodcast = {
        _id: 'podcast123',
        title: 'Test Podcast',
        status: 'published',
      };

      const mockReq = {
        originalUrl: '/api/podcasts/podcast123',
        method: 'POST',
        ip: '192.168.1.1',
        get: jest.fn().mockReturnValue('Mozilla/5.0'),
      };

      AuditLog.create.mockResolvedValue({ _id: 'log102' });

      await auditService.logPodcastAction(mockUser, 'podcast_created', mockPodcast, mockReq);

      expect(AuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user123',
          category: 'podcast',
          resourceType: 'podcast',
          resourceId: 'podcast123',
        })
      );
    });
  });

  describe('logAuthorizationFailure', () => {
    it('should log a failed authorization attempt', async () => {
      const mockUser = {
        _id: 'user123',
        email: 'test@example.com',
        role: 'user',
      };

      const mockReq = {
        originalUrl: '/api/admin/users',
        method: 'DELETE',
        ip: '192.168.1.1',
        get: jest.fn().mockReturnValue('Mozilla/5.0'),
      };

      AuditLog.create.mockResolvedValue({ _id: 'log103' });

      await auditService.logAuthorizationFailure(mockUser, 'admin_access_denied', mockReq, 'Not an admin');

      expect(AuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user123',
          action: 'admin_access_denied',
          category: 'authorization',
          success: false,
          errorMessage: 'Not an admin',
        })
      );
    });

    it('should handle anonymous users', async () => {
      const mockReq = {
        originalUrl: '/api/admin/users',
        method: 'DELETE',
        ip: '192.168.1.1',
        get: jest.fn().mockReturnValue('Mozilla/5.0'),
      };

      AuditLog.create.mockResolvedValue({ _id: 'log104' });

      await auditService.logAuthorizationFailure(null, 'admin_access_denied', mockReq, 'Not authenticated');

      expect(AuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: null,
          userEmail: 'anonymous',
          role: 'guest',
        })
      );
    });
  });

  describe('getUserActivity', () => {
    it('should return user activity timeline', async () => {
      const mockActivity = [
        { action: 'login_success', timestamp: new Date() },
        { action: 'article_created', timestamp: new Date() },
      ];

      AuditLog.getUserActivity.mockResolvedValue(mockActivity);

      const result = await auditService.getUserActivity('user123', { limit: 10 });

      expect(AuditLog.getUserActivity).toHaveBeenCalledWith('user123', { limit: 10 });
      expect(result).toEqual(mockActivity);
    });
  });

  describe('getSecurityIncidents', () => {
    it('should return security incidents', async () => {
      const mockIncidents = [
        { action: 'brute_force_attempt', success: false },
        { action: 'xss_attempt', success: false },
      ];

      AuditLog.getSecurityIncidents.mockResolvedValue(mockIncidents);

      const result = await auditService.getSecurityIncidents({ limit: 100 });

      expect(AuditLog.getSecurityIncidents).toHaveBeenCalledWith({ limit: 100 });
      expect(result).toEqual(mockIncidents);
    });
  });

  describe('searchLogs', () => {
    it('should search logs with criteria and return pagination', async () => {
      const mockLogs = [
        { action: 'login_success', userId: 'user123' },
        { action: 'article_created', userId: 'user123' },
      ];

      AuditLog.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              populate: jest.fn().mockResolvedValue(mockLogs),
            }),
          }),
        }),
      });
      AuditLog.countDocuments.mockResolvedValue(50);

      const result = await auditService.searchLogs({
        userId: 'user123',
        action: 'login',
        page: 1,
        limit: 10,
      });

      expect(result.logs).toEqual(mockLogs);
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 50,
        pages: 5,
      });
    });
  });

  describe('generateSecurityReport', () => {
    it('should generate security report with statistics', async () => {
      AuditLog.countDocuments
        .mockResolvedValueOnce(100)  // total events
        .mockResolvedValueOnce(10);   // failed events

      AuditLog.aggregate
        .mockResolvedValueOnce([{ _id: 'login_failed', count: 5 }])  // by action
        .mockResolvedValueOnce([{ _id: '192.168.1.1', count: 3 }])  // top IPs
        .mockResolvedValueOnce([{ _id: 'user123', count: 20 }]);    // top users

      const report = await auditService.generateSecurityReport({
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      });

      expect(report.summary).toEqual({
        totalEvents: 100,
        failedEvents: 10,
        successRate: '90.00',
      });
      expect(report.generatedAt).toBeDefined();
    });
  });

  describe('cleanupOldLogs', () => {
    it('should delete logs older than specified days', async () => {
      AuditLog.deleteMany.mockResolvedValue({ deletedCount: 1000 });

      const result = await auditService.cleanupOldLogs(365);

      expect(AuditLog.deleteMany).toHaveBeenCalled();
      expect(result.deletedCount).toBe(1000);
    });
  });
});
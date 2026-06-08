/**
 * Audit Logging Service - Security Event Tracking
 * 
 * Features:
 * - Log security-sensitive actions
 * - Track user activity
 * - Admin action monitoring
 * - Searchable audit trail
 */

const AuditLog = require('../models/audit-log.model');
const User = require('../../models/user.model');

class AuditService {
  /**
   * Log a security event
   * @param {Object} data - Audit log data
   */
  async logSecurityEvent(data) {
    return AuditLog.logSecurityEvent(data);
  }

  /**
   * Log an admin action
   * @param {Object} data - Audit log data
   */
  async logAdminAction(data) {
    return AuditLog.logAdminAction(data);
  }

  /**
   * Log an authentication event
   * @param {Object} data - Audit log data
   */
  async logAuthEvent(data) {
    return AuditLog.logAuthEvent(data);
  }

  /**
   * Log article action
   * @param {Object} user - User object
   * @param {string} action - Action type
   * @param {Object} article - Article object
   * @param {Object} req - Express request object
   */
  async logArticleAction(user, action, article, req) {
    return AuditLog.create({
      userId: user._id,
      userEmail: user.email,
      role: user.role,
      action,
      category: 'article',
      endpoint: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: true,
      resourceType: 'article',
      resourceId: article._id,
      metadata: {
        articleTitle: article.title,
        articleStatus: article.status,
      },
    });
  }

  /**
   * Log podcast action
   * @param {Object} user - User object
   * @param {string} action - Action type
   * @param {Object} podcast - Podcast object
   * @param {Object} req - Express request object
   */
  async logPodcastAction(user, action, podcast, req) {
    return AuditLog.create({
      userId: user._id,
      userEmail: user.email,
      role: user.role,
      action,
      category: 'podcast',
      endpoint: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: true,
      resourceType: 'podcast',
      resourceId: podcast._id,
      metadata: {
        podcastTitle: podcast.title,
        podcastStatus: podcast.status,
      },
    });
  }

  /**
   * Log failed authorization attempt
   * @param {Object} user - User object (if authenticated)
   * @param {string} action - Action attempted
   * @param {Object} req - Express request object
   * @param {string} reason - Reason for denial
   */
  async logAuthorizationFailure(user, action, req, reason) {
    return AuditLog.create({
      userId: user?._id || null,
      userEmail: user?.email || 'anonymous',
      role: user?.role || 'guest',
      action,
      category: 'authorization',
      endpoint: req.originalUrl,
      method: req.method,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: false,
      errorMessage: reason,
    });
  }

  /**
   * Get user activity timeline
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   */
  async getUserActivity(userId, options = {}) {
    return AuditLog.getUserActivity(userId, options);
  }

  /**
   * Get security incidents
   * @param {Object} options - Query options
   */
  async getSecurityIncidents(options = {}) {
    return AuditLog.getSecurityIncidents(options);
  }

  /**
   * Get admin action logs
   * @param {Object} options - Query options
   */
  async getAdminLogs(options = {}) {
    const { limit = 100, startDate, endDate } = options;
    
    const query = { category: 'admin' };
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    return AuditLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'user_handle email');
  }

  /**
   * Get login history for a user
   * @param {string} userId - User ID
   * @param {number} limit - Maximum records
   */
  async getLoginHistory(userId, limit = 20) {
    return AuditLog.find({
      userId,
      category: 'authentication',
      action: { $in: ['login_success', 'login_failed'] },
    })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  /**
   * Search audit logs
   * @param {Object} criteria - Search criteria
   */
  async searchLogs(criteria = {}) {
    const {
      userId,
      role,
      action,
      category,
      startDate,
      endDate,
      ipAddress,
      success,
      page = 1,
      limit = 50,
    } = criteria;

    const query = {};

    if (userId) query.userId = userId;
    if (role) query.role = role;
    if (action) query.action = { $regex: action, $options: 'i' };
    if (category) query.category = category;
    if (ipAddress) query.ipAddress = ipAddress;
    if (typeof success === 'boolean') query.success = success;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      AuditLog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'user_handle email'),
      AuditLog.countDocuments(query),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Generate security report
   * @param {Object} options - Report options
   */
  async generateSecurityReport(options = {}) {
    const { startDate, endDate } = options;
    
    const query = { category: 'security' };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Get statistics
    const [totalEvents, failedEvents, byAction] = await Promise.all([
      AuditLog.countDocuments(query),
      AuditLog.countDocuments({ ...query, success: false }),
      AuditLog.aggregate([
        { $match: query },
        { $group: { _id: '$action', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    // Get top offending IPs
    const topOffendingIPs = await AuditLog.aggregate([
      { $match: { ...query, success: false } },
      { $group: { _id: '$ipAddress', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Get most active users (for unusual activity detection)
    const mostActiveUsers = await AuditLog.aggregate([
      { $match: query },
      { $group: { _id: '$userId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    return {
      summary: {
        totalEvents,
        failedEvents,
        successRate: totalEvents > 0 ? ((totalEvents - failedEvents) / totalEvents * 100).toFixed(2) : 100,
      },
      byAction,
      topOffendingIPs,
      mostActiveUsers,
      generatedAt: new Date(),
    };
  }

  /**
   * Clean up old audit logs (for maintenance)
   * @param {number} daysOld - Delete logs older than this many days
   */
  async cleanupOldLogs(daysOld = 365) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    return AuditLog.deleteMany({
      createdAt: { $lt: cutoffDate },
    });
  }
}

module.exports = new AuditService();
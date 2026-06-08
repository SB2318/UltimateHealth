/**
 * Audit Log Routes - Security Event Search and Reporting
 * 
 * Provides endpoints for:
 * - Searching audit logs
 * - Viewing security incidents
 * - Admin action monitoring
 * - Generating security reports
 */

const express = require('express');
const router = express.Router();
const auditService = require('../services/audit.service');
const { authenticate } = require('../middleware/auth.middleware');
const { requireRoles } = require('../middleware/rbac.middleware');
const { validatePagination, handleValidationErrors } = require('../middleware/validation.middleware');

/**
 * GET /api/audit-logs
 * Search audit logs (admin only)
 */
router.get('/',
  authenticate,
  requireRoles('admin', 'reviewer'),
  validatePagination,
  handleValidationErrors,
  async (req, res) => {
    try {
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
      } = req.query;

      const result = await auditService.searchLogs({
        userId,
        role,
        action,
        category,
        startDate,
        endDate,
        ipAddress,
        success: success === 'true' ? true : success === 'false' ? false : undefined,
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res.status(200).json({
        success: true,
        data: result.logs,
        pagination: result.pagination,
      });

    } catch (error) {
      console.error('Get audit logs error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

/**
 * GET /api/audit-logs/security-incidents
 * Get security incidents (admin only)
 */
router.get('/security-incidents',
  authenticate,
  requireRoles('admin', 'reviewer'),
  async (req, res) => {
    try {
      const { limit = 100, startDate, endDate } = req.query;

      const incidents = await auditService.getSecurityIncidents({
        limit: parseInt(limit),
        startDate,
        endDate,
      });

      res.status(200).json({
        success: true,
        data: incidents,
      });

    } catch (error) {
      console.error('Get security incidents error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

/**
 * GET /api/audit-logs/user/:userId
 * Get activity for specific user (admin only)
 */
router.get('/user/:userId',
  authenticate,
  requireRoles('admin', 'reviewer'),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { limit = 50, startDate, endDate, category } = req.query;

      const activity = await auditService.getUserActivity(userId, {
        limit: parseInt(limit),
        startDate,
        endDate,
        category,
      });

      res.status(200).json({
        success: true,
        data: activity,
      });

    } catch (error) {
      console.error('Get user activity error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

/**
 * GET /api/audit-logs/admin-actions
 * Get admin action logs (admin only)
 */
router.get('/admin-actions',
  authenticate,
  requireRoles('admin'),
  async (req, res) => {
    try {
      const { limit = 100, startDate, endDate } = req.query;

      const logs = await auditService.getAdminLogs({
        limit: parseInt(limit),
        startDate,
        endDate,
      });

      res.status(200).json({
        success: true,
        data: logs,
      });

    } catch (error) {
      console.error('Get admin logs error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

/**
 * GET /api/audit-logs/login-history/:userId
 * Get login history for a user (admin or self)
 */
router.get('/login-history/:userId',
  authenticate,
  async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Only admin can view other users' login history
      if (req.user.role !== 'admin' && req.user._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this login history',
        });
      }

      const history = await auditService.getLoginHistory(userId, 20);

      res.status(200).json({
        success: true,
        data: history,
      });

    } catch (error) {
      console.error('Get login history error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

/**
 * GET /api/audit-logs/security-report
 * Generate security report (admin only)
 */
router.get('/security-report',
  authenticate,
  requireRoles('admin'),
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const report = await auditService.generateSecurityReport({
        startDate,
        endDate,
      });

      res.status(200).json({
        success: true,
        data: report,
      });

    } catch (error) {
      console.error('Generate security report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
);

module.exports = router;
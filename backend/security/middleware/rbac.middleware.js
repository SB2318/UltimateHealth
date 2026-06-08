/**
 * RBAC Middleware - Role-Based Access Control
 * 
 * Features:
 * - Route protection based on roles
 * - Permission checking
 * - Resource ownership validation
 * - Admin route protection
 */

const rbacConfig = require('../config/rbac.config');
const AuditLog = require('../models/audit-log.model');

/**
 * Create RBAC middleware for route protection
 * @param {Object} options - RBAC options
 * @returns {Function} Express middleware
 */
const createRbacMiddleware = (options = {}) => {
  const {
    allowedRoles = [],
    requiredPermissions = [],
    resourceType = null,
    resourceIdParam = 'id',
    checkOwnership = false,
  } = options;

  return async (req, res, next) => {
    try {
      // If no user attached (not authenticated), deny access
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const userRole = req.user.role;
      const userId = req.user._id.toString();

      // Check role-based access
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Log unauthorized access attempt
        await AuditLog.create({
          userId: req.user._id,
          userEmail: req.user.email,
          role: userRole,
          action: 'access_denied',
          category: 'authorization',
          endpoint: req.originalUrl,
          method: req.method,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent'),
          success: false,
          errorMessage: `Required roles: ${allowedRoles.join(', ')}`,
          resourceType,
        });

        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource',
        });
      }

      // Check permission-based access
      if (requiredPermissions.length > 0) {
        const userPermissions = rbacConfig.permissions[userRole] || [];
        const hasAllPermissions = requiredPermissions.every(
          perm => userPermissions.includes(perm) || userPermissions.includes('full_access')
        );

        if (!hasAllPermissions) {
          await AuditLog.create({
            userId: req.user._id,
            userEmail: req.user.email,
            role: userRole,
            action: 'permission_denied',
            category: 'authorization',
            endpoint: req.originalUrl,
            method: req.method,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            success: false,
            errorMessage: `Required permissions: ${requiredPermissions.join(', ')}`,
            resourceType,
          });

          return res.status(403).json({
            success: false,
            message: 'You do not have the required permissions',
          });
        }
      }

      // Attach role and permissions info to request
      req.rbac = {
        role: userRole,
        permissions: rbacConfig.permissions[userRole] || [],
        isAdmin: userRole === 'admin',
        isReviewer: userRole === 'reviewer' || userRole === 'admin',
        isAuthor: ['author', 'reviewer', 'admin'].includes(userRole),
      };

      next();
    } catch (error) {
      console.error('RBAC middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authorization error',
      });
    }
  };
};

/**
 * Middleware to check if user is admin
 */
const requireAdmin = createRbacMiddleware({
  allowedRoles: ['admin'],
});

/**
 * Middleware to check if user is reviewer or admin
 */
const requireReviewer = createRbacMiddleware({
  allowedRoles: ['reviewer', 'admin'],
});

/**
 * Middleware to check if user is author, reviewer, or admin
 */
const requireAuthor = createRbacMiddleware({
  allowedRoles: ['author', 'reviewer', 'admin'],
});

/**
 * Middleware to check if user is authenticated (any role)
 */
const requireAuth = createRbacMiddleware({
  allowedRoles: ['user', 'author', 'reviewer', 'admin'],
});

/**
 * Middleware to check for specific permissions
 * @param {...string} permissions - Required permissions
 */
const requirePermissions = (...permissions) => {
  return createRbacMiddleware({
    requiredPermissions: permissions,
  });
};

/**
 * Middleware to check for specific roles
 * @param {...string} roles - Allowed roles
 */
const requireRoles = (...roles) => {
  return createRbacMiddleware({
    allowedRoles: roles,
  });
};

/**
 * Resource ownership middleware
 * Checks if the user owns the resource or has elevated permissions
 * @param {string} ownerField - The field name containing the owner's user ID
 */
const requireOwnership = (ownerField = 'authorId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      const userRole = req.user.role;

      // Admins and reviewers can access any resource
      if (['admin', 'reviewer'].includes(userRole)) {
        req.isOwner = false; // Not owner but has access
        return next();
      }

      // Get resource ID from params
      const resourceId = req.params.id || req.params[ownerField.replace('Id', '')];

      // For new resources, skip ownership check
      if (!resourceId || req.method === 'POST') {
        req.isOwner = true;
        return next();
      }

      // Check ownership (requires model-specific implementation)
      // This is a placeholder - actual implementation would query the resource
      req.isOwner = false; // Will be set by route handler if needed

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authorization error',
      });
    }
  };
};

/**
 * Middleware to protect admin-only routes
 */
const protectAdminRoutes = createRbacMiddleware({
  allowedRoles: ['admin'],
});

/**
 * Middleware to protect reviewer-only routes
 */
const protectReviewerRoutes = createRbacMiddleware({
  allowedRoles: ['reviewer', 'admin'],
});

/**
 * Middleware to allow guest access with limited permissions
 */
const allowGuest = createRbacMiddleware({
  allowedRoles: ['guest', 'user', 'author', 'reviewer', 'admin'],
});

/**
 * Helper to check if user can perform action on resource
 * @param {string} role - User's role
 * @param {string} action - Action to perform
 * @param {string} resource - Resource type
 */
const canPerformAction = (role, action, resource) => {
  const resourcePerms = rbacConfig.resourcePermissions[resource];
  
  if (!resourcePerms) {
    return false;
  }

  const actionPerms = resourcePerms[action];
  
  if (!actionPerms) {
    return false;
  }

  return actionPerms.includes(role);
};

/**
 * Helper to check if user has specific role or higher
 * @param {string} userRole - User's role
 * @param {string} requiredRole - Required minimum role
 */
const hasRoleOrHigher = (userRole, requiredRole) => {
  const userRoleLevel = rbacConfig.roles[userRole] || 0;
  const requiredRoleLevel = rbacConfig.roles[requiredRole] || 0;
  
  return userRoleLevel >= requiredRoleLevel;
};

module.exports = {
  createRbacMiddleware,
  requireAdmin,
  requireReviewer,
  requireAuthor,
  requireAuth,
  requirePermissions,
  requireRoles,
  requireOwnership,
  protectAdminRoutes,
  protectReviewerRoutes,
  allowGuest,
  canPerformAction,
  hasRoleOrHigher,
};
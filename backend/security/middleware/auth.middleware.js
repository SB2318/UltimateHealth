/**
 * Authentication Middleware - JWT Token Verification
 * 
 * Handles:
 * - Access token verification
 * - User context attachment
 * - Optional authentication for public routes
 */

const jwtService = require('../services/jwt.service');
const User = require('../../models/user.model');

/**
 * Required authentication middleware
 * Verifies access token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    // Verify access token
    const decoded = jwtService.verifyAccessToken(token);

    // Get user from database
    const user = await User.findById(decoded.sub).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user account is active
    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive',
      });
    }

    // Attach user and token info to request
    req.user = user;
    req.tokenInfo = {
      userId: decoded.sub,
      role: decoded.role,
      type: decoded.type,
      deviceFingerprint: decoded.deviceFingerprint,
      ipAddress: decoded.ipAddress,
    };

    next();
  } catch (error) {
    if (error.message === 'Access token expired') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired. Please refresh your token.',
        code: 'TOKEN_EXPIRED',
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid access token',
    });
  }
};

/**
 * Optional authentication middleware
 * Attaches user if token is valid, but doesn't require it
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token, continue as guest
      req.user = null;
      req.isGuest = true;
      return next();
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      req.user = null;
      req.isGuest = true;
      return next();
    }

    // Try to verify token
    try {
      const decoded = jwtService.verifyAccessToken(token);
      const user = await User.findById(decoded.sub).select('-password');
      
      if (user && user.status === 'active') {
        req.user = user;
        req.isGuest = false;
        req.tokenInfo = {
          userId: decoded.sub,
          role: decoded.role,
          type: decoded.type,
        };
      } else {
        req.user = null;
        req.isGuest = true;
      }
    } catch (err) {
      // Token invalid or expired, continue as guest
      req.user = null;
      req.isGuest = true;
    }

    next();
  } catch (error) {
    req.user = null;
    req.isGuest = true;
    next();
  }
};

/**
 * Check if user has specific role
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};

/**
 * Check if user has specific permission
 */
const requirePermission = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const userPermissions = getPermissionsForRole(req.user.role);
    
    const hasAllPermissions = permissions.every(permission => 
      userPermissions.includes(permission) || userPermissions.includes('full_access')
    );

    if (!hasAllPermissions) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};

/**
 * Helper to get permissions for a role
 */
const getPermissionsForRole = (role) => {
  const rbacConfig = require('../config/rbac.config');
  return rbacConfig.permissions[role] || [];
};

module.exports = {
  authenticate,
  optionalAuth,
  requireRole,
  requirePermission,
  getPermissionsForRole,
};
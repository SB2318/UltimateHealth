/**
 * Authentication Routes - Secure Login, Logout, and Token Refresh
 * 
 * Implements:
 * - POST /auth/login - User authentication with JWT generation
 * - POST /auth/logout - Token revocation and session cleanup
 * - POST /auth/refresh-token - Access token refresh with rotation
 */

const express = require('express');
const router = express.Router();
const jwtService = require('../services/jwt.service');
const AuditLog = require('../models/audit-log.model');
const User = require('../../models/user.model');
const { authenticate } = require('../middleware/auth.middleware');
const { loginRateLimiter } = require('../middleware/rateLimiter.middleware');
const { body, validationResult } = require('express-validator');

// Validation middleware for login
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

/**
 * POST /auth/login
 * User login with secure token generation
 */
router.post('/login', loginRateLimiter, loginValidation, async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { email, password, fcmToken } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      // Log failed login attempt
      await AuditLog.logAuthEvent({
        userId: null,
        userEmail: email,
        role: 'guest',
        action: 'login_failed',
        endpoint: '/auth/login',
        method: 'POST',
        ipAddress,
        userAgent,
        success: false,
        errorMessage: 'User not found',
      });

      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      // Log failed login attempt
      await AuditLog.logAuthEvent({
        userId: user._id,
        userEmail: email,
        role: user.role,
        action: 'login_failed',
        endpoint: '/auth/login',
        method: 'POST',
        ipAddress,
        userAgent,
        success: false,
        errorMessage: 'Invalid password',
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Email not verified. Please check your email.',
      });
    }

    // Check if user account is active
    if (user.status === 'inactive') {
      return res.status(403).json({
        success: false,
        message: 'Account is inactive. Please contact support.',
      });
    }

    // Generate tokens
    const deviceFingerprint = req.header('X-Device-Fingerprint') || null;
    
    const accessToken = jwtService.generateAccessToken(user, {
      deviceFingerprint,
      userAgent,
      ipAddress,
    });

    const refreshTokenData = await jwtService.generateRefreshToken(user, {
      deviceFingerprint,
      userAgent,
      ipAddress,
    });

    // Update user's last login
    user.lastLogin = new Date();
    user.fcmToken = fcmToken || user.fcmToken;
    await user.save();

    // Log successful login
    await AuditLog.logAuthEvent({
      userId: user._id,
      userEmail: email,
      role: user.role,
      action: 'login_success',
      endpoint: '/auth/login',
      method: 'POST',
      ipAddress,
      userAgent,
      success: true,
      metadata: {
        deviceFingerprint,
      },
    });

    // Return tokens
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        email: user.email,
        user_handle: user.user_handle,
        role: user.role,
        accessToken,
        refreshToken: refreshTokenData.token,
        expiresIn: 900, // 15 minutes
        tokenType: 'Bearer',
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    
    await AuditLog.logAuthEvent({
      userId: null,
      userEmail: req.body.email || 'unknown',
      role: 'guest',
      action: 'login_error',
      endpoint: '/auth/login',
      method: 'POST',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      success: false,
      errorMessage: error.message,
    });

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * POST /auth/logout
 * Invalidate refresh token and cleanup session
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    const user = req.user;
    const refreshToken = req.body.refreshToken || req.header('X-Refresh-Token');
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Revoke the specific refresh token if provided
    if (refreshToken) {
      await jwtService.revokeRefreshToken(refreshToken, 'user_initiated');
    }

    // Log logout event
    await AuditLog.logAuthEvent({
      userId: user._id,
      userEmail: user.email,
      role: user.role,
      action: 'logout',
      endpoint: '/auth/logout',
      method: 'POST',
      ipAddress,
      userAgent,
      success: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });

  } catch (error) {
    console.error('Logout error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * POST /auth/logout-all
 * Invalidate all refresh tokens for the user (logout from all devices)
 */
router.post('/logout-all', authenticate, async (req, res) => {
  try {
    const user = req.user;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Revoke all user tokens
    await jwtService.revokeAllUserTokens(user._id.toString(), 'user_initiated');

    // Log event
    await AuditLog.logAuthEvent({
      userId: user._id,
      userEmail: user.email,
      role: user.role,
      action: 'logout_all_devices',
      endpoint: '/auth/logout-all',
      method: 'POST',
      ipAddress,
      userAgent,
      success: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out from all devices successfully',
    });

  } catch (error) {
    console.error('Logout all error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * POST /auth/refresh-token
 * Refresh access token using refresh token (with rotation)
 */
router.post('/refresh-token', async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken || req.header('X-Refresh-Token');
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';
    const deviceFingerprint = req.header('X-Device-Fingerprint') || null;

    // Refresh the token
    const tokenData = await jwtService.refreshAccessToken(refreshToken, {
      deviceFingerprint,
      userAgent,
      ipAddress,
    });

    // Get user info for audit
    const decoded = jwtService.decodeToken(refreshToken);
    const user = await User.findById(decoded.sub);

    // Log token refresh
    await AuditLog.logAuthEvent({
      userId: user._id,
      userEmail: user.email,
      role: user.role,
      action: 'token_refresh',
      endpoint: '/auth/refresh-token',
      method: 'POST',
      ipAddress,
      userAgent,
      success: true,
    });

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokenData,
    });

  } catch (error) {
    console.error('Token refresh error:', error);

    let statusCode = 401;
    let message = 'Invalid refresh token';

    if (error.message === 'Refresh token expired') {
      message = 'Refresh token expired';
    } else if (error.message === 'Token reuse detected - all sessions terminated') {
      message = 'Session terminated due to security concern. Please login again.';
    }

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
});

/**
 * GET /auth/me
 * Get current user info (for token validation)
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        email: user.email,
        user_handle: user.user_handle,
        role: user.role,
        profileImage: user.profileImage,
        isEmailVerified: user.isEmailVerified,
      },
    });

  } catch (error) {
    console.error('Get user error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
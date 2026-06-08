/**
 * JWT Service - Production-Grade Token Management
 * 
 * Features:
 * - Short-lived access tokens with role-based claims
 * - Refresh token rotation with security
 * - Token blacklisting for revocation
 * - Secure storage in database
 */

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const RefreshToken = require('../models/refresh-token.model');
const User = require('../../models/user.model');

class JwtService {
  /**
   * Generate access token with user claims
   * @param {Object} user - User object from database
   * @param {Object} options - Additional options (device info, IP, etc.)
   * @returns {string} Signed JWT access token
   */
  generateAccessToken(user, options = {}) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      user_handle: user.user_handle,
      type: 'access',
      iat: Math.floor(Date.now() / 1000),
    };

    // Include additional security context
    if (jwtConfig.payload.includeDeviceFingerprint && options.deviceFingerprint) {
      payload.deviceFingerprint = options.deviceFingerprint;
    }
    if (jwtConfig.payload.includeUserAgent && options.userAgent) {
      payload.userAgent = options.userAgent;
    }
    if (jwtConfig.payload.includeIPAddress && options.ipAddress) {
      payload.ipAddress = options.ipAddress;
    }

    return jwt.sign(payload, jwtConfig.secrets.accessSecret, {
      expiresIn: jwtConfig.accessToken.expiresIn,
      algorithm: jwtConfig.accessToken.algorithm,
      issuer: jwtConfig.accessToken.issuer,
      audience: jwtConfig.accessToken.audience,
    });
  }

  /**
   * Generate refresh token and store in database
   * @param {Object} user - User object from database
   * @param {Object} options - Additional options (device info, IP, etc.)
   * @returns {Object} Object containing token and expiry info
   */
  async generateRefreshToken(user, options = {}) {
    // Check if user has reached max tokens limit
    const tokenCount = await RefreshToken.countDocuments({
      userId: user._id,
      revoked: false,
    });

    if (tokenCount >= jwtConfig.security.maxTokensPerUser) {
      // Remove oldest token
      const oldestToken = await RefreshToken.findOne({
        userId: user._id,
        revoked: false,
      }).sort({ createdAt: 1 });
      
      if (oldestToken) {
        oldestToken.revoked = true;
        oldestToken.revokedAt = new Date();
        oldestToken.revokedReason = 'max_tokens_exceeded';
        await oldestToken.save();
      }
    }

    const payload = {
      sub: user._id.toString(),
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      jti: require('crypto').randomBytes(16).toString('hex'), // Unique token ID
    };

    const token = jwt.sign(payload, jwtConfig.secrets.refreshSecret, {
      expiresIn: jwtConfig.refreshToken.expiresIn,
      algorithm: jwtConfig.refreshToken.algorithm,
      issuer: jwtConfig.refreshToken.issuer,
    });

    // Store refresh token in database
    const refreshTokenDoc = new RefreshToken({
      token,
      userId: user._id,
      deviceFingerprint: options.deviceFingerprint || null,
      userAgent: options.userAgent || null,
      ipAddress: options.ipAddress || null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdAt: new Date(),
    });

    await refreshTokenDoc.save();

    return {
      token,
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
      issuedAt: new Date(),
    };
  }

  /**
   * Verify access token
   * @param {string} token - JWT access token
   * @returns {Object} Decoded token payload
   */
  verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, jwtConfig.secrets.accessSecret, {
        algorithms: [jwtConfig.accessToken.algorithm],
        issuer: jwtConfig.accessToken.issuer,
        audience: jwtConfig.accessToken.audience,
      });

      if (decoded.type !== 'access') {
        throw new Error('Invalid token type');
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Access token expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid access token');
      }
      throw error;
    }
  }

  /**
   * Verify refresh token and check against database
   * @param {string} token - JWT refresh token
   * @returns {Object} Decoded token payload
   */
  async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, jwtConfig.secrets.refreshSecret, {
        algorithms: [jwtConfig.refreshToken.algorithm],
        issuer: jwtConfig.refreshToken.issuer,
      });

      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }

      // Check if token is in blacklist or revoked
      const tokenDoc = await RefreshToken.findOne({ token });
      
      if (!tokenDoc) {
        throw new Error('Refresh token not found');
      }

      if (tokenDoc.revoked) {
        // Token reuse detected - revoke all user tokens as security measure
        await RefreshToken.updateMany(
          { userId: tokenDoc.userId, revoked: false },
          { 
            revoked: true, 
            revokedAt: new Date(), 
            revokedReason: 'token_reuse_detected' 
          }
        );
        throw new Error('Token reuse detected - all sessions terminated');
      }

      if (tokenDoc.expiresAt < new Date()) {
        throw new Error('Refresh token expired');
      }

      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Refresh token expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   * Implements token rotation for security
   * @param {string} refreshToken - Current refresh token
   * @param {Object} options - Request context (IP, user agent, etc.)
   * @returns {Object} New access token and optionally new refresh token
   */
  async refreshAccessToken(refreshToken, options = {}) {
    // Verify the refresh token
    const decoded = await this.verifyRefreshToken(refreshToken);

    // Get user from database
    const user = await User.findById(decoded.sub);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Revoke old refresh token (rotation)
    await RefreshToken.findOneAndUpdate(
      { token: refreshToken },
      { 
        revoked: true, 
        revokedAt: new Date(), 
        revokedReason: 'used_for_refresh' 
      }
    );

    // Generate new access token
    const accessToken = this.generateAccessToken(user, {
      deviceFingerprint: options.deviceFingerprint,
      userAgent: options.userAgent,
      ipAddress: options.ipAddress,
    });

    // Generate new refresh token (rotation)
    const newRefreshToken = await this.generateRefreshToken(user, {
      deviceFingerprint: options.deviceFingerprint,
      userAgent: options.userAgent,
      ipAddress: options.ipAddress,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken.token,
      expiresIn: 900, // 15 minutes
      tokenType: 'Bearer',
    };
  }

  /**
   * Revoke a specific refresh token
   * @param {string} token - Token to revoke
   * @param {string} reason - Reason for revocation
   */
  async revokeRefreshToken(token, reason = 'user_initiated') {
    await RefreshToken.findOneAndUpdate(
      { token },
      { 
        revoked: true, 
        revokedAt: new Date(), 
        revokedReason: reason 
      }
    );
  }

  /**
   * Revoke all refresh tokens for a user
   * @param {string} userId - User ID
   * @param {string} reason - Reason for revocation
   */
  async revokeAllUserTokens(userId, reason = 'user_initiated') {
    await RefreshToken.updateMany(
      { userId, revoked: false },
      { 
        revoked: true, 
        revokedAt: new Date(), 
        revokedReason: reason 
      }
    );
  }

  /**
   * Decode token without verification (for logging/debugging)
   * @param {string} token - JWT token
   * @returns {Object} Decoded payload or null
   */
  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
}

module.exports = new JwtService();
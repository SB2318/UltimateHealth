/**
 * Refresh Token Model - Secure Token Storage
 * 
 * Stores refresh tokens with metadata for:
 * - Token rotation tracking
 * - Revocation support
 * - Device/IP tracking for security
 * - Automatic cleanup of expired tokens
 */

const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  // The actual JWT refresh token
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  // Reference to user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  // Device fingerprint for device tracking
  deviceFingerprint: {
    type: String,
    default: null,
  },

  // User agent string
  userAgent: {
    type: String,
    default: null,
  },

  // IP address at token creation
  ipAddress: {
    type: String,
    default: null,
  },

  // Token expiration date
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },

  // Token creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Revocation status
  revoked: {
    type: Boolean,
    default: false,
    index: true,
  },

  // When token was revoked
  revokedAt: {
    type: Date,
    default: null,
  },

  // Reason for revocation
  revokedReason: {
    type: String,
    enum: [
      'user_initiated',      // User logged out
      'password_changed',    // User changed password
      'security_event',      // Suspicious activity detected
      'max_tokens_exceeded', // Oldest token removed for new one
      'used_for_refresh',    // Token used for rotation
      'token_reuse_detected',// Token reuse attack detected
      'admin_action',        // Admin revoked tokens
      'session_timeout',     // Session expired
    ],
    default: null,
  },

  // Last seen date (updated on token use)
  lastSeenAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Compound indexes for efficient queries
refreshTokenSchema.index({ userId: 1, revoked: 1 });
refreshTokenSchema.index({ userId: 1, expiresAt: 1, revoked: 1 });

// TTL index for automatic cleanup (removes expired tokens after 30 days)
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

// Static method to find valid token
refreshTokenSchema.statics.findValidToken = async function(token) {
  return this.findOne({
    token,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });
};

// Static method to revoke all user tokens
refreshTokenSchema.statics.revokeAllUserTokens = async function(userId, reason) {
  return this.updateMany(
    { userId, revoked: false },
    { 
      revoked: true, 
      revokedAt: new Date(), 
      revokedReason: reason 
    }
  );
};

// Static method to count active tokens for user
refreshTokenSchema.statics.countActiveTokens = async function(userId) {
  return this.countDocuments({
    userId,
    revoked: false,
    expiresAt: { $gt: new Date() },
  });
};

// Instance method to revoke this token
refreshTokenSchema.methods.revoke = async function(reason) {
  this.revoked = true;
  this.revokedAt = new Date();
  this.revokedReason = reason;
  return this.save();
};

// Instance method to update last seen
refreshTokenSchema.methods.updateLastSeen = async function() {
  this.lastSeenAt = new Date();
  return this.save();
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
/**
 * Audit Log Model - Security Event Tracking
 * 
 * Stores security-sensitive actions for:
 * - Compliance and accountability
 * - Security incident investigation
 * - User activity monitoring
 * - Admin action tracking
 */

const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  // User who performed the action
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },

  // User's email at time of action
  userEmail: {
    type: String,
    required: true,
  },

  // User's role at time of action
  role: {
    type: String,
    enum: ['guest', 'user', 'author', 'reviewer', 'admin'],
    required: true,
    index: true,
  },

  // The action performed
  action: {
    type: String,
    required: true,
    index: true,
  },

  // Action category for grouping
  category: {
    type: String,
    enum: [
      'authentication',    // Login, logout, token refresh
      'authorization',    // Permission checks, access attempts
      'article',          // Article CRUD operations
      'podcast',          // Podcast CRUD operations
      'user',             // User profile changes
      'admin',            // Admin actions
      'security',         // Security-related events
      'system',           // System-level events
    ],
    required: true,
    index: true,
  },

  // API endpoint accessed
  endpoint: {
    type: String,
    default: null,
  },

  // HTTP method used
  method: {
    type: String,
    default: null,
  },

  // Client IP address
  ipAddress: {
    type: String,
    required: true,
    index: true,
  },

  // User agent string
  userAgent: {
    type: String,
    default: null,
  },

  // Request body (sanitized - sensitive fields removed)
  requestBody: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  // Response status code
  statusCode: {
    type: Number,
    default: null,
  },

  // Whether the action was successful
  success: {
    type: Boolean,
    required: true,
    index: true,
  },

  // Error message if failed
  errorMessage: {
    type: String,
    default: null,
  },

  // Additional metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },

  // Resource affected (for CRUD operations)
  resourceType: {
    type: String,
    enum: ['article', 'podcast', 'user', 'comment', 'report', null],
    default: null,
  },

  // Resource ID affected
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },

  // Session ID for tracking
  sessionId: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  // Collection name
});

// Compound indexes for common queries
auditLogSchema.index({ createdAt: -1, action: 1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ role: 1, action: 1, createdAt: -1 });
auditLogSchema.index({ category: 1, success: 1, createdAt: -1 });

// TTL index - retain logs for 1 year
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });

// Static method to log security events
auditLogSchema.statics.logSecurityEvent = async function(data) {
  return this.create({
    ...data,
    category: 'security',
  });
};

// Static method to log admin actions
auditLogSchema.statics.logAdminAction = async function(data) {
  return this.create({
    ...data,
    category: 'admin',
  });
};

// Static method to log authentication events
auditLogSchema.statics.logAuthEvent = async function(data) {
  return this.create({
    ...data,
    category: 'authentication',
  });
};

// Static method to get user activity timeline
auditLogSchema.statics.getUserActivity = async function(userId, options = {}) {
  const { limit = 50, startDate, endDate, category } = options;
  
  const query = { userId };
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  if (category) {
    query.category = category;
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('-requestBody'); // Exclude request body for list views
};

// Static method to get security incidents
auditLogSchema.statics.getSecurityIncidents = async function(options = {}) {
  const { limit = 100, startDate, endDate } = options;
  
  const query = {
    category: 'security',
    success: false,
  };
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(limit);
};

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
/**
 * Role-Based Access Control (RBAC) Configuration
 * 
 * Defines roles, permissions, and route access rules for UltimateHealth.
 * Implements the principle of least privilege with granular permissions.
 */

module.exports = {
  // Role hierarchy (higher roles inherit permissions from lower roles)
  roles: {
    guest: 0,
    user: 1,
    author: 2,
    reviewer: 3,
    admin: 4,
  },

  // Permission definitions
  permissions: {
    // Guest permissions - read-only access
    guest: [
      'read_articles',
      'read_podcasts',
      'search_content',
      'view_profiles',
    ],

    // User permissions - includes guest + interaction
    user: [
      'read_articles',
      'read_podcasts',
      'search_content',
      'view_profiles',
      'comment',
      'save_articles',
      'like_content',
      'share_content',
      'follow_users',
      'manage_own_playlists',
      'update_own_profile',
    ],

    // Author permissions - includes user + content creation
    author: [
      'read_articles',
      'read_podcasts',
      'search_content',
      'view_profiles',
      'comment',
      'save_articles',
      'like_content',
      'share_content',
      'follow_users',
      'manage_own_playlists',
      'update_own_profile',
      'create_articles',
      'edit_own_articles',
      'delete_own_articles',
      'create_podcasts',
      'edit_own_podcasts',
      'delete_own_podcasts',
      'submit_for_review',
    ],

    // Reviewer permissions - includes author + moderation
    reviewer: [
      'read_articles',
      'read_podcasts',
      'search_content',
      'view_profiles',
      'comment',
      'save_articles',
      'like_content',
      'share_content',
      'follow_users',
      'manage_own_playlists',
      'update_own_profile',
      'create_articles',
      'edit_own_articles',
      'delete_own_articles',
      'create_podcasts',
      'edit_own_podcasts',
      'delete_own_podcasts',
      'submit_for_review',
      'review_articles',
      'approve_articles',
      'reject_articles',
      'request_changes',
      'view_pending_content',
      'manage_comments',
    ],

    // Admin permissions - full access
    admin: [
      'full_access',
    ],
  },

  // Resource-based permissions for specific actions
  resourcePermissions: {
    articles: {
      create: ['author', 'reviewer', 'admin'],
      read: ['guest', 'user', 'author', 'reviewer', 'admin'],
      update: ['author', 'reviewer', 'admin'], // author only owns
      delete: ['author', 'admin'], // author only owns
      review: ['reviewer', 'admin'],
      approve: ['reviewer', 'admin'],
      publish: ['reviewer', 'admin'],
    },
    podcasts: {
      create: ['author', 'reviewer', 'admin'],
      read: ['guest', 'user', 'author', 'reviewer', 'admin'],
      update: ['author', 'reviewer', 'admin'],
      delete: ['author', 'admin'],
      review: ['reviewer', 'admin'],
      approve: ['reviewer', 'admin'],
    },
    users: {
      read: ['guest', 'user', 'author', 'reviewer', 'admin'],
      update: ['user', 'author', 'reviewer', 'admin'], // own profile
      update_any: ['admin'],
      delete: ['admin'],
      manage_roles: ['admin'],
    },
    comments: {
      create: ['user', 'author', 'reviewer', 'admin'],
      read: ['guest', 'user', 'author', 'reviewer', 'admin'],
      update: ['author', 'admin'], // own comments
      delete: ['author', 'admin'], // own comments
      moderate: ['reviewer', 'admin'],
    },
    reports: {
      create: ['user', 'author', 'reviewer', 'admin'],
      read: ['reviewer', 'admin'],
      resolve: ['reviewer', 'admin'],
    },
  },

  // Admin-only routes (full restriction)
  adminRoutes: [
    '/api/admin/*',
    '/api/analytics/*',
    '/api/users/manage/*',
    '/api/audit-logs/*',
    '/api/system/*',
  ],

  // Reviewer-only routes
  reviewerRoutes: [
    '/api/review/*',
    '/api/moderation/*',
  ],

  // Author-only routes
  authorRoutes: [
    '/api/my-content/*',
  ],

  // Public routes (no authentication required)
  publicRoutes: [
    '/api/articles/public/*',
    '/api/podcasts/public/*',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh-token',
    '/api/auth/forgot-password',
    '/api/health',
  ],

  // Protected routes (authentication required)
  protectedRoutes: [
    '/api/user/*',
    '/api/articles/*',
    '/api/podcasts/*',
    '/api/comments/*',
    '/api/chat/*',
  ],

  // Rate limiting by role
  rateLimits: {
    guest: {
      requests: 100,
      window: 60 * 60, // per hour
    },
    user: {
      requests: 500,
      window: 60 * 60, // per hour
    },
    author: {
      requests: 1000,
      window: 60 * 60, // per hour
    },
    reviewer: {
      requests: 2000,
      window: 60 * 60, // per hour
    },
    admin: {
      requests: 10000,
      window: 60 * 60, // per hour
    },
  },

  // Content creation limits
  contentLimits: {
    articles: {
      per_day: 10,
      per_month: 50,
    },
    podcasts: {
      per_day: 5,
      per_month: 20,
    },
    comments: {
      per_minute: 5,
      per_hour: 30,
    },
  },
};
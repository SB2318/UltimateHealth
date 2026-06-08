# UltimateHealth Security Architecture

## Overview

This document describes the production-grade security architecture implemented for UltimateHealth's backend API. The security module provides comprehensive protection against common vulnerabilities while maintaining excellent developer experience.

## Architecture Components

### 1. JWT Security Upgrade

#### Token Structure
- **Access Token**: Short-lived (15 minutes) JWT containing user identity and role
- **Refresh Token**: Long-lived (7 days) JWT stored securely in database

#### Security Features
- Token rotation on each use (refresh tokens are invalidated after use)
- Device fingerprint tracking for anomaly detection
- IP address binding for session validation
- Maximum 5 active refresh tokens per user (oldest revoked automatically)

#### Token Payload
```javascript
Access Token: {
  sub: userId,
  email: user.email,
  role: user.role,
  user_handle: user.user_handle,
  type: 'access',
  deviceFingerprint: string,
  userAgent: string,
  ipAddress: string,
  iat: timestamp,
  exp: timestamp
}

Refresh Token: {
  sub: userId,
  type: 'refresh',
  jti: uniqueTokenId,
  iat: timestamp,
  exp: timestamp
}
```

#### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | Authenticate user, return access + refresh tokens |
| `/api/auth/logout` | POST | Invalidate refresh token |
| `/api/auth/logout-all` | POST | Invalidate all user tokens |
| `/api/auth/refresh-token` | POST | Get new access token using refresh token |
| `/api/auth/me` | GET | Get current user info |

### 2. Role-Based Access Control (RBAC)

#### Role Hierarchy
```
Admin (4) > Reviewer (3) > Author (2) > User (1) > Guest (0)
```

#### Roles and Permissions

| Role | Permissions |
|------|-------------|
| Guest | read_articles, read_podcasts, search_content, view_profiles |
| User | All guest permissions + comment, save_articles, like_content, share_content, follow_users, manage_own_playlists, update_own_profile |
| Author | All user permissions + create_articles, edit_own_articles, delete_own_articles, create_podcasts, edit_own_podcasts, delete_own_podcasts, submit_for_review |
| Reviewer | All author permissions + review_articles, approve_articles, reject_articles, request_changes, view_pending_content, manage_comments |
| Admin | full_access (bypasses all permission checks) |

#### Middleware Usage
```javascript
// Protect routes based on role
const { requireAdmin, requireReviewer, requireAuthor, requireAuth } = require('./security');

// Admin-only route
router.delete('/users/:id', authenticate, requireAdmin, handler);

// Reviewer or Admin route
router.get('/pending-articles', authenticate, requireReviewer, handler);

// Author or higher route
router.post('/articles', authenticate, requireAuthor, handler);

// Any authenticated user
router.post('/comments', authenticate, requireAuth, handler);
```

### 3. Audit Logging System

#### Log Categories
- `authentication`: Login, logout, token refresh events
- `authorization`: Permission checks, access attempts
- `article`: Article CRUD operations
- `podcast`: Podcast CRUD operations
- `user`: User profile changes
- `admin`: Admin actions
- `security`: Security-related events
- `system`: System-level events

#### Log Schema
```javascript
{
  userId: ObjectId,
  userEmail: String,
  role: String,
  action: String,
  category: String,
  endpoint: String,
  method: String,
  ipAddress: String,
  userAgent: String,
  requestBody: Mixed (sanitized),
  statusCode: Number,
  success: Boolean,
  errorMessage: String,
  metadata: Mixed,
  resourceType: String,
  resourceId: ObjectId,
  createdAt: Date
}
```

#### Retention Policy
- Logs are retained for 1 year
- Automatic cleanup of logs older than 365 days
- TTL index for automatic MongoDB cleanup

### 4. API Rate Limiting

#### Rate Limits by Endpoint

| Endpoint | Limit | Window |
|----------|-------|--------|
| Login | 5 requests | 15 minutes |
| Registration | 5 requests | 1 hour |
| AI Chat | 50 requests | 1 hour |
| Password Reset | 3 requests | 1 hour |
| Article Creation | 10 requests | 1 hour |
| Comments | 5 requests | 1 minute |

#### Rate Limits by Role

| Role | Requests per Hour |
|------|-------------------|
| Guest | 100 |
| User | 500 |
| Author | 1000 |
| Reviewer | 2000 |
| Admin | 10000 |

### 5. Input Validation & Sanitization

#### Validation Libraries
- `express-validator`: Request validation
- `validator`: Email, password, username validation
- `sanitize-html`: HTML content sanitization

#### Validation Rules

**Email**
- Valid email format
- Maximum 255 characters
- Normalized to lowercase

**Password**
- Minimum 8 characters
- Maximum 128 characters
- Must contain: uppercase, lowercase, number, special character

**Username**
- 3-30 characters
- Alphanumeric + underscore only
- Lowercase only

#### XSS Prevention
- All user-generated HTML is sanitized
- `<script>` tags removed
- Event handlers (`onclick`, `onerror`, etc.) stripped
- Dangerous protocols (`javascript:`, `data:`) blocked

#### NoSQL Injection Prevention
- MongoDB operators (`$where`, `$eval`, etc.) stripped from queries
- Applied to request body, query parameters, and nested objects

### 6. Security Headers

Implemented using Helmet.js:

| Header | Value |
|--------|-------|
| Content-Security-Policy | Restricts scripts, styles, images, connections |
| X-Content-Type-Options | nosniff |
| X-Frame-Options | DENY |
| X-XSS-Protection | 1; mode=block |
| Strict-Transport-Security | max-age=31536000; includeSubDomains |
| X-DNS-Prefetch-Control | off |

## Installation

```bash
npm install express-rate-limit helmet express-validator validator sanitize-html jsonwebtoken mongoose
```

## Configuration

### Environment Variables
```bash
# JWT Configuration
JWT_ACCESS_SECRET=your-access-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Security
NODE_ENV=production
ALLOWED_ORIGINS=https://uhsocial.in,https://www.uhsocial.in
COOKIE_DOMAIN=uhsocial.in
```

## Usage

### Initialize Security Module
```javascript
const express = require('express');
const { initializeSecurity, authenticate, requireAdmin } = require('./security');

const app = express();

// Initialize all security features
initializeSecurity(app);

// Your routes
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.delete('/api/admin/users/:id', authenticate, requireAdmin, (req, res) => {
  // Admin-only operation
});
```

### Protect Routes with RBAC
```javascript
const {
  authenticate,
  requireRole,
  requirePermission,
  requireOwnership
} = require('./security');

// Require specific role
router.post('/articles', authenticate, requireRole('author', 'reviewer', 'admin'), handler);

// Require specific permission
router.delete('/articles/:id', authenticate, requirePermission('delete_articles'), handler);

// Check resource ownership
router.put('/articles/:id', authenticate, requireOwnership('authorId'), handler);
```

### Rate Limiting Specific Routes
```javascript
const {
  loginRateLimiter,
  aiChatRateLimiter,
  articleCreationRateLimiter
} = require('./security');

router.post('/auth/login', loginRateLimiter, loginHandler);
router.post('/gemini/send', authenticate, aiChatRateLimiter, aiHandler);
router.post('/articles', authenticate, requireAuthor, articleCreationRateLimiter, articleHandler);
```

## Security Testing

Run the test suite:
```bash
npm test -- --coverage
```

Expected coverage: 80%+

## Migration Guide

### For Existing Users
1. Update login response handling to store both `accessToken` and `refreshToken`
2. Implement token refresh logic in the frontend
3. Update logout to call `/api/auth/logout`

### Backend Changes
1. Add security module to your Express app
2. Update user model with `comparePassword` method
3. Create `RefreshToken` and `AuditLog` collections
4. Update routes to use authentication middleware

## Security Checklist

- [x] JWT with refresh token rotation
- [x] Role-based access control
- [x] Audit logging for all security events
- [x] Rate limiting on sensitive endpoints
- [x] Input validation and sanitization
- [x] Security headers (Helmet)
- [x] CORS configuration
- [x] NoSQL injection prevention
- [x] XSS prevention
- [x] Token revocation support
- [x] Device/IP tracking
- [x] Comprehensive test coverage
# UltimateHealth Backend Security Module

Production-grade security implementation for the UltimateHealth API.

## Features

### ✅ JWT Security Upgrade
- Short-lived access tokens (15 minutes)
- Long-lived refresh tokens (7 days)
- Token rotation with database storage
- Token revocation support
- Device/IP tracking

### ✅ Role-Based Access Control (RBAC)
- 5 roles: guest, user, author, reviewer, admin
- Granular permission system
- Route protection middleware
- Resource ownership validation

### ✅ Audit Logging
- Security event tracking
- User activity monitoring
- Admin action logging
- Searchable audit trail
- 1-year retention with automatic cleanup

### ✅ API Rate Limiting
- Login: 5 requests/15 minutes
- Registration: 5 requests/hour
- AI Chat: 50 requests/hour
- Password Reset: 3 requests/hour
- Per-role rate limits

### ✅ Input Validation & Sanitization
- Request validation with express-validator
- XSS prevention with sanitize-html
- NoSQL injection prevention
- Email, password, username validation

### ✅ Security Headers
- Helmet.js integration
- Content Security Policy
- XSS protection
- Strict Transport Security

## Installation

```bash
npm install jsonwebtoken mongoose express-rate-limit helmet express-validator validator sanitize-html
```

## Quick Start

```javascript
const express = require('express');
const { initializeSecurity, authenticate, requireAdmin } = require('./security');

const app = express();

// Initialize all security features
initializeSecurity(app);

// Your protected routes
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.delete('/api/admin/users/:id', authenticate, requireAdmin, handler);
```

## Directory Structure

```
backend/
├── security/
│   ├── config/
│   │   ├── jwt.config.js        # JWT configuration
│   │   └── rbac.config.js      # RBAC configuration
│   ├── middleware/
│   │   ├── auth.middleware.js  # Authentication middleware
│   │   ├── rbac.middleware.js   # RBAC middleware
│   │   ├── rateLimiter.middleware.js  # Rate limiting
│   │   └── validation.middleware.js   # Input validation
│   ├── models/
│   │   ├── refresh-token.model.js  # Refresh token storage
│   │   └── audit-log.model.js     # Audit log storage
│   ├── services/
│   │   ├── jwt.service.js       # JWT operations
│   │   └── audit.service.js     # Audit logging
│   ├── routes/
│   │   ├── auth.routes.js       # Auth endpoints
│   │   └── audit.routes.js      # Audit log endpoints
│   ├── __tests__/
│   │   ├── jwt.service.test.js
│   │   ├── rbac.middleware.test.js
│   │   ├── audit.service.test.js
│   │   └── rateLimiter.middleware.test.js
│   └── index.js                # Main export
├── SECURITY_ARCHITECTURE.md    # Architecture documentation
└── API_DOCUMENTATION.md        # API documentation
```

## Environment Variables

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

## Testing

```bash
npm test
```

Expected coverage: 80%+

## Documentation

- [Security Architecture](SECURITY_ARCHITECTURE.md)
- [API Documentation](API_DOCUMENTATION.md)

## License

MIT
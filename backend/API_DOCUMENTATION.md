# UltimateHealth Security Module - API Documentation

## Authentication Endpoints

### POST /api/auth/login

**Description:** Authenticate user and receive access + refresh tokens.

**Rate Limit:** 5 requests per 15 minutes per IP

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fcmToken": "firebase-token-optional"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "user_handle": "username",
    "role": "user",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

**Error Responses:**
- 400: Validation failed
- 401: Invalid password
- 403: Email not verified / Account inactive
- 404: User not found
- 429: Rate limit exceeded

---

### POST /api/auth/logout

**Description:** Invalidate current refresh token and end session.

**Headers:**
- Authorization: Bearer {access_token}
- X-Refresh-Token: {refresh_token} (optional)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### POST /api/auth/logout-all

**Description:** Invalidate all refresh tokens for the user (logout from all devices).

**Headers:**
- Authorization: Bearer {access_token}

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out from all devices successfully"
}
```

---

### POST /api/auth/refresh-token

**Description:** Get new access token using refresh token. Implements token rotation.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

**Error Responses:**
- 400: Refresh token required
- 401: Invalid/expired refresh token

---

### GET /api/auth/me

**Description:** Get current authenticated user info.

**Headers:**
- Authorization: Bearer {access_token}

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "user_handle": "username",
    "role": "user",
    "profileImage": "url",
    "isEmailVerified": true
  }
}
```

---

## Audit Log Endpoints

### GET /api/audit-logs

**Description:** Search audit logs with filters.

**Headers:**
- Authorization: Bearer {access_token} (admin/reviewer only)

**Query Parameters:**
- `userId` (optional): Filter by user ID
- `role` (optional): Filter by role
- `action` (optional): Filter by action name (regex)
- `category` (optional): Filter by category
- `startDate` (optional): Start date (ISO format)
- `endDate` (optional): End date (ISO format)
- `ipAddress` (optional): Filter by IP address
- `success` (optional): Filter by success status
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 50): Results per page

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "log_id",
      "userId": "user_id",
      "userEmail": "user@example.com",
      "role": "user",
      "action": "login_success",
      "category": "authentication",
      "ipAddress": "192.168.1.1",
      "success": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "pages": 2
  }
}
```

---

### GET /api/audit-logs/security-incidents

**Description:** Get security incidents (failed events).

**Headers:**
- Authorization: Bearer {access_token} (admin/reviewer only)

**Query Parameters:**
- `limit` (optional, default: 100): Number of results
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "log_id",
      "action": "rate_limit_login",
      "category": "security",
      "success": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### GET /api/audit-logs/user/:userId

**Description:** Get activity timeline for a specific user.

**Headers:**
- Authorization: Bearer {access_token} (admin/reviewer only)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "log_id",
      "action": "article_created",
      "category": "article",
      "success": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### GET /api/audit-logs/admin-actions

**Description:** Get all admin actions.

**Headers:**
- Authorization: Bearer {access_token} (admin only)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "log_id",
      "action": "user_ban",
      "userId": {
        "user_handle": "admin",
        "email": "admin@example.com"
      },
      "category": "admin",
      "success": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### GET /api/audit-logs/login-history/:userId

**Description:** Get login history for a specific user.

**Headers:**
- Authorization: Bearer {access_token} (admin or self)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "log_id",
      "action": "login_success",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "success": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### GET /api/audit-logs/security-report

**Description:** Generate security report with statistics.

**Headers:**
- Authorization: Bearer {access_token} (admin only)

**Query Parameters:**
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalEvents": 1000,
      "failedEvents": 50,
      "successRate": "95.00"
    },
    "byAction": [
      { "_id": "login_success", "count": 500 },
      { "_id": "login_failed", "count": 20 }
    ],
    "topOffendingIPs": [
      { "_id": "192.168.1.1", "count": 10 }
    ],
    "mostActiveUsers": [
      { "_id": "user_id", "count": 100 }
    ],
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

---

## Rate Limit Headers

All API responses include rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705312800
```

---

## Security Headers

All responses include security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`

---

## Frontend Integration

### Token Storage

The frontend should store both tokens securely:

```typescript
// Store tokens after login
await tokenRefreshService.storeTokens(accessToken, refreshToken);
```

### Token Refresh

Tokens are automatically refreshed by the TokenRefreshService. Manual refresh:

```typescript
await tokenRefreshService.refreshToken();
```

### Logout

```typescript
await tokenRefreshService.clearTokens();
```

### Checking Token Validity

```typescript
const isValid = await tokenRefreshService.isTokenValid();
```
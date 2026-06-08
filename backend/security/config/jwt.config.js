/**
 * JWT Configuration - Production-Grade Security Settings
 * 
 * This module defines secure JWT token configuration including:
 * - Short-lived access tokens (15 minutes)
 * - Long-lived refresh tokens (7 days)
 * - Secure token generation and validation settings
 */

module.exports = {
  // Access Token Configuration
  accessToken: {
    // Short-lived access token - expires in 15 minutes
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    
    // Algorithm for signing access tokens
    algorithm: 'HS256',
    
    // Issuer for access tokens
    issuer: 'ultimatehealth-api',
    
    // Audience for access tokens
    audience: 'ultimatehealth-app',
  },

  // Refresh Token Configuration
  refreshToken: {
    // Long-lived refresh token - expires in 7 days
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    
    // Algorithm for signing refresh tokens
    algorithm: 'HS256',
    
    // Issuer for refresh tokens
    issuer: 'ultimatehealth-api',
    
    // Refresh token prefix for Redis/database storage
    prefix: 'refresh_token:',
  },

  // Token Secret Keys
  secrets: {
    // Access token secret - should be set via environment variable
    accessSecret: process.env.JWT_ACCESS_SECRET || 'your-access-secret-key-change-in-production',
    
    // Refresh token secret - should be set via environment variable
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production',
  },

  // Token Payload Settings
  payload: {
    // Include device fingerprint in token payload
    includeDeviceFingerprint: true,
    
    // Include user agent in token payload
    includeUserAgent: true,
    
    // Include IP address in token payload
    includeIPAddress: true,
  },

  // Security Settings
  security: {
    // Enable token rotation (refresh token changes on each use)
    enableRotation: true,
    
    // Maximum number of refresh tokens per user
    maxTokensPerUser: 5,
    
    // Time window for token reuse detection (in seconds)
    reuseWindow: 0, // 0 means any reuse invalidates all tokens
    
    // Blacklist grace period (seconds after expiry before blacklist check)
    blacklistGracePeriod: 0,
  },

  // Cookie Settings (for web clients)
  cookies: {
    // Enable HTTP-only cookies for refresh tokens
    enabled: true,
    
    // Cookie name for access token
    accessCookieName: 'access_token',
    
    // Cookie name for refresh token
    refreshCookieName: 'refresh_token',
    
    // Cookie domain
    domain: process.env.COOKIE_DOMAIN || 'uhsocial.in',
    
    // Cookie path
    path: '/',
    
    // HTTP only flag
    httpOnly: true,
    
    // Secure flag (HTTPS only in production)
    secure: process.env.NODE_ENV === 'production',
    
    // SameSite attribute
    sameSite: 'strict',
    
    // Max age in milliseconds (7 days)
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
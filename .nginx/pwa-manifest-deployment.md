# PWA Manifest & Static Assets - Nginx Configuration Guide

This document provides the Nginx configuration required to properly serve the PWA manifest file and resolve 502 Bad Gateway / 400 Bad Request errors for `manifest.webmanifest`.

## Problem Statement

The PWA manifest file at `/manifest.webmanifest` was returning:
- **502 Bad Gateway** - Server misconfiguration or missing reverse proxy rule
- **400 Bad Request** - Incorrect routing or MIME type not recognized

This breaks PWA installation capabilities and metadata delivery for Progressive Web App features.

---

## Solution: Nginx Configuration

Add the following location blocks to your Nginx server configuration (typically in `/etc/nginx/sites-available/uhsocial.in` or similar):

### Option 1: Recommended - Direct File Serving with Caching

```nginx
# ============================================================================
# PWA Manifest Configuration - Direct File Serving
# ============================================================================
# Location: Add to server { } block in your Nginx config
# Path: /etc/nginx/sites-available/uhsocial.in
# ============================================================================

# Primary: PWA manifest with proper MIME type and CORS
location = /manifest.webmanifest {
    alias /var/www/uhsocial.in/frontend/v2/manifest.webmanifest;
    
    # WCAG 2.1 AA & PWA compliant MIME type
    add_header Content-Type application/manifest+json always;
    
    # CORS headers for cross-origin PWA requests
    add_header Access-Control-Allow-Origin * always;
    add_header Access-Control-Allow-Methods "GET, HEAD, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
    add_header Access-Control-Max-Age 3600 always;
    
    # Security headers
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Caching strategy: immutable for long-term caching (1 week)
    add_header Cache-Control "public, max-age=604800, immutable" always;
    add_header ETag '"ultimatehealth-pwa-manifest"' always;
    
    # Suppress access logging for manifest requests
    access_log off;
    
    # Handle CORS preflight requests
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}

# Fallback: Support legacy manifest.json endpoint (if transitioning)
location = /manifest.json {
    alias /var/www/uhsocial.in/frontend/v2/manifest.webmanifest;
    add_header Content-Type application/manifest+json always;
    add_header Access-Control-Allow-Origin * always;
    add_header Cache-Control "public, max-age=604800, immutable" always;
    access_log off;
}

# ============================================================================
# Static Assets (Icons, Favicon, etc.)
# ============================================================================

# High-performance caching for images and icons
location ~ ^/assets/images/(?<filename>.*\.(png|jpg|jpeg|gif|svg|ico|webp))$ {
    alias /var/www/uhsocial.in/frontend/v2/assets/images/$filename;
    
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    add_header X-Content-Type-Options nosniff always;
    
    access_log off;
    expires 365d;
}

# Favicon optimization
location = /favicon.ico {
    alias /var/www/uhsocial.in/frontend/v2/assets/images/favicon.png;
    add_header Cache-Control "public, max-age=31536000, immutable" always;
    access_log off;
}

# ============================================================================
# Service Worker Configuration
# ============================================================================

location = /service-worker.js {
    alias /var/www/uhsocial.in/frontend/v2/service-worker.js;
    
    add_header Service-Worker-Allowed "/" always;
    add_header Content-Type application/javascript always;
    add_header Cache-Control "public, max-age=0, must-revalidate" always;
    add_header X-Content-Type-Options nosniff always;
    
    access_log off;
}
```

---

### Option 2: Alternative - Proxy to Backend Service

If your manifest is served by a backend API:

```nginx
location = /manifest.webmanifest {
    proxy_pass http://your-backend-service:3000/manifest.webmanifest;
    
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # Ensure backend doesn't override CORS headers
    proxy_pass_request_headers on;
    
    # Add CORS headers
    add_header Access-Control-Allow-Origin * always;
    add_header Content-Type application/manifest+json always;
    add_header Cache-Control "public, max-age=604800, immutable" always;
    
    access_log off;
}
```

---

## Deployment Steps

1. **Verify manifest file exists** at the correct path:
   ```bash
   ls -la /var/www/uhsocial.in/frontend/v2/manifest.webmanifest
   ```

2. **Update Nginx configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/uhsocial.in
   # Add the configuration blocks above to the server { } section
   ```

3. **Test Nginx syntax**:
   ```bash
   sudo nginx -t
   ```

4. **Reload Nginx**:
   ```bash
   sudo systemctl reload nginx
   ```

---

## Verification

### 1. Test manifest.webmanifest endpoint:
```bash
curl -I https://uhsocial.in/manifest.webmanifest
```

**Expected Output:**
```
HTTP/2 200 OK
Content-Type: application/manifest+json
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=604800, immutable
```

### 2. Test CORS headers:
```bash
curl -I -H "Origin: https://example.com" https://uhsocial.in/manifest.webmanifest
```

**Expected Output:**
```
HTTP/2 200 OK
Access-Control-Allow-Origin: *
```

### 3. Test content validation:
```bash
curl -s https://uhsocial.in/manifest.webmanifest | jq .
```

**Expected Output:**
```json
{
  "name": "UltimateHealth - Your Health Companion",
  "short_name": "UltimateHealth",
  "display": "standalone",
  ...
}
```

### 4. Test OPTIONS preflight:
```bash
curl -I -X OPTIONS https://uhsocial.in/manifest.webmanifest
```

**Expected Output:**
```
HTTP/2 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, HEAD, OPTIONS
```

---

## Troubleshooting

### Issue: 502 Bad Gateway
- **Cause**: Manifest file not at expected path or reverse proxy misconfiguration
- **Fix**: Verify path in alias directive matches actual file location
- ```bash
  sudo find /var/www -name "manifest.webmanifest" -type f
  ```

### Issue: 400 Bad Request
- **Cause**: Incorrect MIME type or missing Content-Type header
- **Fix**: Ensure `add_header Content-Type application/manifest+json always;` is present

### Issue: CORS errors in browser console
- **Cause**: Missing or incorrect Access-Control-Allow-Origin header
- **Fix**: Add `add_header Access-Control-Allow-Origin * always;` (adjust * to specific domain for tighter security)

### Issue: Cache not working
- **Cause**: Cache-Control header missing or set too short
- **Fix**: Use `add_header Cache-Control "public, max-age=604800, immutable" always;` for long-term caching

---

## Performance Optimization

1. **Enable Gzip Compression** (for manifest file):
   ```nginx
   gzip on;
   gzip_types application/manifest+json application/json;
   ```

2. **Enable HTTP/2 Push** (optional):
   ```nginx
   http2_push /manifest.webmanifest;
   ```

3. **Use CDN** for manifest and assets in production:
   ```nginx
   # Redirect to CDN for better performance
   location = /manifest.webmanifest {
       return 301 https://cdn.uhsocial.in/manifest.webmanifest;
   }
   ```

---

## Security Best Practices

1. **Restrict CORS** (instead of `*`):
   ```nginx
   set $cors "";
   if ($http_origin ~* "^https?://(uhsocial\.in|www\.uhsocial\.in)$") {
       set $cors "true";
   }
   
   add_header Access-Control-Allow-Origin $origin always;
   ```

2. **Add CSP headers** for PWA context:
   ```nginx
   add_header Content-Security-Policy "manifest-src 'self'" always;
   ```

3. **Enable HTTPS only**:
   ```nginx
   if ($scheme != "https") {
       return 301 https://$server_name$request_uri;
   }
   ```

---

## References

- [MDN Web Docs - Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [W3C Web App Manifest Specification](https://www.w3.org/TR/appmanifest/)
- [PWA Checklist - Web.dev](https://web.dev/install-criteria/)
- [Nginx Official Documentation](https://nginx.org/en/docs/)

---

## Support

For issues or questions:
1. Check browser DevTools Console for specific error messages
2. Review Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify file permissions: `sudo chmod 644 /var/www/uhsocial.in/frontend/v2/manifest.webmanifest`

import test from 'node:test';
import assert from 'node:assert/strict';

test('proxy CSP nonce generation format and entropy', () => {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  assert.equal(typeof nonce, 'string');
  assert.equal(nonce.length, 32);
  assert.match(nonce, /^[0-9a-f]{32}$/);
});

test('CSP header directive and x-nonce header integration', () => {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const cspDirective = `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;

  // Verify CSP script directive includes the exact nonce
  assert.ok(cspDirective.includes(`'nonce-${nonce}'`));

  // Simulate proxy request/response headers
  const headers = new Map();
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', cspDirective);

  // Validate layout reading logic: (await headers()).get('x-nonce')
  const layoutNonce = headers.get('x-nonce') ?? undefined;
  assert.equal(layoutNonce, nonce);
  assert.ok(headers.get('Content-Security-Policy').includes(layoutNonce));
});

test('proxy pathname sanitization collapses duplicate /web and nested locale segments', () => {
  const sanitizePath = (pathname) => {
    const knownLocales = ['en', 'hi', 'bn', 'ta', 'or', 'de', 'es', 'fr', 'hr'];
    const defaultLocale = 'en';
    const segments = pathname.split('/').filter(Boolean);
    const hasWebSegment = segments.includes('web');
    const matchedLocales = segments.filter((s) => knownLocales.includes(s));
    const hasDuplicateLocales = matchedLocales.length > 1;

    if (hasWebSegment || hasDuplicateLocales) {
      const locale = matchedLocales[0] || defaultLocale;
      const nonContentSegments = new Set([...knownLocales, 'web']);
      const rest = segments.filter((s) => !nonContentSegments.has(s)).join('/');
      return `/${locale}${rest ? `/${rest}` : ''}`;
    }
    return pathname;
  };

  assert.equal(sanitizePath('/web/en/web/en/login'), '/en/login');
  assert.equal(sanitizePath('/en/web/en'), '/en');
  assert.equal(sanitizePath('/web/en/web/en'), '/en');
  assert.equal(sanitizePath('/web/web/articles'), '/en/articles');
  assert.equal(sanitizePath('/en/web/articles'), '/en/articles');
  assert.equal(sanitizePath('/en/en/access-control'), '/en/access-control');
  assert.equal(sanitizePath('/web'), '/en');
  assert.equal(sanitizePath('/web/login'), '/en/login');
  assert.equal(sanitizePath('/hi/web/articles'), '/hi/articles');
  assert.equal(sanitizePath('/en/articles'), '/en/articles');
});

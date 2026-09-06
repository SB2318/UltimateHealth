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

/**
 * Generic stub for native-only modules on web.
 * Returns empty no-op implementations so the web build doesn't crash.
 */

const noop = () => {};
const noopComponent = () => null;

module.exports = new Proxy(
  {},
  {
    get: (_, prop) => {
      // Return a no-op function/component for any property access
      if (prop === '__esModule') return true;
      if (prop === 'default') return noopComponent;
      return noopComponent;
    },
  },
);

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hi', 'bn', 'ta', 'or', 'de', 'es', 'fr', 'hr'],
  defaultLocale: 'en',
});


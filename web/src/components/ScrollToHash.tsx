'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToHash — mounts on every page and smoothly scrolls to the
 * hash anchor once the page has fully painted. This handles the case
 * where the user navigates from another page (e.g. /contribute → /#purpose)
 * and the hash would otherwise snap instantly or be ignored.
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.replace('#', '');

    // Small delay so the page layout is complete before we scroll
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

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

    const scrollToElement = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    scrollToElement();
    const timer1 = setTimeout(scrollToElement, 150);
    const timer2 = setTimeout(scrollToElement, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  return null;
}

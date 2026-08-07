"use client";

import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { routing } from "@/i18n/routing";
import { BASE_PATH } from "@/lib/basePath";
import { isNavRouteActive } from "@/lib/nav-active.js";

/**
 * Returns a predicate that tells whether an app-relative route (e.g. "/articles")
 * is the one currently being viewed, so the matching navigation entry can be
 * rendered in its active state.
 */
export function useActiveRoute(): (route: string) => boolean {
  const pathname = usePathname();

  return useCallback(
    (route: string) =>
      isNavRouteActive(pathname, route, {
        basePath: BASE_PATH,
        locales: routing.locales,
      }),
    [pathname]
  );
}

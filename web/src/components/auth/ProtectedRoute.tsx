"use client";

/**
 * Gates a client route on an authenticated session.
 *
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 *
 * Children never render for a signed-out visitor: while the session is being
 * checked a loading state shows, and once it resolves to signed-out the user is
 * redirected to the sign-in page with a `next` param so they land back here.
 */

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { withBasePath } from "@/lib/basePath";

interface ProtectedRouteProps {
  children: ReactNode;
  /** Where to send signed-out visitors. Defaults to the sign-in page. */
  redirectTo?: string;
  /** Replaces the built-in spinner while the session is being checked. */
  fallback?: ReactNode;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
  fallback,
}: ProtectedRouteProps) {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status !== "unauthenticated") return;

    const query = searchParams?.toString();
    const next = query ? `${pathname}?${query}` : pathname;
    // `replace` keeps the protected URL out of history, so Back does not bounce
    // the user through a redirect loop.
    router.replace(
      `${withBasePath(redirectTo)}?next=${encodeURIComponent(next ?? "/")}`
    );
  }, [status, router, pathname, searchParams, redirectTo]);

  if (status === "loading") {
    return (
      fallback ?? (
        <div
          className="flex min-h-[50vh] items-center justify-center"
          role="status"
          aria-live="polite"
        >
          <Spinner className="size-6" />
          <span className="sr-only">Checking your session…</span>
        </div>
      )
    );
  }

  if (status === "unauthenticated") {
    // The redirect above is already scheduled; render nothing meanwhile.
    return null;
  }

  return <>{children}</>;
}

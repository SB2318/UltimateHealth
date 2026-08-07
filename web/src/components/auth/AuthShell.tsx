import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/basePath";

/**
 * Shared frame for the sign-in, sign-up and password-reset pages.
 *
 * Keeps the three routes visually identical and on-brand: the landing page's
 * indigo → purple → rose gradient, rendered as soft out-of-focus orbs behind a
 * glass card. Living in one component means a change to the auth look is a
 * change to one file rather than three.
 */

interface AuthShellProps {
  title: string;
  description: ReactNode;
  children: ReactNode;
  /** Rendered under the card — sign-in/sign-up cross links. */
  footer?: ReactNode;
  /** Sign-up needs more room for the professional fieldset. */
  width?: "md" | "lg";
}

export default function AuthShell({
  title,
  description,
  children,
  footer,
  width = "md",
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4! py-12! transition-colors duration-300 dark:bg-[#0b1120]">
      {/* Brand backdrop. Decorative only, so it is hidden from assistive tech
          and skipped entirely when the visitor prefers reduced motion. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-40 size-[30rem] rounded-full bg-gradient-to-br from-[#667eea]/40 to-[#764ba2]/30 blur-[110px] motion-safe:animate-pulse [animation-duration:8s] dark:from-[#667eea]/25 dark:to-[#764ba2]/20" />
        <div className="absolute -bottom-48 -right-28 size-[34rem] rounded-full bg-gradient-to-br from-[#f5576c]/25 to-[#764ba2]/25 blur-[130px] motion-safe:animate-pulse [animation-duration:11s] dark:from-[#f5576c]/15 dark:to-[#764ba2]/20" />
        <div className="absolute left-1/2 top-1/4 size-[26rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/25 to-[#667eea]/20 blur-[120px] dark:from-sky-500/10 dark:to-[#667eea]/10" />
        {/* Faint grid, to stop the gradient reading as an empty wash. */}
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] [background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:56px_56px] dark:[background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)]" />
      </div>

      <div
        className={cn(
          "relative w-full motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500",
          width === "lg" ? "max-w-xl" : "max-w-md"
        )}
      >
        <div className="rounded-3xl border border-white/70 bg-white/85 shadow-[0_28px_80px_-24px_rgba(102,126,234,0.5)] backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col items-center gap-3 px-6! pt-8! text-center sm:px-9!">
            <Link
              href={withBasePath("/")}
              aria-label="UltimateHealth home"
              className="group inline-flex items-center gap-2.5 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] text-sm font-black tracking-tight text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
                UH
              </span>
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-lg font-extrabold text-transparent">
                Ultimate-Health
              </span>
            </Link>

            <h1 className="mt-1! text-2xl! leading-tight! font-extrabold tracking-tight text-slate-900 sm:text-[1.7rem]! dark:text-slate-50">
              {title}
            </h1>
            <p className="max-w-sm text-sm! leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>

            <span
              aria-hidden="true"
              className="mt-1! h-px w-16 rounded-full bg-gradient-to-r from-transparent via-[#667eea]/60 to-transparent"
            />
          </div>

          <div className="px-6! py-7! sm:px-9!">{children}</div>
        </div>

        {footer && (
          <div className="mt-5! text-center text-sm! text-slate-600 dark:text-slate-400">
            {footer}
          </div>
        )}
      </div>
    </main>
  );
}

/** Input styling shared by every auth field, so focus states stay consistent. */
export const authFieldClass =
  "h-11! px-3.5! rounded-xl border-slate-200 bg-white/70 text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus-visible:border-[#667eea] focus-visible:ring-4 focus-visible:ring-[#667eea]/15 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-[#818cf8] dark:focus-visible:ring-[#818cf8]/20";

/** The primary action on every auth form. */
export const authSubmitClass =
  "h-11! w-full rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/35 focus-visible:ring-4 focus-visible:ring-[#667eea]/30 disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none";

/** Label styling, kept here so all three forms match. */
export const authLabelClass =
  "text-[0.8rem]! font-semibold text-slate-700 dark:text-slate-300";

/** Inline field error text. */
export const authErrorClass =
  "text-[0.8rem]! font-medium text-rose-600 dark:text-rose-400";

/** Cross-links under the card and inside footers. */
export const authLinkClass =
  "font-semibold text-[#5b6fe0] underline-offset-4 transition-colors hover:text-[#764ba2] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea]/40 rounded dark:text-[#a5b4fc] dark:hover:text-[#c7d2fe]";

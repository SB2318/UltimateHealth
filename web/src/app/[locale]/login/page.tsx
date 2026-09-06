"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import AuthShell, {
  authFieldClass,
  authLabelClass,
  authLinkClass,
  authSubmitClass,
} from "@/components/auth/AuthShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { safeRedirectPath } from "@/lib/auth/auth-helpers.js";
import { withBasePath } from "@/lib/basePath";

/** Where to land after signing in when no `next` param was supplied. */
const DEFAULT_REDIRECT = "/delete-account";

export default function UserLoginPage() {
  const t = useTranslations("Login");
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    title: string;
    description: string;
    variant?: "default" | "destructive";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({
      title: t("processingTitle"),
      description: t("processingDescription"),
    });
    setLoading(true);

    try {
      // The context stores the session, so the rest of the app sees the user
      // without this page having to know how tokens are persisted.
      const user = await login({ email, password });

      // A 200 with no session is still a failed sign-in — reporting success and
      // redirecting would drop the user on a page that bounces them back.
      if (!user) {
        setMessage({
          title: t("failedTitle"),
          description: t("failedDefaultDescription"),
          variant: "destructive",
        });
        return;
      }

      setMessage({
        title: t("successTitle"),
        description: t("successDescription"),
      });

      // Only same-origin paths are honoured, so a crafted `next` cannot bounce
      // the user to another site after signing in. A leading-slash test is not
      // enough here — see safeRedirectPath for the shapes that defeat it.
      const destination =
        safeRedirectPath(searchParams?.get("next"), window.location.origin) ??
        withBasePath(DEFAULT_REDIRECT);

      setTimeout(() => router.push(destination), 1000);
    } catch (err: unknown) {
      setMessage({
        title: t("failedTitle"),
        description:
          err instanceof Error ? err.message : t("failedDefaultDescription"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const failed = message?.variant === "destructive";

  return (
    <AuthShell
      title={t("heading")}
      description={t("description")}
      footer={
        <>
          New to UltimateHealth?{" "}
          <Link href={withBasePath("/register")} className={authLinkClass}>
            Create an account
          </Link>
        </>
      }
    >
      <form id="loginForm" onSubmit={handleSubmit} className="space-y-5!">
        <div className="space-y-2!">
          <Label htmlFor="email" className={authLabelClass}>
            {t("emailLabel")}
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={authFieldClass}
          />
        </div>

        <div className="space-y-2!">
          <div className="flex items-baseline justify-between gap-3">
            <Label htmlFor="password" className={authLabelClass}>
              {t("passwordLabel")}
            </Label>
            <Link
              href={withBasePath("/forgot-password")}
              className={`${authLinkClass} text-[0.78rem]`}
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className={authFieldClass}
          />
        </div>

        {message && (
          <Alert
            id="msg"
            variant={message.variant}
            role="status"
            className={
              failed
                ? "rounded-xl border-rose-200/70 bg-rose-50/80 dark:border-rose-500/30 dark:bg-rose-500/10"
                : "rounded-xl border-indigo-200/70 bg-indigo-50/80 dark:border-indigo-400/30 dark:bg-indigo-500/10"
            }
          >
            <AlertTitle className="text-[0.85rem] font-semibold">
              {message.title}
            </AlertTitle>
            <AlertDescription className="text-[0.8rem]">
              {message.description}
            </AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          id="login-btn"
          disabled={loading}
          className={authSubmitClass}
        >
          {loading && <Spinner size="sm" className="mr-2" />}
          {loading ? t("submitButtonLoading") : t("submitButton")}
        </Button>
      </form>
    </AuthShell>
  );
}

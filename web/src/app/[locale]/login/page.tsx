"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageWrapper, Section } from "@/components/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  return (
    <Section
      as="main"
      className="flex min-h-screen items-center bg-slate-50 px-4 py-10"
    >
      <PageWrapper className="flex max-w-md justify-center px-0">
        <Card className="w-full rounded-lg shadow-sm">
          <CardHeader className="items-center text-center">
            <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="text-sm font-semibold" aria-hidden="true">
                UH
              </span>
            </div>
            <CardTitle className="text-xl font-semibold">
              <h1>{t("heading")}</h1>
            </CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>

          <form id="loginForm" onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder={t("passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {message && (
                <Alert id="msg" variant={message.variant} role="status">
                  <AlertTitle>{message.title}</AlertTitle>
                  <AlertDescription>{message.description}</AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex-col items-stretch gap-3">
              <Button type="submit" id="login-btn" disabled={loading}>
                {loading && <Spinner size="sm" className="mr-1" />}
                {loading ? t("submitButtonLoading") : t("submitButton")}
              </Button>
              <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
                <Link href={withBasePath("/forgot-password")} className="underline">
                  Forgot password?
                </Link>
                <Link href={withBasePath("/register")} className="underline">
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </PageWrapper>
    </Section>
  );
}
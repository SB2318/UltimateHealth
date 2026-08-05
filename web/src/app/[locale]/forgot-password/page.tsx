"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

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
import {
  isValidEmail,
  isValidOtp,
  validatePassword,
} from "@/lib/auth/auth-helpers.js";
import { withBasePath } from "@/lib/basePath";

/**
 * Reset is two backend calls — `/user/forgotpassword` sends a six-digit OTP,
 * `/user/verifypassword` consumes it — so the page is a two-step form rather
 * than two routes. The email is carried over automatically.
 */
type Step = "request" | "verify";

export default function ForgotPasswordPage() {
  const { requestPasswordReset, resetPassword } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleRequest = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldError(null);

    if (!isValidEmail(email)) {
      setFieldError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const message = await requestPasswordReset(email);
      setNotice(message);
      setStep("verify");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not send the reset code."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerify = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldError(null);

    if (!isValidOtp(otp)) {
      setFieldError("Enter the six-digit code from your email.");
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setFieldError(passwordError);
      return;
    }

    setSubmitting(true);
    try {
      const message = await resetPassword({ email, otp, newPassword });
      setNotice(`${message} Redirecting you to sign in.`);
      setTimeout(() => router.push(withBasePath("/login")), 1200);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Could not reset your password."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section as="main" className="flex min-h-screen items-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <PageWrapper className="flex max-w-md justify-center px-0">
        <Card className="w-full rounded-lg shadow-sm">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl font-semibold">
              <h1>Reset your password</h1>
            </CardTitle>
            <CardDescription>
              {step === "request"
                ? "We'll email you a six-digit code to confirm it's you."
                : `Enter the code sent to ${email} and choose a new password.`}
            </CardDescription>
          </CardHeader>

          <form onSubmit={step === "request" ? handleRequest : handleVerify} noValidate>
            <CardContent className="space-y-4">
              {step === "request" ? (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={Boolean(fieldError)}
                    autoComplete="email"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification code</Label>
                    <Input
                      id="otp"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      aria-invalid={Boolean(fieldError)}
                      autoComplete="one-time-code"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      aria-describedby="new-password-hint"
                      autoComplete="new-password"
                    />
                    <p id="new-password-hint" className="text-sm text-muted-foreground">
                      At least 8 characters, with an uppercase letter, a lowercase
                      letter, a number and a special character.
                    </p>
                  </div>
                </>
              )}

              {fieldError && <p className="text-sm text-destructive">{fieldError}</p>}

              {formError && (
                <Alert variant="destructive" role="alert">
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {notice && (
                <Alert role="status">
                  <AlertTitle>Check your email</AlertTitle>
                  <AlertDescription>{notice}</AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex-col items-stretch gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting && <Spinner size="sm" className="mr-1" />}
                {step === "request"
                  ? submitting
                    ? "Sending code..."
                    : "Send reset code"
                  : submitting
                    ? "Resetting..."
                    : "Reset password"}
              </Button>

              {step === "verify" && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep("request");
                    setNotice(null);
                    setFormError(null);
                    setFieldError(null);
                  }}
                >
                  Use a different email
                </Button>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Remembered it?{" "}
                <Link href={withBasePath("/login")} className="underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </PageWrapper>
    </Section>
  );
}

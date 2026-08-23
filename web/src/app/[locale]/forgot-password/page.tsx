"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import AuthShell, {
  authErrorClass,
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

  // Tracks which input the message belongs to, so aria-invalid lands on the
  // field the user actually has to correct.
  const [fieldError, setFieldError] = useState<{
    field: "email" | "otp" | "newPassword";
    message: string;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleRequest = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldError(null);

    if (!isValidEmail(email)) {
      setFieldError({ field: "email", message: "Enter a valid email address." });
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
      setFieldError({ field: "otp", message: "Enter the six-digit code from your email." });
      return;
    }
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setFieldError({ field: "newPassword", message: passwordError });
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
    <AuthShell
      title="Reset your password"
      description={
        step === "request"
          ? "We'll email you a six-digit code to confirm it's you."
          : `Enter the code sent to ${email} and choose a new password.`
      }
      footer={
        <>
          Remembered it?{" "}
          <Link href={withBasePath("/login")} className={authLinkClass}>
            Sign in
          </Link>
        </>
      }
    >
      {/* Two steps, one route: the backend splits reset across
          /user/forgotpassword and /user/verifypassword. */}
      <ol
        className="mb-6! flex items-center gap-3 text-[0.72rem]! font-semibold tracking-wide text-slate-400 uppercase dark:text-slate-500"
        aria-label="Password reset progress"
      >
        {(["request", "verify"] as const).map((s2, i) => {
          const active = step === s2;
          const done = step === "verify" && s2 === "request";
          return (
            <li key={s2} className="flex flex-1 items-center gap-2">
              <span
                aria-current={active ? "step" : undefined}
                className={
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-[0.7rem]! font-bold transition-colors " +
                  (active || done
                    ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white"
                    : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400")
                }
              >
                {i + 1}
              </span>
              <span className={active ? "text-slate-700 dark:text-slate-200" : undefined}>
                {s2 === "request" ? "Your email" : "New password"}
              </span>
            </li>
          );
        })}
      </ol>

      <form
        onSubmit={step === "request" ? handleRequest : handleVerify}
        noValidate
        className="space-y-5!"
      >
        {step === "request" ? (
          <div className="space-y-2!">
            <Label htmlFor="email" className={authLabelClass}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={fieldError?.field === "email"}
              aria-describedby={fieldError?.field === "email" ? "reset-error" : undefined}
              autoComplete="email"
              placeholder="you@example.com"
              className={authFieldClass}
            />
          </div>
        ) : (
          <>
            <div className="space-y-2!">
              <Label htmlFor="otp" className={authLabelClass}>
                Verification code
              </Label>
              <Input
                id="otp"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                aria-invalid={fieldError?.field === "otp"}
                aria-describedby={fieldError?.field === "otp" ? "reset-error" : undefined}
                autoComplete="one-time-code"
                placeholder="123456"
                className={`${authFieldClass} text-center! text-lg! font-semibold tracking-[0.5em]`}
              />
            </div>

            <div className="space-y-2!">
              <Label htmlFor="newPassword" className={authLabelClass}>
                New password
              </Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                aria-invalid={fieldError?.field === "newPassword"}
                aria-describedby={
                  fieldError?.field === "newPassword"
                    ? "reset-error new-password-hint"
                    : "new-password-hint"
                }
                autoComplete="new-password"
                className={authFieldClass}
              />
              <p
                id="new-password-hint"
                className="text-[0.75rem]! leading-relaxed text-slate-500 dark:text-slate-400"
              >
                At least 8 characters, with an uppercase letter, a lowercase letter, a
                number and a special character.
              </p>
            </div>
          </>
        )}

        {fieldError && (
          <p id="reset-error" role="alert" className={authErrorClass}>
            {fieldError.message}
          </p>
        )}

        {formError && (
          <Alert
            variant="destructive"
            role="alert"
            className="rounded-xl border-rose-200/70 bg-rose-50/80 dark:border-rose-500/30 dark:bg-rose-500/10"
          >
            <AlertTitle className="text-[0.85rem]! font-semibold">
              Something went wrong
            </AlertTitle>
            <AlertDescription className="text-[0.8rem]!">{formError}</AlertDescription>
          </Alert>
        )}

        {notice && (
          <Alert
            role="status"
            className="rounded-xl border-indigo-200/70 bg-indigo-50/80 dark:border-indigo-400/30 dark:bg-indigo-500/10"
          >
            <AlertTitle className="text-[0.85rem]! font-semibold">
              Check your email
            </AlertTitle>
            <AlertDescription className="text-[0.8rem]!">{notice}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2!">
          <Button type="submit" disabled={submitting} className={authSubmitClass}>
            {submitting && <Spinner size="sm" className="mr-2" />}
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
              className="h-10! w-full rounded-xl text-[0.8rem]! text-slate-600 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:bg-white/5"
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
        </div>
      </form>
    </AuthShell>
  );
}

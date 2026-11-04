"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import AuthShell, {
  authFieldClass,
  authLabelClass,
  authSubmitClass,
} from "@/components/auth/AuthShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { getApiUrl } from "@/lib/api";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    title: string;
    description: string;
    variant?: "default" | "destructive";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage({
        title: "Validation Error",
        description: "Email and password are required.",
        variant: "destructive",
      });
      return;
    }
    setMessage({ title: "Processing", description: "Signing you in." });
    setLoading(true);

    try {
      const res = await fetch(getApiUrl("/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, fcmToken: "web-client-login" }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          title: "Login successful",
          description: "Redirecting to admin account deletion and management.",
        });
        setTimeout(() => router.push("/delete-account-admin"), 1000);
      } else {
        setMessage({
          title: "Login failed",
          description: data.error || data.message || "Please check your details and try again.",
          variant: "destructive",
        });
      }
    } catch (err: unknown) {
      setMessage({
        title: "Server error",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const failed = message?.variant === "destructive";

  return (
    <AuthShell
      title="Admin Login Required"
      description="Authorized administrative portal for UltimateHealth clinical review and management."
    >
      <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
        {/* HIPAA Security Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/90 p-3 text-left text-[0.76rem] text-amber-950 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="leading-relaxed">
            <strong>HIPAA Security Notice (45 CFR § 164.312):</strong> Privileged administrative access. All actions affecting patient personal health logs, Care Team clinical records, and accounts are monitored and logged to an immutable audit trail.
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className={authLabelClass}>
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="Enter administrative email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={authFieldClass}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className={authLabelClass}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="Password"
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
          className={`${authSubmitClass} mt-2`}
        >
          {loading && <Spinner size="sm" className="mr-2" />}
          {loading ? "Logging in..." : "Login"}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Single-Device Authenticated &amp; HIPAA-Compliant Administration</span>
        </div>
      </form>
    </AuthShell>
  );
}

"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ShieldCheck } from "lucide-react";
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
          description: "Redirecting to admin account deletion.",
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
              <h1>Admin Login Required</h1>
            </CardTitle>
            <CardDescription>
              Please log in to continue to account deletion and administration.
            </CardDescription>
          </CardHeader>

          <form id="loginForm" onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* HIPAA Security Warning Banner */}
              <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-left text-[0.76rem] text-amber-900">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div className="leading-relaxed">
                  <strong>HIPAA Security Notice (45 CFR § 164.312):</strong> Privileged administrative access. All actions affecting patient personal health logs, Care Team clinical records, and accounts are monitored and logged to an immutable audit trail.
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
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

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" id="login-btn" disabled={loading} className="w-full">
                {loading && <Spinner size="sm" className="mr-1" />}
                {loading ? "Logging in..." : "Login"}
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-center text-[0.72rem] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Single-Device Authenticated &amp; HIPAA-Compliant Administration</span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </PageWrapper>
    </Section>
  );
}

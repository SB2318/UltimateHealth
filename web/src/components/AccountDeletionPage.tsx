"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageWrapper, Section } from "@/components/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

type AccountDeletionPageProps = {
  apiUrl: string;
  loginPath: string;
  title: string;
  description: string;
  confirmLabel: string;
};

type ApiErrorBody = {
  error?: string;
  message?: string;
};

export default function AccountDeletionPage({
  apiUrl,
  loginPath,
  title,
  description,
  confirmLabel,
}: AccountDeletionPageProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{
    title: string;
    description: string;
    variant?: "default" | "destructive";
  } | null>(null);

  const readErrorMessage = async (response: Response) => {
    const fallback = "Unable to delete account. Please try again.";

    try {
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const body = (await response.json()) as ApiErrorBody;
        return body.error || body.message || fallback;
      }

      const text = await response.text();
      return text || fallback;
    } catch {
      return fallback;
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setMessage({
      title: "Deleting account",
      description: "Please wait while your request is processed.",
    });

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.replace(loginPath);
          return;
        }

        const errorMessage = await readErrorMessage(response);
        setMessage({
          title: "Deletion failed",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      setMessage({
        title: "Account deleted",
        description: "Redirecting you now.",
      });
      router.replace("/goodbye");
    } catch (error: unknown) {
      setMessage({
        title: "Server error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
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
            <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <span className="text-xl font-semibold" aria-hidden="true">
                !
              </span>
            </div>
            <CardTitle className="text-xl font-semibold">
              <h1>{title}</h1>
            </CardTitle>
            <CardDescription className="leading-6">{description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTitle>Permanent deletion</AlertTitle>
              <AlertDescription>
                This cannot be undone. Your account and all associated data will be
                permanently removed and cannot be recovered.
              </AlertDescription>
            </Alert>

            {message && (
              <Alert variant={message.variant} role="status">
                <AlertTitle>{message.title}</AlertTitle>
                <AlertDescription>{message.description}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" asChild disabled={deleting}>
              <Link href={loginPath}>Cancel</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={deleting}>
                  {deleting && <Spinner size="sm" className="mr-1" />}
                  {deleting ? "Deleting..." : confirmLabel}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive">
                    <span className="text-xl font-semibold" aria-hidden="true">
                      !
                    </span>
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete this account permanently?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently remove the account and all associated
                    data. It cannot be undone, and the data cannot be recovered.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>Keep account</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    disabled={deleting}
                    onClick={handleDeleteAccount}
                  >
                    Yes, delete permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </PageWrapper>
    </Section>
  );
}

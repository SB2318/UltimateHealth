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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import {
  isValidEmail,
  validatePassword,
  validateUserHandle,
  validateUserName,
} from "@/lib/auth/auth-helpers.js";
import { withBasePath } from "@/lib/basePath";

interface FieldErrors {
  user_name?: string;
  user_handle?: string;
  email?: string;
  password?: string;
  contact_detail?: string;
  qualification?: string;
  specialization?: string;
  Years_of_experience?: string;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [userHandle, setUserHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Mirrors the backend rules so problems surface before the round trip.
  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    next.user_name = validateUserName(userName) ?? undefined;
    next.user_handle = validateUserHandle(userHandle) ?? undefined;
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    next.password = validatePassword(password) ?? undefined;

    // Optional for readers, required for doctors.
    if (isDoctor && !contactDetail.trim()) {
      next.contact_detail = "Doctors must provide a contact number.";
    } else if (contactDetail.trim() && !/^\d{10,15}$/.test(contactDetail.trim())) {
      next.contact_detail = "Contact number must be 10 to 15 digits.";
    }

    if (isDoctor) {
      if (qualification.trim().length < 2) {
        next.qualification = "Enter your qualification.";
      }
      if (specialization.trim().length < 2) {
        next.specialization = "Enter your specialization.";
      }
      const years = Number(yearsOfExperience);
      if (!yearsOfExperience.trim() || Number.isNaN(years) || years < 0 || years > 60) {
        next.Years_of_experience = "Enter years of experience between 0 and 60.";
      }
    }

    return Object.fromEntries(
      Object.entries(next).filter(([, value]) => Boolean(value))
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setNotice(null);

    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      const user = await register({
        user_name: userName,
        user_handle: userHandle,
        email,
        password,
        isDoctor,
        contact_detail: contactDetail || undefined,
        qualification: isDoctor ? qualification : undefined,
        specialization: isDoctor ? specialization : undefined,
        Years_of_experience: isDoctor ? Number(yearsOfExperience) : undefined,
      });

      if (user) {
        router.replace(withBasePath("/"));
        return;
      }

      // No session yet: the backend wants the address verified first.
      setNotice(
        "Account created. Check your inbox to verify your email, then sign in."
      );
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section as="main" className="flex min-h-screen items-center bg-slate-50 px-4 py-10 dark:bg-slate-950">
      <PageWrapper className="flex max-w-xl justify-center px-0">
        <Card className="w-full rounded-lg shadow-sm">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl font-semibold">
              <h1>Create your account</h1>
            </CardTitle>
            <CardDescription>
              Join UltimateHealth to publish health knowledge and follow the community.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user_name">Full name</Label>
                <Input
                  id="user_name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  aria-invalid={Boolean(errors.user_name)}
                  aria-describedby={errors.user_name ? "user_name-error" : undefined}
                  autoComplete="name"
                />
                {errors.user_name && (
                  <p id="user_name-error" className="text-sm text-destructive">
                    {errors.user_name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_handle">Handle</Label>
                <Input
                  id="user_handle"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  placeholder="ada_lovelace"
                  aria-invalid={Boolean(errors.user_handle)}
                  aria-describedby={errors.user_handle ? "user_handle-error" : undefined}
                  autoComplete="username"
                />
                {errors.user_handle && (
                  <p id="user_handle-error" className="text-sm text-destructive">
                    {errors.user_handle}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby="password-hint"
                  autoComplete="new-password"
                />
                <p id="password-hint" className="text-sm text-muted-foreground">
                  At least 8 characters, with an uppercase letter, a lowercase letter,
                  a number and a special character.
                </p>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_detail">
                  Contact number{isDoctor ? "" : " (optional)"}
                </Label>
                <Input
                  id="contact_detail"
                  inputMode="numeric"
                  value={contactDetail}
                  onChange={(e) => setContactDetail(e.target.value)}
                  aria-invalid={Boolean(errors.contact_detail)}
                  autoComplete="tel"
                />
                {errors.contact_detail && (
                  <p className="text-sm text-destructive">{errors.contact_detail}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isDoctor"
                  checked={isDoctor}
                  onCheckedChange={(checked) => setIsDoctor(checked === true)}
                />
                <Label htmlFor="isDoctor" className="font-normal">
                  I am a medical professional
                </Label>
              </div>

              {isDoctor && (
                <fieldset className="space-y-4 rounded-md border p-4">
                  <legend className="px-1 text-sm font-medium">
                    Professional details
                  </legend>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      aria-invalid={Boolean(errors.qualification)}
                    />
                    {errors.qualification && (
                      <p className="text-sm text-destructive">{errors.qualification}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      aria-invalid={Boolean(errors.specialization)}
                    />
                    {errors.specialization && (
                      <p className="text-sm text-destructive">{errors.specialization}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="Years_of_experience">Years of experience</Label>
                    <Input
                      id="Years_of_experience"
                      type="number"
                      min={0}
                      max={60}
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      aria-invalid={Boolean(errors.Years_of_experience)}
                    />
                    {errors.Years_of_experience && (
                      <p className="text-sm text-destructive">
                        {errors.Years_of_experience}
                      </p>
                    )}
                  </div>
                </fieldset>
              )}

              {formError && (
                <Alert variant="destructive" role="alert">
                  <AlertTitle>Registration failed</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {notice && (
                <Alert role="status">
                  <AlertTitle>Almost there</AlertTitle>
                  <AlertDescription>{notice}</AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex-col items-stretch gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting && <Spinner size="sm" className="mr-1" />}
                {submitting ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
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

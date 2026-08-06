"use client";

import Link from "next/link";
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

/** Cleared when "I am a medical professional" is unticked. */
const DOCTOR_ONLY_ERRORS = [
  "qualification",
  "specialization",
  "Years_of_experience",
  "contact_detail",
] as const satisfies readonly (keyof FieldErrors)[];

export default function RegisterPage() {
  const { register } = useAuth();

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
      const outcome = await register({
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

      // Sign-up never signs the user in: the address has to be verified first,
      // so the next step is always the inbox and then the login page.
      if (outcome.verificationEmailSent) {
        setNotice(
          `Account created. Check ${email} to verify your address, then sign in.`
        );
      } else {
        setFormError(outcome.message);
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      width="lg"
      title="Create your account"
      description="Join UltimateHealth to publish health knowledge and follow the community."
      footer={
        <>
          Already have an account?{" "}
          <Link href={withBasePath("/login")} className={authLinkClass}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5!">
        <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2!">
                <Label htmlFor="user_name" className={authLabelClass}>
                  Full name
                </Label>
                <Input
                  id="user_name"
                  autoComplete="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  aria-invalid={Boolean(errors.user_name)}
                  aria-describedby={errors.user_name ? "user_name-error" : undefined}
                  className={authFieldClass}
                />
                {errors.user_name && (
                  <p id="user_name-error" role="alert" className={authErrorClass}>
                    {errors.user_name}
                  </p>
                )}
              </div>
              <div className="space-y-2!">
                <Label htmlFor="user_handle" className={authLabelClass}>
                  Handle
                </Label>
                <Input
                  id="user_handle"
                  placeholder="ada_lovelace"
                  autoComplete="username"
                  value={userHandle}
                  onChange={(e) => setUserHandle(e.target.value)}
                  aria-invalid={Boolean(errors.user_handle)}
                  aria-describedby={errors.user_handle ? "user_handle-error" : undefined}
                  className={authFieldClass}
                />
                {errors.user_handle && (
                  <p id="user_handle-error" role="alert" className={authErrorClass}>
                    {errors.user_handle}
                  </p>
                )}
              </div>
        </div>

              <div className="space-y-2!">
                <Label htmlFor="email" className={authLabelClass}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={authFieldClass}
                />
                {errors.email && (
                  <p id="email-error" role="alert" className={authErrorClass}>
                    {errors.email}
                  </p>
                )}
              </div>

        <div className="space-y-2!">
          <Label htmlFor="password" className={authLabelClass}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "password-error password-hint" : "password-hint"
            }
            autoComplete="new-password"
            className={authFieldClass}
          />
          <p
            id="password-hint"
            className="text-[0.75rem]! leading-relaxed text-slate-500 dark:text-slate-400"
          >
            At least 8 characters, with an uppercase letter, a lowercase letter, a
            number and a special character.
          </p>
          {errors.password && (
            <p id="password-error" role="alert" className={authErrorClass}>
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-2!">
          <Label htmlFor="contact_detail" className={authLabelClass}>
            Contact number{isDoctor ? "" : " (optional)"}
          </Label>
          <Input
            id="contact_detail"
            inputMode="numeric"
            value={contactDetail}
            onChange={(e) => setContactDetail(e.target.value)}
            aria-invalid={Boolean(errors.contact_detail)}
            aria-describedby={errors.contact_detail ? "contact_detail-error" : undefined}
            autoComplete="tel"
            className={authFieldClass}
          />
          {errors.contact_detail && (
            <p id="contact_detail-error" role="alert" className={authErrorClass}>
              {errors.contact_detail}
            </p>
          )}
        </div>

        {/* Ticking this reveals the fields the backend requires only of doctors. */}
        <label
          htmlFor="isDoctor"
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white/60 p-3.5! transition-colors hover:border-[#667eea]/50 hover:bg-indigo-50/50 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#818cf8]/50 dark:hover:bg-white/[0.07]"
        >
          <Checkbox
            id="isDoctor"
            checked={isDoctor}
            onCheckedChange={(checked) => {
              const next = checked === true;
              setIsDoctor(next);
              // Errors raised by the doctor-only rules no longer apply, and a
              // "doctors must provide a contact number" message under a field
              // now labelled optional is just confusing.
              if (!next) {
                setErrors((current) => {
                  const remaining = { ...current };
                  for (const key of DOCTOR_ONLY_ERRORS) delete remaining[key];
                  return remaining;
                });
              }
            }}
            className="data-[state=checked]:border-[#667eea] data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-[#667eea] data-[state=checked]:to-[#764ba2]"
          />
          <span className="text-[0.85rem]! font-medium text-slate-700 dark:text-slate-200">
            I am a medical professional
          </span>
        </label>

        {isDoctor && (
          <fieldset className="space-y-4! rounded-2xl border border-[#667eea]/25 bg-indigo-50/40 p-4! motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-300 dark:border-[#818cf8]/20 dark:bg-white/[0.04]">
            <legend className="px-2! text-[0.72rem]! font-bold tracking-wider text-[#5b6fe0] uppercase dark:text-[#a5b4fc]">
              Professional details
            </legend>

              <div className="space-y-2!">
                <Label htmlFor="qualification" className={authLabelClass}>
                  Qualification
                </Label>
                <Input
                  id="qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  aria-invalid={Boolean(errors.qualification)}
                  aria-describedby={errors.qualification ? "qualification-error" : undefined}
                  className={authFieldClass}
                />
                {errors.qualification && (
                  <p id="qualification-error" role="alert" className={authErrorClass}>
                    {errors.qualification}
                  </p>
                )}
              </div>

              <div className="space-y-2!">
                <Label htmlFor="specialization" className={authLabelClass}>
                  Specialization
                </Label>
                <Input
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  aria-invalid={Boolean(errors.specialization)}
                  aria-describedby={errors.specialization ? "specialization-error" : undefined}
                  className={authFieldClass}
                />
                {errors.specialization && (
                  <p id="specialization-error" role="alert" className={authErrorClass}>
                    {errors.specialization}
                  </p>
                )}
              </div>

            <div className="space-y-2!">
              <Label htmlFor="Years_of_experience" className={authLabelClass}>
                Years of experience
              </Label>
              <Input
                id="Years_of_experience"
                type="number"
                min={0}
                max={60}
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                aria-invalid={Boolean(errors.Years_of_experience)}
                aria-describedby={
                  errors.Years_of_experience ? "Years_of_experience-error" : undefined
                }
                className={authFieldClass}
              />
              {errors.Years_of_experience && (
                <p
                  id="Years_of_experience-error"
                  role="alert"
                  className={authErrorClass}
                >
                  {errors.Years_of_experience}
                </p>
              )}
            </div>
          </fieldset>
        )}

        {formError && (
          <Alert
            variant="destructive"
            role="alert"
            className="rounded-xl border-rose-200/70 bg-rose-50/80 dark:border-rose-500/30 dark:bg-rose-500/10"
          >
            <AlertTitle className="text-[0.85rem]! font-semibold">
              Registration failed
            </AlertTitle>
            <AlertDescription className="text-[0.8rem]!">{formError}</AlertDescription>
          </Alert>
        )}

        {notice && (
          <Alert
            role="status"
            className="rounded-xl border-emerald-200/70 bg-emerald-50/80 dark:border-emerald-400/30 dark:bg-emerald-500/10"
          >
            <AlertTitle className="text-[0.85rem]! font-semibold">
              Almost there
            </AlertTitle>
            <AlertDescription className="text-[0.8rem]!">{notice}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" disabled={submitting} className={authSubmitClass}>
          {submitting && <Spinner size="sm" className="mr-2" />}
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}

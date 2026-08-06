"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsent() {
    
const COOKIE_KEY = "cookie-consent";
const t = useTranslations("cookie");
const PRIVACY_POLICY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
const [visible, setVisible] = useState(false);

useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);

    if (!consent) {
        setVisible(true);
    }
}, []);

const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
};

const declineCookies = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
};

if (!visible) return null;
    return (
    <div
  role="dialog"
  aria-modal="true"
  aria-labelledby="cookie-title"
  aria-label="Cookie consent dialog"
  className="
    fixed
    bottom-4
    left-1/2
    -translate-x-1/2
    z-[9999]
    w-[95%]
    max-w-6xl
    rounded-2xl
    border
    border-border
    bg-background/90
    backdrop-blur-xl
    shadow-2xl
    px-8
    py-7
  "
>
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    {/* Left Side */}
    <div className="flex flex-1 items-start gap-5">

      <span className="text-4xl mt-1 shrink-0">
        🍪
      </span>

      <div>

        <p
          id="cookie-title"
          className="text-base leading-7 text-foreground"
        >
          {t("message")}
        </p>

        {PRIVACY_POLICY_URL && (
          <Link
            href={PRIVACY_POLICY_URL}
            className="mt-3 inline-flex text-base font-medium text-primary hover:underline"
          >
            {t("learnMore")}
          </Link>
        )}

      </div>

    </div>

    {/* Right Side */}
    <div className="flex gap-2">

      <Button
        size="lg"
        variant="outline"
        onClick={declineCookies}
      >
        {t("decline")}
      </Button>

      <Button
        autoFocus
        size="lg"
        onClick={acceptCookies}
      >
        {t("accept")}
      </Button>

    </div>

  </div>
</div>
);
}
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = {
  en: { name: "English", flag: "🇬🇧" },
  de: { name: "German", flag: "🇩🇪" },
  es: { name: "Spanish", flag: "🇪🇸" },
  fr: { name: "French", flag: "🇫🇷" },
  hr: { name: "Croatian", flag: "🇭🇷" },
} as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage =
    languages[locale as keyof typeof languages];

  const handleLocaleChange = (
    newLocale: (typeof routing.locales)[number],
  ) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          aria-label={`Current language: ${currentLanguage.name}. Select language`}
        >
          <span aria-hidden="true">
            {currentLanguage.flag}
          </span>

          <span>{currentLanguage.name}</span>

          <span aria-hidden="true">▾</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {routing.locales.map((language) => {
          const languageInfo = languages[language];

          return (
            <DropdownMenuItem
              key={language}
              onSelect={() => handleLocaleChange(language)}
              className={
                locale === language
                  ? "bg-accent font-semibold text-accent-foreground"
                  : ""
              }
              aria-current={
                locale === language ? "true" : undefined
              }
            >
              <span aria-hidden="true">
                {languageInfo.flag}
              </span>

              <span>{languageInfo.name}</span>

              <span className="ml-auto text-xs uppercase text-muted-foreground">
                {language}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

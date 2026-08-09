"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const locales = [
    { code: "en", label: "🇬🇧 English (en)" },
    { code: "de", label: "🇩🇪 German (de)" },
    { code: "es", label: "🇪🇸 Spanish (es)" },
    { code: "fr", label: "🇫🇷 French (fr)" },
    { code: "hr", label: "🇭🇷 Croatian (hr)" },
];

export function LanguageSwitcher() {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        const newPath = pathname.replace(
            new RegExp(`^/${currentLocale}`),
            `/${newLocale}`
        );
        router.replace(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Switch language"
                    className="rounded-full w-9 h-9 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={10}
                className="z-[9999] min-w-[160px] p-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl"
            >
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale.code}
                        onClick={() => handleLocaleChange(locale.code)}
                        className={`cursor-pointer flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${currentLocale === locale.code
                                ? "bg-slate-100 dark:bg-slate-800 font-medium text-blue-600 dark:text-blue-400"
                                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                    >
                        <span>{locale.label}</span>
                        {currentLocale === locale.code && (
                            <Check className="h-4 w-4 ml-2 text-blue-600 dark:text-blue-400" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
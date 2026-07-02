"use client";

import { Languages } from "lucide-react";
import { useLocaleSelector } from "gt-next/client";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className,
  compact = false,
  stretch = false,
}: {
  className?: string;
  compact?: boolean;
  stretch?: boolean;
}) {
  const { locale, locales, setLocale, getLocaleProperties } = useLocaleSelector();
  const [isPending, startTransition] = useTransition();
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (!isSwitching) return;

    const timeoutId = window.setTimeout(() => setIsSwitching(false), 950);
    return () => window.clearTimeout(timeoutId);
  }, [locale, isSwitching]);

  const showLoader = isPending || isSwitching;

  return (
    <div
      className={cn(
        "relative z-30 overflow-hidden border border-white/40 bg-linear-to-b from-pink-500 to-pink-600 text-pink-800 shadow-lg shadow-pink-950/10 backdrop-blur",
        compact ? "rounded-full px-2 py-1" : "rounded-b-2xl border-t-0 px-3 py-2",
        stretch && "w-full",
        className
      )}
    >
      <label className="flex min-w-0 items-center gap-1.5 font-mono text-xs font-extrabold md:gap-2">
        <Languages className={cn("shrink-0 text-white", compact ? "size-3.5" : "size-4")} aria-hidden="true" />
        <span className="sr-only">Choose language</span>
        <select
          value={locale}
          onChange={(event) => {
            const nextLocale = event.target.value;
            setIsSwitching(true);
            startTransition(() => setLocale(nextLocale));
          }}
          aria-label="Choose language"
          disabled={showLoader}
          className={cn(
            "rounded-full border border-pink-200 bg-pink-50 font-extrabold text-pink-800 outline-none transition focus:border-pink-600 focus:ring-2 focus:ring-pink-200 disabled:cursor-wait disabled:opacity-80",
            stretch && "w-full min-w-0",
            compact
              ? stretch
                ? "max-w-none px-2 py-1 text-xs"
                : "w-full max-w-[10.5rem] px-2 py-1 text-xs"
              : "max-w-36 px-2 py-1 text-xs md:max-w-44"
          )}
        >
          {locales.map((localeCode) => {
            const properties = getLocaleProperties(localeCode);
            const label =
              properties.nativeNameWithRegionCode ||
              properties.nativeName ||
              properties.nameWithRegionCode ||
              properties.name ||
              localeCode;

            return (
              <option key={localeCode} value={localeCode}>
                {properties.emoji ? `${properties.emoji} ` : ""}
                {label}
              </option>
            );
          })}
        </select>
      </label>
      {showLoader && (
        <div
          className="absolute inset-x-2 bottom-0 h-0.5 overflow-hidden rounded-full bg-pink-100"
          aria-hidden="true"
        >
          <span className="language-switcher-bar block h-full w-1/2 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500" />
        </div>
      )}
    </div>
  );
}

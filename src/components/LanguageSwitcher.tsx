"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-bg-soft/80 p-1 text-xs font-semibold tracking-wide"
      role="group"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-full px-3 py-1.5 uppercase transition ${
            locale === code
              ? "bg-gold text-bg shadow-sm"
              : "text-muted hover:text-text"
          }`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

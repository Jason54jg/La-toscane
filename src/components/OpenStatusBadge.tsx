"use client";

import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/openingHours";
import { useLocale } from "@/i18n/LocaleProvider";

export function OpenStatusBadge({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!status) {
    return (
      <span
        className="inline-flex h-7 min-w-[4.5rem] items-center rounded-full border border-line bg-bg-soft/60 px-2.5"
        aria-hidden
      />
    );
  }

  const label = status.isOpen ? t.status.open : t.status.closed;
  const detail = status.untilLabel?.[locale];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        status.isOpen
          ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-300"
          : "border-tomato/40 bg-tomato/15 text-red-300"
      }`}
      title={detail ?? label}
      aria-live="polite"
    >
      <span
        className={`size-1.5 shrink-0 rounded-full ${
          status.isOpen ? "bg-emerald-400" : "bg-red-400"
        }`}
      />
      <span>{label}</span>
      {!compact && detail ? (
        <span className="hidden font-normal opacity-80 sm:inline">
          · {detail}
        </span>
      ) : null}
    </span>
  );
}

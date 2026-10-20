"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { restaurant } from "@/data/restaurant";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="section-pad border-t border-line py-10">
      <div className="container-narrow flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl">La Toscane</p>
          <p className="mt-1 text-sm text-muted">
            {restaurant.address}, {restaurant.postalCode} {restaurant.city}
          </p>
          <p className="mt-2 text-xs text-muted">{t.footer.made}</p>
        </div>
        <p className="text-sm text-muted">
          © {year} La Toscane. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

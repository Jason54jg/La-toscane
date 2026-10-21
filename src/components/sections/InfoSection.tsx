"use client";

import { Clock3, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  formatPhoneDisplay,
  phoneTelHref,
  restaurant,
} from "@/data/restaurant";
import { useLocale } from "@/i18n/LocaleProvider";
import { getWeeklyHours } from "@/lib/openingHours";

export function InfoSection() {
  const { locale, t } = useLocale();

  return (
    <section id="infos" className="section-pad py-20 md:py-28">
      <div className="container-narrow grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {t.nav.info}
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            {t.info.title}
          </h2>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4 rounded-3xl border border-line bg-bg-elevated/80 p-5">
              <MapPin className="mt-1 size-5 shrink-0 text-gold" />
              <div>
                <p className="text-sm uppercase tracking-wide text-muted">
                  {t.info.address}
                </p>
                <p className="mt-1 text-lg">
                  {restaurant.address}
                  <br />
                  {restaurant.postalCode} {restaurant.city}
                </p>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-semibold text-gold hover:text-gold-soft"
                >
                  {t.info.maps}
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-3xl border border-line bg-bg-elevated/80 p-5">
              <Clock3 className="mt-1 size-5 shrink-0 text-gold" />
              <div>
                <p className="text-sm uppercase tracking-wide text-muted">
                  {t.info.hours}
                </p>
                <dl className="mt-1 space-y-1">
                  {getWeeklyHours(locale).map((row) => (
                    <div key={row.label} className="flex flex-wrap gap-x-3">
                      <dt className="min-w-[6.5rem] text-muted">{row.label}</dt>
                      <dd className="text-lg">{row.slots}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex gap-4 rounded-3xl border border-line bg-bg-elevated/80 p-5">
              <Phone className="mt-1 size-5 shrink-0 text-gold" />
              <div className="flex-1">
                <p className="text-sm uppercase tracking-wide text-muted">
                  {t.info.phone}
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  {restaurant.phones.map((phone) => (
                    <a
                      key={phone}
                      href={phoneTelHref(phone)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-tomato px-5 py-3 font-semibold text-white transition hover:brightness-110"
                    >
                      <Phone className="size-4" />
                      {formatPhoneDisplay(phone)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-line min-h-[320px]">
          <iframe
            title="La Toscane — Google Maps"
            src="https://maps.google.com/maps?q=65%20Rue%20Saint-Jean%2088300%20Neufch%C3%A2teau&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="absolute inset-0 h-full w-full grayscale-[30%] contrast-110"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-bg/85 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gold backdrop-blur">
            <ShieldCheck className="size-3.5" />
            {t.info.halal}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Bike, Phone, Pizza } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { phoneTelHref, restaurant } from "@/data/restaurant";

export function Hero() {
  const { t } = useLocale();
  const phone = restaurant.phones[0];

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* Image + masque long : disparaît dans le fond sans trait net */}
      <div
        className="hero-media absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-[var(--bg)]/40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(16,14,12,0.35) 28%, rgba(16,14,12,0.82) 62%, var(--bg) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 section-pad container-narrow flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="animate-fade-up max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-gold">
            <Pizza className="size-3.5" />
            {t.hero.tagline}
          </p>
          <h1 className="font-display text-[clamp(3.4rem,12vw,7rem)] leading-[0.9] tracking-tight text-text">
            {t.hero.brand}
          </h1>
          <p className="mt-5 max-w-xl text-base text-text/85 md:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-bg transition hover:bg-gold-soft"
            >
              {t.hero.ctaMenu}
            </a>
            <a
              href="#menu"
              className="rounded-full border border-line bg-bg/30 px-6 py-3.5 text-sm font-semibold text-text backdrop-blur transition hover:border-gold/50"
            >
              {t.hero.ctaCompose}
            </a>
            <a
              href={phoneTelHref(phone)}
              data-track="call"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-text transition hover:border-gold/50"
            >
              <Phone className="size-4" />
              {t.hero.ctaCall}
            </a>
            {restaurant.uberEatsUrl && (
              <a
                href={restaurant.uberEatsUrl}
                data-track="uber-eats"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-text transition hover:border-gold/50"
              >
                <Bike className="size-4" />
                {t.hero.ctaUberEats}
              </a>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-muted animate-fade-up [animation-delay:120ms]">
          <span>{t.info.open}</span>
          <span>{t.info.halal}</span>
          <span>{restaurant.city}</span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Gift, Truck } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { useLocale } from "@/i18n/LocaleProvider";
import { tLocal } from "@/i18n/dictionaries";
import { formatPrice } from "@/lib/pricing";

export function OffersSection() {
  const { locale, t } = useLocale();

  return (
    <section id="offres" className="section-pad py-20 md:py-24">
      <div className="container-narrow">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {t.nav.offers}
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            {t.offers.title}
          </h2>
          <p className="mt-3 text-muted">{t.offers.subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {restaurant.promos.map((promo, index) => (
            <article
              key={index}
              className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-bg-elevated to-bg-soft p-6 md:p-8"
            >
              <Gift className="mb-4 size-8 text-gold" />
              <p className="font-display text-2xl leading-snug md:text-3xl">
                {tLocal(promo, locale)}
              </p>
            </article>
          ))}
        </div>

        <div id="livraison" className="mt-8 rounded-3xl border border-line bg-bg-elevated/80 p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Truck className="size-7 text-ember" />
            <div>
              <h3 className="font-display text-3xl">{t.delivery.title}</h3>
              <p className="text-sm text-muted">{t.delivery.subtitle}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {restaurant.delivery.zones.map((zone) => (
              <div
                key={zone.minOrder}
                className="rounded-2xl border border-line bg-bg-soft/70 px-4 py-5"
              >
                <p className="text-sm text-muted">{tLocal(zone.label, locale)}</p>
                <p className="mt-2 text-sm text-muted">{t.delivery.minOrder}</p>
                <p className="font-display text-2xl text-gold">
                  {formatPrice(zone.minOrder, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

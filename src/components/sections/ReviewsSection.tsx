"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { googleRating, reviews as fallbackReviews } from "@/data/reviews";
import type { Review } from "@/data/reviews";
import type { ReviewsPayload } from "@/lib/googleReviews";
import { useLocale } from "@/i18n/LocaleProvider";
import { tLocal } from "@/i18n/dictionaries";

const initial: ReviewsPayload = {
  score: googleRating.score,
  count: googleRating.count,
  mapsUrl: googleRating.mapsUrl,
  reviews: fallbackReviews,
  source: "fallback",
  fetchedAt: "",
};

/**
 * Tente /api/reviews (live Places si clé).
 * Sur GitHub Pages (statique) : l’API n’existe pas → fallback silencieux.
 */
export function ReviewsSection() {
  const { locale, t } = useLocale();
  const [data, setData] = useState<ReviewsPayload>(initial);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const res = await fetch(`${base}/api/reviews`);
        if (!res.ok) return;
        const json = (await res.json()) as ReviewsPayload;
        if (!cancelled) setData(json);
      } catch {
        // Pages statiques / hors-ligne : on garde le fallback
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const displayReviews: Review[] = data.reviews.slice(0, 3);

  return (
    <section id="avis" className="section-pad py-20 md:py-24">
      <div className="container-narrow">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              {t.nav.reviews}
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">
              {t.reviews.title}
            </h2>
            <p className="mt-3 text-muted">{t.reviews.subtitle}</p>
          </div>

          <a
            href={data.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-4 rounded-3xl border border-line bg-bg-elevated/90 px-5 py-4 transition hover:border-gold/40"
          >
            <div className="text-center">
              <p className="font-display text-4xl leading-none text-gold">
                {locale === "fr"
                  ? data.score.toFixed(1).replace(".", ",")
                  : data.score.toFixed(1)}
              </p>
              <div className="mt-1 flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < Math.round(data.score)
                        ? "fill-gold text-gold"
                        : "text-line"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-left text-sm">
              <p className="font-semibold text-text">{t.reviews.google}</p>
              <p className="text-muted">
                {data.count} {t.reviews.count}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-gold">
                {t.reviews.seeAll}
                <ExternalLink className="size-3" />
              </p>
            </div>
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayReviews.map((review, index) => (
            <article
              key={review.id}
              className="rounded-3xl border border-line bg-bg-elevated/70 p-6 animate-fade-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < review.rating
                          ? "fill-gold text-gold"
                          : "text-line"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
                  Google
                </span>
              </div>
              <p className="text-base leading-relaxed text-text/90">
                “{tLocal(review.text, locale)}”
              </p>
              <div className="mt-5 flex items-center justify-between text-sm text-muted">
                <span className="font-semibold text-text">{review.author}</span>
                <time dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString(
                    locale === "fr" ? "fr-FR" : "en-GB",
                    { year: "numeric", month: "short" },
                  )}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

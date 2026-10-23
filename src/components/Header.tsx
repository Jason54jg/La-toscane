"use client";

import { useEffect, useState } from "react";
import { Bike, Menu, Phone, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import { BrandLogo } from "@/components/BrandLogo";
import { CartButton } from "@/components/cart/CartButton";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatPhoneDisplay, phoneTelHref, restaurant } from "@/data/restaurant";

const links = [
  { href: "#offres", key: "offers" as const },
  { href: "#menu", key: "menu" as const },
  { href: "#avis", key: "reviews" as const },
  { href: "#infos", key: "info" as const },
];

export function Header() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const phone = restaurant.phones[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? "border-b border-line bg-bg/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-pad container-narrow flex h-16 items-center justify-between gap-4 md:h-20">
        {/* lg+ : ne rétrécit pas sous son contenu (sinon le badge déborde sur la nav) */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3 lg:shrink-0">
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label="La Toscane — Neufchâteau"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line/90 bg-bg-elevated/95 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06] transition group-hover:border-gold/40 md:size-11">
              <BrandLogo size={36} priority />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-xl tracking-tight text-text sm:text-2xl md:text-[1.65rem]">
                La Toscane
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-gold sm:block">
                Neufchâteau
              </span>
            </span>
          </a>
          {/* Sur petit mobile, le badge est dans le menu déroulant */}
          <div className="hidden sm:block">
            <OpenStatusBadge compact />
          </div>
        </div>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-muted transition hover:text-gold-soft"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={phoneTelHref(phone)}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-line px-3 py-2 text-sm text-text transition hover:border-gold/50 hover:text-gold lg:inline-flex"
          >
            <Phone className="size-4" />
            {formatPhoneDisplay(phone)}
          </a>
          {restaurant.uberEatsUrl && (
            <a
              href={restaurant.uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-line px-3 py-2 text-sm text-text transition hover:border-gold/50 hover:text-gold sm:inline-flex"
              aria-label={t.hero.ctaUberEats}
              title={t.hero.ctaUberEats}
            >
              <Bike className="size-4" />
              <span className="hidden xl:inline">Uber Eats</span>
            </a>
          )}
          <CartButton />
          <button
            type="button"
            className="inline-flex rounded-full border border-line p-2 text-text lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg/95 px-4 py-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-3">
            <OpenStatusBadge />
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-base text-text hover:bg-bg-soft"
              >
                {t.nav[link.key]}
              </a>
            ))}
            <a
              href={phoneTelHref(phone)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-tomato px-4 py-3 font-semibold text-white"
            >
              <Phone className="size-4" />
              {formatPhoneDisplay(phone)}
            </a>
            {restaurant.uberEatsUrl && (
              <a
                href={restaurant.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-4 py-3 font-semibold text-text"
              >
                <Bike className="size-4" />
                {t.hero.ctaUberEats}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CartButton } from "@/components/cart/CartButton";
import { useLocale } from "@/i18n/LocaleProvider";
import { formatPhoneDisplay, phoneTelHref, restaurant } from "@/data/restaurant";

const links = [
  { href: "#menu", key: "menu" as const },
  { href: "#offres", key: "offers" as const },
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
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-text md:text-3xl">
            La Toscane
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-gold sm:inline">
            Neufchâteau
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition hover:text-gold-soft"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={phoneTelHref(phone)}
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 text-sm text-text transition hover:border-gold/50 hover:text-gold md:inline-flex"
          >
            <Phone className="size-4" />
            {formatPhoneDisplay(phone)}
          </a>
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
          </div>
        </div>
      )}
    </header>
  );
}

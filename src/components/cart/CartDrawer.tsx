"use client";

import { useState } from "react";
import { Bike, Check, Copy, Minus, Plus, Phone, Trash2, X } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { tLocal } from "@/i18n/dictionaries";
import { getMenuItem } from "@/data/menu";
import { buildSelectionSummary, formatPrice } from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";
import {
  formatPhoneDisplay,
  phoneTelHref,
  restaurant,
} from "@/data/restaurant";
import type { CartItem, Locale } from "@/types/menu";

/** Résumé recalculé dans la langue courante (repli : texte figé à l’ajout) */
function itemSummary(item: CartItem, locale: Locale) {
  const menuItem = getMenuItem(item.menuItemId);
  return menuItem
    ? buildSelectionSummary(menuItem, item.selection, locale)
    : item.summary;
}

export function CartDrawer() {
  const { locale, t } = useLocale();
  const { items, isOpen, closeCart, removeItem, updateQuantity, clear, total } =
    useCartStore();
  const [copied, setCopied] = useState(false);
  const phone = restaurant.phones[0];
  const amount = total();

  if (!isOpen) return null;

  const orderText =
    items
      .map((item) => {
        const summary = itemSummary(item, locale);
        return `• ${tLocal(item.name, locale)} x${item.quantity} — ${formatPrice(item.unitPrice * item.quantity, locale)}${summary ? ` (${summary})` : ""}`;
      })
      .join("\n") + `\n\nTotal: ${formatPrice(amount, locale)}`;

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible (contexte non sécurisé) : rien à faire
    }
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label={t.configurator.close}
        onClick={closeCart}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-bg-elevated shadow-[var(--shadow)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-2xl">{t.cart.title}</h2>
            <p className="text-sm text-muted">
              {items.length} {t.cart.items}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-line p-2 text-muted hover:text-text"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 scrollbar-thin">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-line bg-bg-soft/50 px-4 py-8 text-center text-muted">
              {t.cart.empty}
            </p>
          ) : (
            items.map((item) => {
              const summary = itemSummary(item, locale);
              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-line bg-bg-soft/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{tLocal(item.name, locale)}</h3>
                      {summary && (
                        <p className="mt-1 text-xs text-muted">{summary}</p>
                      )}
                      <p className="mt-2 text-sm text-gold">
                        {formatPrice(item.unitPrice, locale)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-muted hover:text-tomato"
                      aria-label={t.cart.remove}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-line p-1"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="rounded-full border border-line p-1"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="size-4" />
                    </button>
                    <span className="ml-auto font-semibold">
                      {formatPrice(item.unitPrice * item.quantity, locale)}
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="space-y-3 border-t border-line px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-muted">{t.cart.total}</span>
            <span className="font-display text-2xl text-gold">
              {formatPrice(amount, locale)}
            </span>
          </div>
          <p className="text-xs text-muted">{t.cart.note}</p>
          <div className="flex gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="rounded-full border border-line px-4 py-3 text-sm text-muted hover:text-text"
              >
                {t.cart.clear}
              </button>
            )}
            <a
              href={phoneTelHref(phone)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-tomato px-4 py-3 font-semibold text-white transition hover:brightness-110"
            >
              <Phone className="size-4" />
              {t.cart.checkout}
            </a>
          </div>
          <div className="flex gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={copyOrder}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-text transition hover:border-gold/50 hover:text-gold"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? t.cart.copied : t.cart.copy}
              </button>
            )}
            {restaurant.uberEatsUrl && (
              <a
                href={restaurant.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-text transition hover:border-gold/50 hover:text-gold"
              >
                <Bike className="size-4" />
                {t.cart.uberEats}
              </a>
            )}
          </div>
          <p className="text-center text-xs text-muted">
            {formatPhoneDisplay(phone)} · {formatPhoneDisplay(restaurant.phones[1])}
          </p>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useLocale } from "@/i18n/LocaleProvider";

export function CartButton() {
  const { t } = useLocale();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={toggleCart}
      className="relative inline-flex items-center gap-2 rounded-full bg-gold px-3 py-2 text-sm font-semibold text-bg transition hover:bg-gold-soft"
      aria-label={t.nav.cart}
    >
      <ShoppingBag className="size-4" />
      <span className="hidden sm:inline">{t.nav.cart}</span>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-tomato text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

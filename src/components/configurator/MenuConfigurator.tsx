"use client";

import { useMemo, useState } from "react";
import { AccessibleDialog } from "@/components/AccessibleDialog";
import { Minus, Plus, X } from "lucide-react";
import {
  pizzaSupplements,
  sauces,
  tacosMeats,
  tacosSupplements,
} from "@/data/menu";
import { useLocale } from "@/i18n/LocaleProvider";
import { tLocal } from "@/i18n/dictionaries";
import {
  buildSelectionSummary,
  computeUnitPrice,
  defaultSelection,
  formatPrice,
  maxMeatsForSize,
} from "@/lib/pricing";
import { useCartStore } from "@/store/cartStore";
import type { CartSelection, MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  onClose: () => void;
}

function Chip({
  active,
  label,
  price,
  onClick,
  disabled,
}: {
  active: boolean;
  label: string;
  price?: number;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-gold bg-gold/15 text-gold-soft"
          : "border-line bg-bg-soft/50 text-text hover:border-gold/40"
      }`}
    >
      {label}
      {typeof price === "number" && price > 0 && (
        <span className="ml-1 text-xs text-muted">
          +{formatPrice(price)}
        </span>
      )}
    </button>
  );
}

export function MenuConfigurator({ item, onClose }: Props) {
  const { locale, t } = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [selection, setSelection] = useState<CartSelection>(() =>
    defaultSelection(item),
  );
  const [quantity, setQuantity] = useState(1);

  const maxMeats = maxMeatsForSize(selection.sizeId);
  const unitPrice = useMemo(
    () => computeUnitPrice(item, selection),
    [item, selection],
  );
  const summary = useMemo(
    () => buildSelectionSummary(item, selection, locale),
    [item, selection, locale],
  );

  const toggleMeat = (id: string) => {
    setSelection((prev) => {
      const current = prev.meats ?? [];
      if (current.includes(id)) {
        return { ...prev, meats: current.filter((m) => m !== id) };
      }
      if (current.length >= maxMeats) {
        return { ...prev, meats: [...current.slice(1), id] };
      }
      return { ...prev, meats: [...current, id] };
    });
  };

  const toggleMulti = (
    key: "sauces" | "supplements",
    id: string,
    max = 99,
  ) => {
    setSelection((prev) => {
      const current = prev[key] ?? [];
      if (current.includes(id)) {
        return { ...prev, [key]: current.filter((x) => x !== id) };
      }
      if (current.length >= max) return prev;
      return { ...prev, [key]: [...current, id] };
    });
  };

  const onSizeChange = (sizeId: string) => {
    setSelection((prev) => {
      const nextMax = maxMeatsForSize(sizeId);
      const meats = (prev.meats ?? []).slice(0, nextMax);
      while (meats.length < nextMax && meats.length < tacosMeats.length) {
        const next = tacosMeats.find((m) => !meats.includes(m.id));
        if (!next) break;
        meats.push(next.id);
      }
      return { ...prev, sizeId, meats };
    });
  };

  const canAdd =
    item.configurator !== "tacos" && item.configurator !== "bowl"
      ? true
      : (selection.meats?.length ?? 0) === maxMeats;

  const handleAdd = () => {
    if (!canAdd) return;
    addItem({
      menuItemId: item.id,
      name: item.name,
      unitPrice,
      quantity,
      selection,
      summary,
    });
    onClose();
  };

  const showMeats =
    item.configurator === "tacos" || item.configurator === "bowl";
  const showPizzaExtras = item.configurator === "pizza";
  const showTacosExtras = showMeats;
  const showSauces = showMeats;

  return (
    <AccessibleDialog onClose={onClose} aria-labelledby="configurator-title" className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        tabIndex={-1}
        aria-label={t.configurator.close}
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-bg-elevated shadow-[var(--shadow)] sm:rounded-3xl">
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gold">
              {t.configurator.title}
            </p>
            <h2 id="configurator-title" className="font-display text-3xl leading-tight">
              {tLocal(item.name, locale)}
            </h2>
            {item.description && (
              <p className="mt-1 text-sm text-muted">
                {tLocal(item.description, locale)}
              </p>
            )}
            {showPizzaExtras && (
              <p className="mt-2 text-xs text-gold/80">
                {t.configurator.baseNote}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.configurator.close}
            className="rounded-full border border-line p-2 text-muted hover:text-text"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 scrollbar-thin">
          {item.sizeOptions && item.sizeOptions.length > 0 && (
            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                {item.configurator === "burger" ||
                item.configurator === "panini" ||
                item.configurator === "sandwich"
                  ? t.configurator.formula
                  : t.configurator.size}
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.sizeOptions.map((opt) => (
                  <Chip
                    key={opt.id}
                    active={selection.sizeId === opt.id}
                    label={`${tLocal(opt.label, locale)} — ${formatPrice(opt.price, locale)}`}
                    onClick={() => onSizeChange(opt.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {showMeats && (
            <section>
              <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted">
                {t.configurator.meats}
              </h3>
              <p className="mb-3 text-xs text-muted">
                {t.configurator.meatsHint(maxMeats)}
              </p>
              <div className="flex flex-wrap gap-2">
                {tacosMeats.map((meat) => (
                  <Chip
                    key={meat.id}
                    active={selection.meats?.includes(meat.id) ?? false}
                    label={tLocal(meat.label, locale)}
                    onClick={() => toggleMeat(meat.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {showSauces && (
            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                {t.configurator.sauces}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sauces.map((sauce) => (
                  <Chip
                    key={sauce.id}
                    active={selection.sauces?.includes(sauce.id) ?? false}
                    label={tLocal(sauce.label, locale)}
                    onClick={() => toggleMulti("sauces", sauce.id, 3)}
                  />
                ))}
              </div>
            </section>
          )}

          {(showPizzaExtras || showTacosExtras) && (
            <section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                {t.configurator.supplements}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(showPizzaExtras ? pizzaSupplements : tacosSupplements).map(
                  (sup) => (
                    <Chip
                      key={sup.id}
                      active={
                        selection.supplements?.includes(sup.id) ?? false
                      }
                      label={tLocal(sup.label, locale)}
                      price={sup.price}
                      onClick={() => toggleMulti("supplements", sup.id)}
                    />
                  ),
                )}
              </div>
            </section>
          )}

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
              {t.configurator.quantity}
            </h3>
            <div className="inline-flex items-center gap-4 rounded-full border border-line bg-bg-soft px-3 py-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="rounded-full p-1"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-6 text-center font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="rounded-full p-1"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </section>
        </div>

        <div className="border-t border-line px-5 py-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-muted">{t.configurator.total}</p>
              {summary && (
                <p className="max-w-[16rem] truncate text-xs text-muted">
                  {summary}
                </p>
              )}
            </div>
            <p className="font-display text-3xl text-gold">
              {formatPrice(unitPrice * quantity, locale)}
            </p>
          </div>
          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            data-track={`add-pizza:${item.id}`}
            className="w-full rounded-full bg-tomato py-3.5 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t.configurator.addToCart}
          </button>
        </div>
      </div>
    </AccessibleDialog>
  );
}

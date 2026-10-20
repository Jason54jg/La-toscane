"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { categoryOrder, getItemsByCategory, menuItems } from "@/data/menu";
import { useLocale } from "@/i18n/LocaleProvider";
import { tLocal } from "@/i18n/dictionaries";
import { formatPrice, startingPrice } from "@/lib/pricing";
import { MenuConfigurator } from "@/components/configurator/MenuConfigurator";
import type { MenuCategoryId, MenuItem } from "@/types/menu";

export function MenuSection() {
  const { locale, t } = useLocale();
  const [category, setCategory] = useState<MenuCategoryId>("pizzas");
  const [pizzaGroup, setPizzaGroup] = useState<"all" | "tomate" | "creme" | "sauce">(
    "all",
  );
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const items = useMemo(() => {
    let list =
      query.trim().length > 0
        ? menuItems.filter((item) => {
            const q = query.toLowerCase();
            return (
              item.name.fr.toLowerCase().includes(q) ||
              item.name.en.toLowerCase().includes(q) ||
              item.description?.fr.toLowerCase().includes(q) ||
              item.description?.en.toLowerCase().includes(q)
            );
          })
        : getItemsByCategory(category);

    if (category === "pizzas" && !query.trim() && pizzaGroup !== "all") {
      list = list.filter((item) => item.group === pizzaGroup);
    }
    return list;
  }, [category, pizzaGroup, query]);

  return (
    <section id="menu" className="section-pad relative py-20 md:py-28">
      <div className="container-narrow">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Menu</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            {t.menu.title}
          </h2>
          <p className="mt-3 text-muted">{t.menu.subtitle}</p>
        </div>

        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.menu.search}
            className="w-full rounded-full border border-line bg-bg-soft/70 py-3.5 pl-11 pr-4 text-sm text-text outline-none ring-gold/40 placeholder:text-muted focus:ring-2"
          />
        </div>

        {!query && (
          <div className="category-scroll-wrap mb-5">
            <div
              className="category-scroll flex gap-2 overflow-x-auto overscroll-x-contain scroll-smooth md:flex-wrap md:overflow-visible"
              role="tablist"
              aria-label={t.menu.title}
            >
              {categoryOrder.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={category === id}
                  onClick={() => setCategory(id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm leading-none transition ${
                    category === id
                      ? "bg-gold font-semibold text-bg"
                      : "border border-line text-muted hover:text-text"
                  }`}
                >
                  {t.categories[id]}
                </button>
              ))}
            </div>
          </div>
        )}

        {category === "pizzas" && !query && (
          <div className="mb-8 flex flex-wrap gap-2">
            {(["all", "tomate", "creme", "sauce"] as const).map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setPizzaGroup(group)}
                className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-wide ${
                  pizzaGroup === group
                    ? "bg-ember/90 text-white"
                    : "bg-bg-soft text-muted"
                }`}
              >
                {t.pizzaGroups[group]}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const price = startingPrice(item);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item)}
                className="group rounded-3xl border border-line bg-bg-elevated/80 p-5 text-left transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-[var(--shadow)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl leading-tight group-hover:text-gold-soft">
                        {tLocal(item.name, locale)}
                      </h3>
                      {item.popular && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold">
                          <Sparkles className="size-3" />
                          {t.menu.popular}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted">
                        {tLocal(item.description, locale)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted">
                    {item.sizeOptions ? t.menu.from : ""}{" "}
                    <span className="font-semibold text-gold">
                      {formatPrice(price, locale)}
                    </span>
                  </span>
                  <span className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-text transition group-hover:border-gold group-hover:text-gold">
                    {item.configurator === "simple"
                      ? t.menu.add
                      : t.menu.configure}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line px-4 py-10 text-center text-muted">
            —
          </p>
        )}
      </div>

      {activeItem && (
        <MenuConfigurator
          item={activeItem}
          onClose={() => setActiveItem(null)}
        />
      )}
    </section>
  );
}

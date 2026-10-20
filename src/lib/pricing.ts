import {
  pizzaSupplements,
  sauces,
  tacosMeats,
  tacosSizes,
  tacosSupplements,
  bowlSizes,
} from "@/data/menu";
import type { CartSelection, MenuItem } from "@/types/menu";

/** Nombre de viandes autorisées selon la taille tacos / bowl */
export function maxMeatsForSize(sizeId: string | undefined): number {
  switch (sizeId) {
    case "m":
    case "1":
      return 1;
    case "l":
    case "2":
      return 2;
    case "xl":
    case "3":
      return 3;
    case "xxl":
      return 4;
    default:
      return 1;
  }
}

export function formatPrice(value: number, locale: "fr" | "en" = "fr"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function getBasePrice(item: MenuItem, selection: CartSelection): number {
  if (item.sizeOptions?.length) {
    const size = item.sizeOptions.find((s) => s.id === selection.sizeId);
    if (size) return size.price;
  }
  return item.price ?? 0;
}

export function getSupplementsTotal(
  item: MenuItem,
  selection: CartSelection,
): number {
  const ids = selection.supplements ?? [];
  if (!ids.length) return 0;

  const catalog =
    item.configurator === "tacos" || item.configurator === "bowl"
      ? tacosSupplements
      : pizzaSupplements;

  return ids.reduce((sum, id) => {
    const opt = catalog.find((s) => s.id === id);
    return sum + (opt?.price ?? 0);
  }, 0);
}

export function computeUnitPrice(
  item: MenuItem,
  selection: CartSelection,
): number {
  return getBasePrice(item, selection) + getSupplementsTotal(item, selection);
}

export function buildSelectionSummary(
  item: MenuItem,
  selection: CartSelection,
  locale: "fr" | "en",
): string {
  const parts: string[] = [];

  if (selection.sizeId && item.sizeOptions) {
    const size = item.sizeOptions.find((s) => s.id === selection.sizeId);
    if (size) parts.push(size.label[locale]);
  }

  if (selection.meats?.length) {
    const labels = selection.meats
      .map((id) => tacosMeats.find((m) => m.id === id)?.label[locale] ?? id)
      .join(", ");
    parts.push(labels);
  }

  if (selection.sauces?.length) {
    const labels = selection.sauces
      .map((id) => sauces.find((s) => s.id === id)?.label[locale] ?? id)
      .join(", ");
    parts.push(labels);
  }

  if (selection.supplements?.length) {
    const catalog =
      item.configurator === "tacos" || item.configurator === "bowl"
        ? tacosSupplements
        : pizzaSupplements;
    const labels = selection.supplements
      .map((id) => catalog.find((s) => s.id === id)?.label[locale] ?? id)
      .join(", ");
    parts.push(`+ ${labels}`);
  }

  return parts.join(" · ");
}

export function defaultSelection(item: MenuItem): CartSelection {
  const sizeId = item.sizeOptions?.[0]?.id;
  const max = maxMeatsForSize(sizeId);

  if (item.configurator === "tacos" || item.configurator === "bowl") {
    return {
      sizeId,
      meats: tacosMeats.slice(0, max).map((m) => m.id),
      sauces: ["algerienne"],
      supplements: [],
    };
  }

  if (
    item.configurator === "pizza" ||
    item.configurator === "burger" ||
    item.configurator === "panini" ||
    item.configurator === "sandwich"
  ) {
    return {
      sizeId,
      supplements: [],
      formula: sizeId === "menu" ? "menu" : "seul",
    };
  }

  return {};
}

export function startingPrice(item: MenuItem): number {
  if (item.sizeOptions?.length) {
    return Math.min(...item.sizeOptions.map((s) => s.price));
  }
  return item.price ?? 0;
}

export { tacosSizes, bowlSizes };

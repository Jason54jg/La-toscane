import type { LocalizedString } from "@/types/menu";

export interface Review {
  id: string;
  author: string;
  rating: number;
  /** Texte FR = citation exacte de l’avis Google (non réécrit) */
  text: LocalizedString;
  date: string;
  source: "google";
}

/**
 * Note / volume Google (fallback sans API).
 * Count aligné sur la fiche Google actuelle (~76 avis).
 */
export const googleRating = {
  score: 4.4,
  count: 76,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=La+Toscane+65+Rue+Saint-Jean+88300+Neufch%C3%A2teau",
};

/**
 * 3 avis Google — texte FR = original mot pour mot.
 * Texte EN = même citation (on ne réécrit pas l’avis client).
 */
export const reviews: Review[] = [
  {
    id: "omayma",
    author: "Omayma Belgacem",
    rating: 5,
    date: "2025-10-01",
    source: "google",
    text: {
      fr: "Très bonne expérience! Les pizzas sont généreuses, bien garnies et surtout savoureuses. Le service est rapide et le personnel très accueillant. Les prix sont raisonnables pour la qualité. Je recommande particulièrement la pizza 4 fromages et les tacos 😍.",
      en: "Très bonne expérience! Les pizzas sont généreuses, bien garnies et surtout savoureuses. Le service est rapide et le personnel très accueillant. Les prix sont raisonnables pour la qualité. Je recommande particulièrement la pizza 4 fromages et les tacos 😍.",
    },
  },
  {
    id: "benjamin",
    author: "Benjamin Schweitzer",
    rating: 5,
    date: "2025-06-01",
    source: "google",
    text: {
      fr: "Passage lundi en début de soirée pour prendre 4 pizzas et 4 tiramisu à emporter pour un repas en famille, nous n'avons pas été déçus. (les quelques fois précédentes non plus d'ailleurs). Temps d'attente plus que raisonnable (malgré qu'ils aient un certain nombre de commandes), personnel super chaleureux et sympathique et surtout, les pizzas étaient chaudes, excellentes (et prédécoupées avec soin !).",
      en: "Passage lundi en début de soirée pour prendre 4 pizzas et 4 tiramisu à emporter pour un repas en famille, nous n'avons pas été déçus. (les quelques fois précédentes non plus d'ailleurs). Temps d'attente plus que raisonnable (malgré qu'ils aient un certain nombre de commandes), personnel super chaleureux et sympathique et surtout, les pizzas étaient chaudes, excellentes (et prédécoupées avec soin !).",
    },
  },
  {
    id: "ouni",
    author: "Ouni Ahmed",
    rating: 5,
    date: "2026-01-19",
    source: "google",
    text: {
      fr: "Je commande des pizzas et sandwich chez eux....rapide et très bon",
      en: "Je commande des pizzas et sandwich chez eux....rapide et très bon",
    },
  },
];

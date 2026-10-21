import type { RestaurantInfo } from "@/types/menu";

/** Informations strictement basées sur le menu papier La Toscane */
export const restaurant: RestaurantInfo = {
  name: "La Toscane",
  address: "65 Rue Saint-Jean",
  city: "Neufchâteau",
  postalCode: "88300",
  phones: ["0329953760", "0672255797"],
  delivery: {
    free: true,
    zones: [
      {
        label: { fr: "Neufchâteau", en: "Neufchâteau" },
        minOrder: 12,
      },
      {
        label: { fr: "5 km – 10 km", en: "5 km – 10 km" },
        minOrder: 20,
      },
      {
        label: { fr: "10 km – 15 km", en: "10 km – 15 km" },
        minOrder: 30,
      },
    ],
  },
  promos: [
    {
      fr: "À emporter 7j/7 : 1 pizza achetée = la 2ᵉ à 6 € (Senior) ou 10 € (Mega)",
      en: "Takeaway 7 days: buy 1 pizza, 2nd at €6 (Senior) or €10 (Mega)",
    },
    {
      fr: "En livraison 7j/7 : 2 pizzas achetées = la 3ᵉ offerte (Senior & Mega)",
      en: "Delivery 7 days: buy 2 pizzas, get the 3rd free (Senior & Mega)",
    },
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=65+Rue+Saint-Jean+88300+Neufch%C3%A2teau",
  facebookUrl: "https://www.facebook.com",
  uberEatsUrl:
    "https://www.ubereats.com/fr/store/la-toscane/TjCPi3fIVfGvSL2r6DRCrw",
  halal: true,
};

export const formatPhoneDisplay = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  }
  return phone;
};

export const phoneTelHref = (phone: string) =>
  `tel:+33${phone.replace(/\D/g, "").slice(1)}`;

/** Types du catalogue et du configurateur La Toscane */

export type Locale = "fr" | "en";

export type MenuCategoryId =
  | "pizzas"
  | "tacos"
  | "burgers"
  | "paninis"
  | "assiettes"
  | "bowls"
  | "salades"
  | "sandwiches"
  | "texmex"
  | "pates"
  | "menus"
  | "enfants"
  | "desserts"
  | "boissons";

export type ConfiguratorKind =
  | "pizza"
  | "tacos"
  | "simple"
  | "bowl"
  | "burger"
  | "panini"
  | "sandwich";

export interface LocalizedString {
  fr: string;
  en: string;
}

export interface PriceOption {
  id: string;
  label: LocalizedString;
  price: number;
}

export interface MenuItem {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  category: MenuCategoryId;
  /** Prix fixe si pas de configuration */
  price?: number;
  tags?: string[];
  /** Sous-groupe (ex. base tomate / crème) */
  group?: string;
  configurator: ConfiguratorKind;
  /** Options de taille / formule liées à cet item */
  sizeOptions?: PriceOption[];
  popular?: boolean;
}

export interface CatalogOption {
  id: string;
  label: LocalizedString;
  price?: number;
  maxFree?: number;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phones: string[];
  delivery: {
    free: boolean;
    zones: { label: LocalizedString; minOrder: number }[];
  };
  promos: LocalizedString[];
  mapsUrl: string;
  facebookUrl?: string;
  halal: boolean;
}

export interface CartSelection {
  sizeId?: string;
  meats?: string[];
  sauces?: string[];
  supplements?: string[];
  formula?: "seul" | "menu";
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: LocalizedString;
  unitPrice: number;
  quantity: number;
  selection: CartSelection;
  summary: string;
}

import type { CatalogOption, MenuItem, PriceOption } from "@/types/menu";

const L = (fr: string, en: string) => ({ fr, en });

/** Tailles pizzas (prix catalogue) */
export const pizzaSizes: PriceOption[] = [
  { id: "senior", label: L("Senior", "Senior"), price: 8.5 },
  { id: "mega", label: L("Mega", "Mega"), price: 12.5 },
  { id: "gigante", label: L("Gigante", "Gigante"), price: 17 },
];

export const pizzaSupplements: CatalogOption[] = [
  { id: "jambon", label: L("Jambon", "Ham"), price: 1.5 },
  { id: "champignons", label: L("Champignons", "Mushrooms"), price: 1.5 },
  { id: "oeuf", label: L("Œuf", "Egg"), price: 1.5 },
  { id: "oignons", label: L("Oignons", "Onions"), price: 1.5 },
  { id: "poivrons", label: L("Poivrons", "Peppers"), price: 1.5 },
  { id: "tomates", label: L("Tomates fraîches", "Fresh tomatoes"), price: 1.5 },
  { id: "thon", label: L("Thon", "Tuna"), price: 2 },
  { id: "viande", label: L("Viande hachée", "Ground meat"), price: 2 },
  { id: "merguez", label: L("Merguez", "Merguez"), price: 2 },
  { id: "chorizo", label: L("Chorizo", "Chorizo"), price: 2 },
  { id: "bacon", label: L("Bacon", "Bacon"), price: 2 },
  { id: "boursin", label: L("Boursin", "Boursin"), price: 2 },
  { id: "bleu", label: L("Bleu", "Blue cheese"), price: 2 },
  { id: "pommes", label: L("Pommes de terre", "Potatoes"), price: 2 },
  { id: "poulet-curry", label: L("Poulet curry", "Curry chicken"), price: 2.5 },
  { id: "saumon", label: L("Saumon fumé", "Smoked salmon"), price: 2.5 },
];

export const tacosSizes: PriceOption[] = [
  { id: "m", label: L("M — 1 viande", "M — 1 meat"), price: 7.5 },
  { id: "l", label: L("L — 2 viandes", "L — 2 meats"), price: 8.5 },
  { id: "xl", label: L("XL — 3 viandes", "XL — 3 meats"), price: 9.5 },
  { id: "xxl", label: L("XXL — 4 viandes", "XXL — 4 meats"), price: 11.5 },
];

export const tacosMeats: CatalogOption[] = [
  { id: "steak", label: L("Steak", "Steak") },
  { id: "nuggets", label: L("Nuggets", "Nuggets") },
  { id: "poulet", label: L("Poulet", "Chicken") },
  { id: "tenders", label: L("Tenders", "Tenders") },
  { id: "merguez", label: L("Merguez", "Merguez") },
  { id: "lardons", label: L("Lardons", "Bacon bits") },
  { id: "kebab", label: L("Kebab", "Kebab") },
  { id: "cordon", label: L("Cordon Bleu", "Cordon Bleu") },
];

export const tacosSupplements: CatalogOption[] = [
  { id: "cheddar", label: L("Cheddar", "Cheddar"), price: 1 },
  { id: "boursin", label: L("Boursin", "Boursin"), price: 1 },
  { id: "chevre", label: L("Chèvre", "Goat cheese"), price: 1 },
  { id: "raclette", label: L("Raclette", "Raclette"), price: 1 },
  { id: "oeuf", label: L("Œuf", "Egg"), price: 1 },
  { id: "olives", label: L("Olives", "Olives"), price: 1 },
];

export const sauces: CatalogOption[] = [
  { id: "algerienne", label: L("Algérienne", "Algerian") },
  { id: "barbecue", label: L("Barbecue", "Barbecue") },
  { id: "blanche", label: L("Blanche", "White") },
  { id: "curry", label: L("Curry", "Curry") },
  { id: "samourai", label: L("Samouraï", "Samurai") },
  { id: "ketchup", label: L("Ketchup", "Ketchup") },
  { id: "brasil", label: L("Brasil", "Brasil") },
  { id: "andalouse", label: L("Andalouse", "Andalouse") },
  { id: "poivre", label: L("Poivre", "Pepper") },
  { id: "mayo", label: L("Mayonnaise", "Mayonnaise") },
  { id: "moutarde", label: L("Moutarde", "Mustard") },
  { id: "harissa", label: L("Harissa", "Harissa") },
];

export const bowlSizes: PriceOption[] = [
  { id: "1", label: L("1 viande", "1 meat"), price: 9 },
  { id: "2", label: L("2 viandes", "2 meats"), price: 11 },
  { id: "3", label: L("3 viandes", "3 meats"), price: 13 },
];

const pizza = (
  id: string,
  nameFr: string,
  nameEn: string,
  group: "tomate" | "creme" | "sauce",
  popular = false,
): MenuItem => ({
  id,
  name: L(nameFr, nameEn),
  category: "pizzas",
  group,
  configurator: "pizza",
  sizeOptions: pizzaSizes,
  popular,
  description:
    group === "tomate"
      ? L("Base tomate, fromage", "Tomato base, cheese")
      : group === "creme"
        ? L("Base crème, fromage", "Cream base, cheese")
        : L("Sauce spéciale, fromage", "Special sauce, cheese"),
});

const simple = (
  id: string,
  category: MenuItem["category"],
  nameFr: string,
  nameEn: string,
  price: number,
  description?: { fr: string; en: string },
  popular = false,
): MenuItem => ({
  id,
  name: L(nameFr, nameEn),
  category,
  price,
  configurator: "simple",
  description,
  popular,
});

export const menuItems: MenuItem[] = [
  // ——— Pizzas base tomate ———
  pizza("marguerita", "Marguerita", "Margherita", "tomate", true),
  pizza("calzone", "Calzone", "Calzone", "tomate"),
  pizza("napolitaine", "Napolitaine", "Napolitan", "tomate"),
  pizza("bretonne", "Bretonne", "Bretonne", "tomate"),
  pizza("las-vegas", "Las Vegas", "Las Vegas", "tomate"),
  pizza("royale", "La Royale", "Royal", "tomate", true),
  pizza("4-fromages", "4 Fromages", "4 Cheeses", "tomate", true),
  pizza("paysanne", "La Paysanne", "Country", "tomate"),
  pizza("rodeo", "La Rodéo", "Rodeo", "tomate"),
  pizza("campione", "La Campione", "Campione", "tomate"),
  pizza("mexicaine", "La Mexicaine", "Mexican", "tomate"),
  pizza("orientale", "Orientale", "Oriental", "tomate"),
  pizza("vegetarienne", "La Végétarienne", "Vegetarian", "tomate"),
  pizza("speciale", "La Spéciale", "House Special", "tomate", true),
  pizza("florence", "Florence", "Florence", "tomate"),
  pizza("cannibale", "Cannibale", "Cannibal", "tomate"),
  pizza("rancho", "La Rancho", "Rancho", "tomate"),
  pizza("fruits-mer", "Fruits de Mer", "Seafood", "tomate"),

  // ——— Pizzas base crème ———
  pizza("boursin", "La Boursin", "Boursin", "creme"),
  pizza("tartiflette", "La Tartiflette", "Tartiflette", "creme", true),
  pizza("vosgienne", "La Vosgienne", "Vosges", "creme"),
  pizza("savoyarde", "La Savoyarde", "Savoyard", "creme", true),
  pizza("raclette", "La Raclette", "Raclette", "creme"),
  pizza("miel", "La Miel", "Honey", "creme"),
  pizza("fermiere", "La Fermière", "Farmhouse", "creme"),
  pizza("norvegienne", "La Norvégienne", "Norwegian", "creme"),
  pizza("fromage-master", "Fromage Master", "Cheese Master", "creme"),

  // ——— Pizzas sauces spéciales ———
  pizza("curry-pizza", "Curry", "Curry", "sauce"),
  pizza("buffalo", "La Buffalo", "Buffalo", "sauce"),
  pizza("samourai-pizza", "La Samouraï", "Samurai", "sauce"),

  // ——— Tacos (configurateur) ———
  {
    id: "tacos-custom",
    name: L("Composer mon tacos", "Build my tacos"),
    description: L(
      "Choisissez la taille, les viandes, sauces et suppléments",
      "Choose size, meats, sauces and extras",
    ),
    category: "tacos",
    configurator: "tacos",
    sizeOptions: tacosSizes,
    popular: true,
  },

  // ——— Paninis ———
  {
    id: "panini-4fromages",
    name: L("4 Fromages", "4 Cheeses"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  {
    id: "panini-poulet",
    name: L("Poulet", "Chicken"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  {
    id: "panini-saumon",
    name: L("Saumon", "Salmon"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  {
    id: "panini-lardons",
    name: L("Lardons", "Bacon bits"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  {
    id: "panini-merguez",
    name: L("Merguez", "Merguez"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  {
    id: "panini-viande",
    name: L("Viande hachée", "Ground meat"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  {
    id: "panini-jambon",
    name: L("Jambon", "Ham"),
    category: "paninis",
    configurator: "panini",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 6 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 8 },
    ],
  },
  simple("panini-nutella", "paninis", "Panini Nutella", "Nutella Panini", 4),

  // ——— Assiettes ———
  simple("assiette-curry", "assiettes", "Poulet Curry", "Curry Chicken", 12, undefined, true),
  simple("assiette-cordon", "assiettes", "Cordon Bleu", "Cordon Bleu", 12),
  simple("assiette-kebab", "assiettes", "Kebab", "Kebab", 11),
  simple("assiette-steaks", "assiettes", "Double Steaks", "Double Steaks", 13),
  simple("assiette-mixte", "assiettes", "Mixte", "Mixed plate", 13),
  {
    id: "cheese-naan",
    name: L("Cheese Naan", "Cheese Naan"),
    description: L(
      "Viande au choix : kebab, tenders, poulet, cordon bleu, steak",
      "Choice of meat: kebab, tenders, chicken, cordon bleu, steak",
    ),
    category: "assiettes",
    price: 8.5,
    configurator: "simple",
    popular: true,
  },

  // ——— Bowls ———
  {
    id: "bowl-custom",
    name: L("Bowl", "Bowl"),
    description: L(
      "Sauce fromage maison — 1, 2 ou 3 viandes",
      "Homemade cheese sauce — 1, 2 or 3 meats",
    ),
    category: "bowls",
    configurator: "bowl",
    sizeOptions: bowlSizes,
    popular: true,
  },

  // ——— Salades ———
  simple("salade-norvegienne", "salades", "Norvégienne", "Norwegian", 8.5),
  simple("salade-chevre", "salades", "Chèvre Chaud", "Warm goat cheese", 8.5),
  simple("salade-parisienne", "salades", "Parisienne", "Parisian", 8.5),
  simple("salade-paysanne", "salades", "Paysanne", "Country", 8.5),
  simple("salade-toscane", "salades", "Toscane", "Tuscany", 8.5, undefined, true),
  simple("salade-kebab", "salades", "Kebab", "Kebab salad", 8.5),

  // ——— Sandwiches ———
  {
    id: "sand-tandoori",
    name: L("Chicken Tandoori", "Chicken Tandoori"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 7 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 9 },
    ],
  },
  {
    id: "sand-curry",
    name: L("Chicken Curry", "Chicken Curry"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 7 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 9 },
    ],
  },
  {
    id: "sand-toscane",
    name: L("Toscane", "Tuscany"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
    popular: true,
  },
  {
    id: "sand-americain",
    name: L("Américain", "American"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "sand-radical",
    name: L("Radical", "Radical"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "sand-boursin",
    name: L("Boursin", "Boursin"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 7 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 9 },
    ],
  },
  {
    id: "sand-4x4",
    name: L("4×4", "4×4"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "sand-merguez",
    name: L("Merguez", "Merguez"),
    category: "sandwiches",
    configurator: "sandwich",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 7 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 9 },
    ],
  },

  // ——— Burgers ———
  {
    id: "burger-cheese",
    name: L("Cheese Burger", "Cheese Burger"),
    description: L("Steak 90 g", "90 g steak"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 7 },
      { id: "menu", label: L("Menu (frites + Coca 33 cl)", "Meal (fries + 33 cl Coke)"), price: 9 },
    ],
  },
  {
    id: "burger-cheese-toscane",
    name: L("Cheese Toscane", "Tuscany Cheese"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
    popular: true,
  },
  {
    id: "burger-big-cheese",
    name: L("Big Cheese", "Big Cheese"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "burger-bacon",
    name: L("Bacon Burger", "Bacon Burger"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "burger-raclette",
    name: L("Raclette Burger", "Raclette Burger"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "burger-chevre",
    name: L("Chèvre Burger", "Goat Cheese Burger"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "burger-chicken",
    name: L("Chicken Burger", "Chicken Burger"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 7 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 9 },
    ],
  },
  {
    id: "burger-grainchy",
    name: L("Grainchy", "Grainchy"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 8 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 10 },
    ],
  },
  {
    id: "burger-big-king-l",
    name: L("Le Big King L", "Big King L"),
    description: L("Steak 180 g", "180 g steak"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "menu", label: L("Menu", "Meal deal"), price: 11 },
    ],
    popular: true,
  },
  {
    id: "burger-big-king-xl",
    name: L("Le Big King XL", "Big King XL"),
    description: L("Steak 180 g", "180 g steak"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "menu", label: L("Menu", "Meal deal"), price: 13 },
    ],
  },
  {
    id: "burger-b1",
    name: L("Burger Maison B1", "House Burger B1"),
    description: L("Steak, œuf, jambon, fromage", "Steak, egg, ham, cheese"),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 10 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 12 },
    ],
  },
  {
    id: "burger-b2",
    name: L("Burger Maison B2", "House Burger B2"),
    description: L(
      "Steak, galette de pomme de terre, bacon, fromage",
      "Steak, potato galette, bacon, cheese",
    ),
    category: "burgers",
    configurator: "burger",
    sizeOptions: [
      { id: "seul", label: L("Seul", "Alone"), price: 10 },
      { id: "menu", label: L("Menu", "Meal deal"), price: 12 },
    ],
  },

  // ——— Tex-Mex ———
  simple("wings-5", "texmex", "Chicken Wings ×5", "Chicken Wings ×5", 5),
  simple("wings-10", "texmex", "Chicken Wings ×10", "Chicken Wings ×10", 9),
  simple("nuggets-6", "texmex", "Nuggets ×6", "Nuggets ×6", 5),
  simple("nuggets-10", "texmex", "Nuggets ×10", "Nuggets ×10", 9),
  simple("mozza", "texmex", "Mozza Sticks", "Mozza Sticks", 5),
  simple("tenders-5", "texmex", "Tenders ×5", "Tenders ×5", 6),
  simple("tenders-10", "texmex", "Tenders ×10", "Tenders ×10", 11),
  simple("onion-rings", "texmex", "Onion Rings", "Onion Rings", 5),
  simple("calamars", "texmex", "Calamars frits", "Fried calamari", 6),
  simple(
    "assiette-texmex",
    "texmex",
    "Assiette Tex-Mex",
    "Tex-Mex platter",
    10,
    L(
      "2 wings, 2 nuggets, 2 onion rings, 2 calamars",
      "2 wings, 2 nuggets, 2 onion rings, 2 calamari",
    ),
    true,
  ),
  simple("frites", "texmex", "Frites", "Fries", 2.5),
  simple("frites-cheddar", "texmex", "Frites Cheddar", "Cheddar fries", 4.5),
  simple("potatoes", "texmex", "Potatoes", "Potato wedges", 3.5),

  // ——— Pâtes ———
  simple(
    "tagliatelles-saumon",
    "pates",
    "Tagliatelles Saumon",
    "Salmon tagliatelle",
    9,
    L("Crème fraîche, saumon, tomates cerises", "Cream, salmon, cherry tomatoes"),
  ),
  simple(
    "tagliatelles-carbonara",
    "pates",
    "Tagliatelles Carbonara",
    "Carbonara tagliatelle",
    9,
    L("Crème fraîche, lardons, œuf", "Cream, bacon bits, egg"),
  ),
  simple(
    "tagliatelles-bolo",
    "pates",
    "Tagliatelles Bolognaise",
    "Bolognese tagliatelle",
    9,
    L("Sauce tomate, basilic, viande hachée", "Tomato sauce, basil, minced meat"),
    true,
  ),
  simple(
    "tagliatelles-poulet",
    "pates",
    "Tagliatelles Poulet",
    "Chicken tagliatelle",
    9,
    L("Crème fraîche, poulet, champignons", "Cream, chicken, mushrooms"),
  ),

  // ——— Menus ———
  simple(
    "menu-1",
    "menus",
    "Menu 1",
    "Deal 1",
    25,
    L("3 pizzas Junior + 1 Maxi Coca", "3 Junior pizzas + 1 Maxi Coke"),
  ),
  simple(
    "menu-2",
    "menus",
    "Menu 2",
    "Deal 2",
    35,
    L("3 pizzas Sénior + 1 Maxi Coca", "3 Senior pizzas + 1 Maxi Coke"),
    true,
  ),
  simple(
    "spicy-1",
    "menus",
    "Menu Spicy 1",
    "Spicy Deal 1",
    15,
    L("3 Wings + 3 Tenders + 3 Chicken spicy + frites + Coca 33 cl", "3 Wings + 3 Tenders + 3 spicy chicken + fries + 33 cl Coke"),
  ),
  simple(
    "spicy-2",
    "menus",
    "Menu Spicy 2",
    "Spicy Deal 2",
    25,
    L("5 Wings + 5 Tenders + 5 Chicken spicy + grande frites + Maxi Coca", "5 Wings + 5 Tenders + 5 spicy chicken + large fries + Maxi Coke"),
  ),
  simple(
    "spicy-3",
    "menus",
    "Menu Spicy 3",
    "Spicy Deal 3",
    35,
    L("8 Wings + 8 Tenders + 8 Chicken spicy + grande frites + Maxi Coca", "8 Wings + 8 Tenders + 8 spicy chicken + large fries + Maxi Coke"),
  ),
  simple(
    "menu-etudiant-a",
    "menus",
    "Menu Étudiant A",
    "Student Deal A",
    8,
    L("Pizza Junior au choix + boisson + frites", "Junior pizza of choice + drink + fries"),
    true,
  ),
  simple(
    "menu-etudiant-b",
    "menus",
    "Menu Étudiant B",
    "Student Deal B",
    8,
    L("Tacos M + Tenders + Nuggets + boisson + frites", "Tacos M + Tenders + Nuggets + drink + fries"),
  ),
  simple(
    "couscous-royale",
    "menus",
    "Couscous Royale",
    "Royal couscous",
    17,
    L(
      "Jeudi soir — commander 24 h à l’avance (aussi Merguez, Poulet, Agneau — prix au téléphone)",
      "Thursday evening — order 24 h ahead (also Merguez, Chicken, Lamb — price by phone)",
    ),
  ),

  // ——— Enfant ———
  simple(
    "menu-enfant",
    "enfants",
    "Menu Enfant",
    "Kids Meal",
    8,
    L(
      "5 Nuggets + frites OU 1 Cheese + frites + Capri-Sun + jouet",
      "5 Nuggets + fries OR 1 Cheese + fries + Capri-Sun + toy",
    ),
  ),

  // ——— Desserts ———
  simple("dessert", "desserts", "Dessert du jour", "Dessert of the day", 4),
  simple("hd-100", "desserts", "Häagen-Dazs 100 ml", "Häagen-Dazs 100 ml", 4),
  simple("hd-500", "desserts", "Häagen-Dazs 500 ml", "Häagen-Dazs 500 ml", 8),

  // ——— Boissons (indicatif) ———
  simple("coca-33", "boissons", "Coca-Cola 33 cl", "Coca-Cola 33 cl", 2),
  simple("maxi-coca", "boissons", "Maxi Coca", "Maxi Coke", 3.5),
  simple("eau", "boissons", "Eau minérale", "Mineral water", 1.5),
];

export const categoryOrder = [
  "pizzas",
  "tacos",
  "burgers",
  "paninis",
  "assiettes",
  "bowls",
  "salades",
  "sandwiches",
  "texmex",
  "pates",
  "menus",
  "enfants",
  "desserts",
  "boissons",
] as const;

export const getMenuItem = (id: string) =>
  menuItems.find((item) => item.id === id);

export const getItemsByCategory = (category: string) =>
  menuItems.filter((item) => item.category === category);

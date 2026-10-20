# La Toscane — Vitrine web V1

Site vitrine moderne pour la pizzeria **La Toscane** (Neufchâteau) : carte interactive, configurateur de commande avec calcul de prix en temps réel, panier, i18n FR/EN et avis Google.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Zustand** (panier persisté)
- **i18n maison** (Context + dictionnaires FR/EN)
- **Lucide React** (icônes)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

## Architecture

```
src/
  app/                 # Layout + page d’accueil
  components/
    cart/              # Bouton + tiroir panier
    configurator/      # Modal composition (pizza, tacos, bowls…)
    sections/          # Hero, Menu, Offres, Avis, Infos
  data/                # Menu, restaurant, avis
  i18n/                # Dictionnaires + LocaleProvider
  lib/pricing.ts       # Calcul prix dynamique
  store/cartStore.ts   # État panier (Zustand + persist)
  types/menu.ts
```

## Fonctionnalités

| Module | Détail |
|--------|--------|
| **Carte** | Toutes les catégories du menu papier (pizzas tomate/crème, tacos, burgers, etc.) |
| **Configurateur** | Tailles, viandes, sauces, suppléments + total live |
| **Panier** | Ajout / quantité / total, finalisation click-to-call |
| **i18n** | Sélecteur FR ↔ EN (persistance `localStorage`) |
| **Livraison & promos** | Données strictes du menu (minima + offres 7j/7) |
## Déploiement — GitHub Pages

Site en **export statique** (`output: "export"`).

- URL : https://jason54jg.github.io/La-toscane/
- Workflow : `.github/workflows/deploy-pages.yml` (push sur `main`)
- En local sans basePath : `npm run dev` (port 3000)
- Build Pages : `NEXT_PUBLIC_BASE_PATH=/La-toscane npm run build` → dossier `out/`

Dans le dépôt GitHub : **Settings → Pages → Source = GitHub Actions**.

> Les routes API (avis live Places) ne marchent pas sur Pages. Pour plus tard : Vercel/Netlify + clé Google.

## Personnalisation rapide

1. **Avis fallback** : `src/data/reviews.ts`
2. **Prix / articles** : `src/data/menu.ts`
3. **Coordonnées** : `src/data/restaurant.ts`

## Notes

- Les commandes sont **indicatives** : validation au téléphone (pas de paiement en ligne en V1).
- Couscous (jeudi soir, commande 24h à l’avance) : à ajouter en entrée dédiée si besoin commercial.
- Images hero : Unsplash (remplaçables par photos du restaurant).

## Licence

Voir `LICENSE`.

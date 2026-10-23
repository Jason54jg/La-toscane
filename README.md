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
## Déploiement

### Local / Vercel (recommandé ensuite)
```bash
npm run dev          # API /api/reviews disponible
npm run build && npm start
```
Avec `GOOGLE_PLACES_API_KEY` dans `.env.local` → note + avis live.

### Docker (VPS)
Image Node standalone (~80 Mo compressée, ~50–100 Mo de RAM), API `/api/reviews` incluse.
```bash
docker compose up -d --build    # http://<ip-du-vps>:3000
docker compose logs -f
docker compose down
```
- Avis live (optionnel) : `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` dans un fichier `.env` à la racine (jamais commité).
- Petit VPS (2 Go) : le build monte à ~1,1 Go de RAM → prévoir un swap de 1–2 Go, puis `docker builder prune -f` pour récupérer le disque.
- Mise à jour : `git pull && docker compose up -d --build`.

### GitHub Pages (temporaire)
- URL : https://jason54jg.github.io/La-toscane/
- **Settings → Pages → Source = GitHub Actions** (déjà configuré)
- Workflow : `.github/workflows/deploy-pages.yml`

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

# GitHub Pages

## Réglage

**Settings → Pages → Source = GitHub Actions**

Le workflow `Deploy GitHub Pages` publie le build Next (`out/`) à chaque push sur `main`.

## URL

https://jason54jg.github.io/La-toscane/

## Vérification locale

`npm run build:pages` utilise la même préparation que GitHub Actions, sans retirer
les sources API. Les pages exportables sont en `.tsx` ; les routes serveur `.ts`
restent disponibles en mode serveur/Docker.

# StoreSnippets – Project Context for Codex

## Objectif
Créer un assistant no-code pour générer, organiser et prévisualiser des snippets CSS/JS/HTML réellement plug & play pour WiziShop, Shopify, WooCommerce, Prestashop, etc.

## Fonctionnalités clés
- Générateur de snippets par prompt + HTML/CSS/JS de la section ciblée
- Sélection du CMS, prise en compte des conventions de chaque plateforme
- Historique, favoris, export/import
- Aperçu live des snippets générés
- Mode “compatibilité totale” (pas de HTML généré pour WiziShop, etc.)

## Contraintes
- Sur WiziShop : snippets = CSS/JS uniquement, jamais de HTML complet. Le code doit se baser sur le markup fourni par l’utilisateur.
- Sur Shopify, WooCommerce : suivre les conventions natives du CMS
- Jamais de code qui casse le responsive ou la structure du site d’origine

## Structure du projet
- /src/pages (Home.tsx, Wireframe.tsx, Palette.tsx…)
- /src/components (SnippetCard.tsx, Preview.tsx…)
- /src/utils (openai.ts…)
- /public

## Bonnes pratiques
- Toujours demander le HTML de la section ciblée si WiziShop
- Utiliser des prompts IA adaptés au CMS
- Ne jamais proposer d’override “en aveugle”
- Toujours fournir un mode d’emploi à l’utilisateur

## Avertissements
- Jamais de génération d’HTML pour WiziShop par défaut
- Toujours vérifier que le code généré est compatible avec le markup fourni
- Refuser toute génération si pas assez d’infos contextuelles

---

À chaque action, Codex doit lire et prendre en compte ce contexte.

# XTL-Chauffage : site vitrine

Site statique (HTML, CSS, un peu de JavaScript) pour XTL-Chauffage, chauffagiste et installateur sanitaire à
Cuesmes (Mons). Réalisé dans le cadre d'un projet scolaire (EAFC).

## Structure

```
index.html · services.html · a-propos.html · realisations.html · contact.html
mentions-legales.html · confidentialite.html · 404.html
css/style.css        Feuille de style unique
contact.js           Formulaire de contact (code fourni, ouvre la messagerie)
js/menu.js           Fermeture du menu mobile
medias/              Images WebP et logo SVG
.nojekyll
```

## Voir le site en local
Ouvrir `index.html` dans un navigateur, ou lancer `python3 -m http.server` dans le dossier.

## Contenu en attente du client
Les éléments non confirmés par le client sont repérables par `grep -rn "data-placeholder" *.html`.

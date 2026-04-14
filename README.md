# Tagesplanung

Minimale Proof-of-Concept-Version einer statischen Startseite für das Projekt.

## Lokal öffnen

Die Seite lässt sich direkt über `index.html` im Browser öffnen.

## Dateien

- `index.html` enthält die sichtbare Minimalversion.
- `styles.css` enthält das responsive Grundlayout.
- `.nojekyll` verhindert unnötige Jekyll-Verarbeitung bei GitHub Pages.
- `.github/workflows/pages.yml` veröffentlicht die statische Seite über GitHub Pages.
- `agents.md` dokumentiert Projektkontext, Entscheidungen und den aktuellen Stand.

## GitHub Pages

Nach dem Push auf den Branch `main` veröffentlicht GitHub Actions die Seite über GitHub Pages.
Für das Repository `mariamw1/Tagesplanung` ist die erwartete URL:

`https://mariamw1.github.io/Tagesplanung/`

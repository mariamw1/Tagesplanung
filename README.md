# Tagesplanung

Statische Proof-of-Concept-Web-App für Zeitplanung und Routinen.

## Lokal öffnen

Die Seite lässt sich direkt über `index.html` im Browser öffnen.

## Dateien

- `index.html` enthält die Oberfläche mit Tabs für Zeitplanung und Routinen.
- `styles.css` enthält Layout, Farben und responsive Darstellung.
- `app.js` enthält die Logik für Tabs, Zeitplanung, Routinen, Bearbeitungsmodus und `sessionStorage`.
- `.nojekyll` verhindert unnötige Jekyll-Verarbeitung bei GitHub Pages.
- `.github/workflows/pages.yml` veröffentlicht die statische Seite über GitHub Pages.
- `agents.md` dokumentiert Projektkontext, Entscheidungen und den aktuellen Stand.

## Aktueller Stand

- Zeitplanung ist der Hauptbereich beim Öffnen der Seite.
- Die Prozentverteilung startet mit `50 / 20 / 10 / 10 / 10`.
- Die Summe muss genau `100 %` ergeben, bevor neu berechnet wird.
- Die Routinen liegen auf derselben Startseite in einem zweiten Tab.
- Der Zustand bleibt nur für die aktuelle Sitzung über `sessionStorage` erhalten.
- Die Routine kann direkt in der Oberfläche bearbeitet werden.

## GitHub Pages

Nach dem Push auf den Branch `main` veröffentlicht GitHub Actions die Seite über GitHub Pages.
Für das Repository `mariamw1/Tagesplanung` ist die erwartete URL:

`https://mariamw1.github.io/Tagesplanung/`

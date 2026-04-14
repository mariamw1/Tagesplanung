# agents.md

## Zweck dieser Datei

Diese Datei ist die gemeinsame Arbeitsgrundlage für dieses Projekt. Sie sammelt Anforderungen, Entscheidungen, Annahmen, offene Punkte und den aktuellen Umsetzungsstand. Sie dient allen nachfolgenden Agents als zentrale Orientierung, damit jederzeit klar ist, was die Grundausrichtung des Projekts ist und was bereits umgesetzt wurde.

## Wichtiger Hinweis für alle nachfolgenden Agenten

Bevor du an diesem Projekt arbeitest, lies diese Datei zuerst vollständig. Alle Agents, die mit diesem Projekt weiterarbeiten, sollen diese Datei als zentrale Orientierung nutzen und ihre Arbeit daran ausrichten.

Pflicht für alle nachfolgenden Agents:

- Diese Datei vor jeder inhaltlichen Arbeit lesen.
- Sich bei jeder weiteren Arbeit an der hier dokumentierten Grundausrichtung, den Anforderungen und dem aktuellen Projektstand orientieren.
- Neue Anforderungen, Entscheidungen und wichtige Erkenntnisse hier zeitnah ergänzen.
- Nach jedem neuen Arbeitsschritt prüfen, ob sich die Grundausrichtung, der Funktionsumfang oder der Projektstand geändert hat.
- Diese Datei nach jedem relevanten neuen Schritt aktualisieren, wenn neue Funktionen hinzugekommen sind, etwas bereits umgesetzt wurde oder sich wichtige Projektentscheidungen verändert haben.
- Bestehende Anforderungen nicht stillschweigend entfernen oder überschreiben.
- Wenn sich Annahmen ändern, die Änderung hier klar dokumentieren.
- Diese Datei als laufendes Projektgedächtnis behandeln.
- In allen Projekttexten und Dokumentationen echte Umlaute verwenden, sofern technisch nichts dagegen spricht.

## Wichtige Aktualisierung vom 14. April 2026

- Das Projekt wurde bewusst noch einmal von vorne gestartet.
- Lokal lag zum Neustart nur diese Datei vor.
- Das Ziel-Repository existiert bereits, war für diesen Neustart aber inhaltlich leer.
- Frühere Notizen zu Tabs, Zeitplanung, Routinen, Session-Storage und bearbeitbaren Listen bleiben als Produktüberlegungen relevant, beschreiben aber nicht mehr den aktuellen Code-Stand.
- Der aktuelle Fokus ist eine absolute Minimalversion als veröffentlichbarer Proof of Concept.

## Aktueller Projektkontext

- Projektordner: `/Users/maria/Desktop/Tagesplanung`
- Ziel-Repository für Veröffentlichung: `https://github.com/mariamw1/Tagesplanung`
- Ziel ist zunächst eine extrem kleine, statische Browser-Seite als Proof of Concept.
- Diese Seite soll über eine feste URL im Browser auf iPhone, iPad und Mac aufrufbar sein.
- Die Lösung soll ohne Backend funktionieren.
- GitHub Pages ist weiterhin der bevorzugte erste Veröffentlichungsweg.
- Die lokale Struktur soll so einfach bleiben, dass spätere Erweiterungen möglich sind.

## Bisher bekannte Anforderungen

### Produktziel

- Es soll eine statische Browser-Seite beziehungsweise kleine Web-App entstehen.
- Die Seite soll so bereitgestellt werden können, dass sie auf iPhone, iPad und Mac direkt per URL geöffnet werden kann.
- Sie soll sich auf Mobilgeräten möglichst wie eine einfache App vom Startbildschirm aus starten lassen.
- Der Einsatzzweck bleibt persönliche Routinen- und Tagesplanung mit möglichst wenig Reibung am Morgen.

### Technische Anforderungen

- Die erste Lösung soll ohne Backend auskommen.
- Die Seite soll als einfache statische Website funktionieren.
- Sie soll lokal testbar bleiben und später leicht über GitHub Pages erreichbar sein.
- Bevorzugt wird eine einfache statische Struktur mit klaren Dateien.

### Aktueller Minimalumfang

- Die erste tatsächlich umgesetzte Neustart-Version enthält nur eine Überschrift und einen Textblock.
- Es gibt noch keine Zeitplanung.
- Es gibt noch keine Routinenlogik.
- Es gibt noch keine lokale Speicherung.
- Es gibt noch keine Tabs oder weiteren Unterseiten.
- Die erste sichtbare Seite ist rein deutschsprachig und bewusst minimal.

### Empfohlene Projektdateien für diese Phase

- `index.html` enthält die sichtbare Minimaloberfläche.
- `styles.css` enthält Layout, Farben und responsive Darstellung.
- `README.md` dokumentiert Zweck, Start und Veröffentlichungsweg.
- `.gitignore` schließt lokale Systemdateien wie `.DS_Store` vom Repository aus.
- `.nojekyll` verhindert bei GitHub Pages eine unnötige Jekyll-Verarbeitung.
- `.github/workflows/pages.yml` veröffentlicht die statische Seite über GitHub Pages.
- `agents.md` bleibt die zentrale Projektorientierung.

## Historische Produktüberlegungen für spätere Ausbaustufen

- Später kann wieder eine zentrale Startseite mit Zeitplanung und Routinen entstehen.
- Die Zeitplanung soll langfristig auf verfügbarer Gesamtzeit und prozentualer Verteilung basieren.
- Die Routinen sollen langfristig als Master-Routine mit klaren, konkret formulierten Schritten gedacht werden.
- Die sichtbare Reihenfolge der Routinen soll sich an realen Abläufen, Wegen und Räumen orientieren.
- Die Anwendung soll langfristig möglichst entscheidungsarm und morgens sehr schnell bedienbar sein.
- Erweiterbarkeit ist wichtiger als frühe Komplexität.

## Arbeitsweise für dieses Projekt

- Zuerst diese Datei aktuell halten und vor jedem neuen Schritt gegen den aktuellen Projektstand prüfen.
- Danach die Projektdateien schrittweise und möglichst modular aufsetzen.
- Zunächst auf eine kleine, klar testbare Version konzentrieren.
- Entscheidungen möglichst so treffen, dass das Projekt einfach lokal testbar und leicht über GitHub Pages veröffentlichbar ist.
- Neue Funktionen erst dann ergänzen, wenn die Grundstruktur stabil und nachvollziehbar ist.
- Nach jeder relevanten Änderung diese Datei mit dem neuen Stand abgleichen und aktualisieren.

## Offene Punkte

- Der lokale Projektordner wurde nach dem Neustart erneut als Git-Repository initialisiert.
- Das Repository ist jetzt wieder mit `origin` auf `https://github.com/mariamw1/Tagesplanung.git` verbunden und der aktuelle Stand liegt auf `main`.
- GitHub Pages ist aktiv und veröffentlicht die Seite unter `https://mariamw1.github.io/Tagesplanung/`.
- Die spätere inhaltliche Struktur für Zeitplanung und Routinen bleibt offen.
- Die genaue Form des Schnellzugriffs auf iPhone, iPad und Mac wird erst relevant, sobald eine feste URL aktiv ist.

## Geklärte Produktentscheidungen

- Der Neustart beginnt absichtlich mit einer absoluten Minimalversion.
- Für diese Phase ist weniger wichtiger als mehr.
- Die erste veröffentlichbare Version soll nur zeigen, dass die URL, die Auslieferung und die Grundstruktur funktionieren.
- Die Seite soll deutschsprachig, ruhig und minimalistisch sein.
- GitHub Pages bleibt der naheliegende erste Hosting-Weg.
- Spätere Funktionen wie Zeitplanung, Routinen, Filterlogik oder Speicherung gehören ausdrücklich nicht in diese erste Neustart-Version.

## Bisher umgesetzt

- `index.html` wurde als minimale Startseite mit einer Überschrift und einem Textblock angelegt.
- `styles.css` wurde als kleine responsive Gestaltungsbasis angelegt.
- `.gitignore` wurde ergänzt, damit lokale Systemdateien nicht mit veröffentlicht werden.
- `.nojekyll` wurde ergänzt.
- `README.md` wurde für die Neustart-Version angelegt.
- `.github/workflows/pages.yml` wurde ergänzt, damit die statische Seite nach einem Push über GitHub Pages veröffentlicht werden kann.
- Das lokale Git-Repository wurde neu initialisiert, auf den Branch `main` gesetzt und mit dem Remote `origin` auf `https://github.com/mariamw1/Tagesplanung.git` verbunden.
- Ein erster lokaler Commit für die Neustart-Minimalversion wurde erstellt.
- Die lokalen Commits wurden erfolgreich nach `origin/main` veröffentlicht.
- GitHub Actions hat die Pages-Bereitstellung erfolgreich ausgeführt.
- Die öffentliche Proof-of-Concept-URL ist `https://mariamw1.github.io/Tagesplanung/`.
- Die Struktur ist damit auf einen sehr kleinen, klaren Proof of Concept reduziert.

## Nächste sinnvolle Schritte

- Die öffentliche URL auf den gewünschten Geräten testen.
- Danach entscheiden, ob als Nächstes Inhalt, Design oder erste echte Fachlogik ergänzt werden soll.
- Danach bei Bedarf schrittweise die erste echte Fachlogik ergänzen.

## Dinge, die der Nutzer selbst erledigen soll

- Im Browser prüfen, ob die Minimalseite inhaltlich und visuell als Startpunkt passt.
- Die veröffentlichte URL auf iPhone, iPad und Mac öffnen und testen.
- Einen Startbildschirm-Link oder vergleichbaren Schnellzugriff einrichten, sobald die feste URL funktioniert.

## Hinweise für nachfolgende Agents zu manuellen Schritten

- Wenn ein neuer Schritt nur mit GitHub-Berechtigungen des Nutzers möglich ist, soll das klar als manueller Schritt dokumentiert werden.
- Manuelle Schritte sollen von technischen Umsetzungsaufgaben der Agents getrennt festgehalten werden.
- Wenn spätere Features aus den historischen Produktüberlegungen wieder aufgenommen werden, soll klar dokumentiert werden, ab wann sie wieder Teil des tatsächlichen Code-Stands sind.

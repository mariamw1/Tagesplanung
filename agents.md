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
- Der aktuelle Fokus ist ein einfacher, statischer Proof of Concept, der bereits wieder erste echte Fachlogik enthält.

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

- Die aktuelle Version enthält wieder eine zentrale Startseite mit zwei Tabs.
- Die Zeitplanung ist der Hauptbereich und wird beim Öffnen zuerst gezeigt.
- Die Routinen liegen direkt auf derselben Seite in einem zweiten Tab.
- Es gibt weiterhin kein Backend und keine dauerhafte Speicherung.
- Der Zustand wird nur temporär über `sessionStorage` gehalten.
- Die Seite ist deutschsprachig, statisch und bewusst einfach gehalten.

### Empfohlene Projektdateien für diese Phase

- `index.html` enthält die sichtbare Minimaloberfläche.
- `styles.css` enthält Layout, Farben und responsive Darstellung.
- `app.js` enthält die Logik für Interaktionen, Zeitplanung und Routinen.
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
- Die vorherige Build-Version wurde inzwischen wieder durch eine bewusst einfache statische Projektstruktur ersetzt.
- Die spätere inhaltliche Struktur für Zeitplanung und Routinen bleibt offen, ist aber jetzt näher an den dokumentierten Produktideen.
- Die genaue Form des Schnellzugriffs auf iPhone, iPad und Mac wird erst relevant, sobald eine feste URL aktiv ist.

## Geklärte Produktentscheidungen

- Der Neustart beginnt absichtlich mit einer absoluten Minimalversion.
- Für diese Phase ist weniger wichtiger als mehr.
- Die erste veröffentlichbare Version soll nur zeigen, dass die URL, die Auslieferung und die Grundstruktur funktionieren.
- Die Seite soll deutschsprachig, ruhig und minimalistisch sein.
- GitHub Pages bleibt der naheliegende erste Hosting-Weg.
- Die technische Basis soll bewusst wieder statisch und einfach lesbar sein, also bevorzugt `index.html`, `styles.css` und `app.js`.
- Temporäre Zustände sollen nur sitzungsbezogen erhalten bleiben, nicht dauerhaft.

## Bisher umgesetzt

- `index.html` wurde zu einer zentralen Startseite mit Tabs für Zeitplanung und Routinen ausgebaut.
- `styles.css` wurde zu einem responsiven Layout für Startseite, Kartenbereiche, Routinen und Bearbeitungsmodus erweitert.
- `app.js` wurde angelegt und enthält die Logik für Tab-Wechsel, Zeitplanung, Ablaufplan, `.ics`-Export, Routinen, Fortschritt, Bearbeitungsmodus und `sessionStorage`.
- `.gitignore` wurde ergänzt, damit lokale Systemdateien nicht mit veröffentlicht werden.
- `.nojekyll` wurde ergänzt.
- `README.md` wurde für die Neustart-Version angelegt.
- `.github/workflows/pages.yml` wurde ergänzt, damit die statische Seite nach einem Push über GitHub Pages veröffentlicht werden kann.
- Das lokale Git-Repository wurde neu initialisiert, auf den Branch `main` gesetzt und mit dem Remote `origin` auf `https://github.com/mariamw1/Tagesplanung.git` verbunden.
- Ein erster lokaler Commit für die Neustart-Minimalversion wurde erstellt.
- Die lokalen Commits wurden erfolgreich nach `origin/main` veröffentlicht.
- GitHub Actions hat die Pages-Bereitstellung erfolgreich ausgeführt.
- Die öffentliche Proof-of-Concept-URL ist `https://mariamw1.github.io/Tagesplanung/`.
- Für den Kontotest wurde zwischenzeitlich eine vorherige Build-Version importiert; diese wurde anschließend wieder durch die einfache statische Projektstruktur ersetzt.
- Die Zeitplanung startet jetzt mit `50 / 20 / 10 / 10 / 10` und prüft weiterhin, ob die Summe genau `100 %` ergibt.
- Die Zeitplanung wurde wieder näher an die frühere, stärker ausgearbeitete Version herangeführt und enthält jetzt wieder Hauptfokus, Nebenfokus, Gegengewicht und einen Ablaufplan ab der aktuellen Zeit.
- Der Ablaufplan der Zeitplanung kann wieder als `.ics` exportiert werden.
- Die Zeitplanung trennt jetzt klarer zwischen allgemeinen Einstellungen und Prozentverteilung.
- Die Fokus-Auswahl für Hauptfokus und Nebenfokus wurde technisch robuster gemacht, damit sie auch mit älteren Sitzungsdaten zuverlässig sichtbar bleibt.
- Die Zwischenübersicht der Minutenblöcke wurde wieder entfernt, damit der Bereich direkter bleibt.
- Im Ablaufplan stehen wieder Bedienknöpfe zum Verschieben und Splitten einzelner Blöcke.
- Allgemeine Einstellungen stehen jetzt kompakter links, die Prozentverteilung rechts.
- Die Zeitplanung zeigt jetzt zusätzlich direkt an, wann der Block ungefähr enden würde.
- Geladene Sitzungsdaten für Zeitplanung und Routine werden robuster normalisiert, damit leere oder ältere Zustände die Oberfläche nicht mehr so leicht aushebeln.
- Die Routine ist jetzt wieder klarer nach Räumen und realem Ablauf gegliedert.
- Die Schritte sind konkreter formuliert und können in der Oberfläche direkt bearbeitet, ergänzt, gelöscht und umsortiert werden.
- Sichtbare Routine-Schritte zeigen nur die eigentlichen Handlungen; die Zuordnung zu Vollroutine, Minimalroutine und später nachholbaren Schritten steuert nur die Auswahl der Ansicht.
- Die aktuellen Eingaben, der aktive Tab, die gesetzten Haken, der Bearbeitungsmodus und die bearbeitete Routine bleiben nur für die aktuelle Sitzung über `sessionStorage` erhalten.

## Nächste sinnvolle Schritte

- Die öffentliche URL auf den gewünschten Geräten testen.
- Prüfen, ob die aktuelle Routinenlogik und die Formulierungen im Alltag schon nah genug am realen Morgenablauf sind.
- Danach entscheiden, ob als Nächstes Inhalt, Design oder weitere Fachlogik ergänzt werden soll.
- Danach bei Bedarf schrittweise die erste echte Fachlogik ergänzen.

## Dinge, die der Nutzer selbst erledigen soll

- Im Browser prüfen, ob Zeitplanung, Tab-Wechsel, Routine-Haken und Bearbeitungsmodus wie gewünscht funktionieren.
- Die veröffentlichte URL auf iPhone, iPad und Mac öffnen und testen.
- Einen Startbildschirm-Link oder vergleichbaren Schnellzugriff einrichten, sobald die feste URL funktioniert.

## Hinweise für nachfolgende Agents zu manuellen Schritten

- Wenn ein neuer Schritt nur mit GitHub-Berechtigungen des Nutzers möglich ist, soll das klar als manueller Schritt dokumentiert werden.
- Manuelle Schritte sollen von technischen Umsetzungsaufgaben der Agents getrennt festgehalten werden.
- Wenn spätere Features aus den historischen Produktüberlegungen wieder aufgenommen werden, soll klar dokumentiert werden, ab wann sie wieder Teil des tatsächlichen Code-Stands sind.

# Weitere Ideen von User
- Weitere Seite: Braindump/-cleanse -> Sammle Ideen und Gedanken, die ich gerade nicht angehen kann, aber an die ich mich erinnern will
evtl. dazu dann auch eine Funktion, die diese Schnipsel/ToDos auf Obsidian oder Erinnerungen übertragen kann (angelehnt an die Funktion von Zeitblockplanung, dass man daraus eine ics datei machen kann)

# NK – Naruto Roleplay · Website

Statische Website im Schwarz-Gelb-Design mit dem NK-Wappen. Sie läuft kostenlos auf **GitHub Pages** und braucht keinen Server und keinen Build-Schritt.

**Design:** tiefschwarze Nacht, Chakra-Gold aus dem Wappen, dunkle Felder mit Goldkante und NK-Siegel. Oben ist eine Kategorie-Leiste mit Icons, alle Kopfbereiche zeigen Konoha bei Nacht, auf der Startseite zündet beim ersten Besuch das Wappen und den Countdown als Briefbomben-Zettel. Leere Bereiche zeigen automatisch eine versiegelte Schriftrolle.

Die Schriften liegen direkt im Repo (`assets/fonts`), es werden also keine Google-Server geladen. Lizenz: SIL Open Font License (Anton, Bitter).

## Seiten (Kategorien oben im Menü)
| Datei | Inhalt |
|---|---|
| `index.html` | Start: Wappen, Countdown (sobald Datum steht), News, Leaks, Ninja des Monats, Dorf-Test |
| `news.html` | News (angepinnte oben) |
| `welt.html` | Welt: interaktive Karte, Dörfer (mit eigener Farbe), Clans, Zeitleiste |
| `wiki.html` | Wiki mit 72 Seiten in 10 Kategorien, Suche, Zurück/Weiter. Inhalte in `assets/js/wiki.js` |
| `regelwerk.html` | Regelwerk mit Paragraphen |
| `team.html` | Team nach Gruppen |
| `galerie.html` | Galerie, Klick öffnet das Bild groß |
| `quiz.html` | Quiz mit Auswertung am Ende |
| `jutsu.html` | Jutsu-Datenbank mit Suche und Filtern (Element, Rang, Art) |
| `faq.html` | Häufige Fragen |
| `dorftest.html` | Dorf-Test mit Ergebnis zum Teilen |
| `social.html` | Social Media: alle Kanäle (in `content.js` unter `socials`) |
| `impressum.html`, `datenschutz.html`, `nutzungsbedingungen.html` | Rechtliches, verlinkt in der Fußzeile. Angaben in `content.js` unter `impressum` und `legal` |
| `leaks.html` | Leaks (verlinkt von der Startseite) |

## Inhalte ändern – nur eine Datei
**Alle Texte stehen in `assets/js/content.js`.** Datei öffnen, Text ändern, speichern, hochladen. Fertig.

Im Moment sind alle Listen leer. Über jeder Liste steht als Kommentar ein Beispiel, wie ein Eintrag aussieht.
- `discord`: euer Discord-Invite-Link (ohne Link ist der Discord-Knopf ausgegraut)
- `release`: Release-Datum und Uhrzeit (ohne Datum steht auf dem Zettel „Datum folgt“)

Eine **neue Ankündigung** fügt ihr ganz oben bei `news:` ein:
```js
{ date: "2026-12-01", tag: "Update", title: "Titel", text: "Text …\n- Listenpunkt" },
```
Für einen **neuen Leak** mit Freischaltdatum tragt ihr bei `leaks:` ein:
```js
{ title: "Neuer Leak", image: "", unlock: "2026-12-10T18:00:00+01:00", text: "…" },
```
Bilder legt ihr in `assets/img/` ab und tragt den Pfad ein, z. B. `image: "assets/img/leak1.jpg"`.

Farben stehen oben in `assets/css/style.css` (`--gold`, `--tag`, `--seal` …).

## Extras
- **Discord live:** In `content.js` bei `discordId` die Server-ID eintragen und in Discord unter *Servereinstellungen → Widget* das Widget aktivieren. Dann steht oben „xx online“.
- **Ambient-Sound:** Der Lautsprecher-Knopf oben spielt einen eingebauten, ruhigen Klang (Wind und Zupfinstrument). Er startet nie von selbst. Eigene Musik: Datei z. B. nach `assets/audio/` legen und bei `music` eintragen.
- **Karte:** Ohne eigenes Bild wird eine eingebaute Karte gezeichnet. Eigene Karte: bei `map.image` eintragen und die Marker (x/y in Prozent) anpassen.
- **Dorf-Test:** Fragen und Ergebnisse stehen in `content.js` unter `dorftest`.

## Auf GitHub Pages veröffentlichen
1. Auf GitHub ein neues Repository anlegen, z. B. `nk-website`.
2. Den ganzen Ordner hochladen (*Add file → Upload files*) oder pushen.
3. *Settings → Pages → Source: Deploy from a branch → `main` / `(root)`* auswählen und speichern.
4. Nach 1–2 Minuten ist die Seite unter `https://DEINNAME.github.io/nk-website/` online.

Eigene Domain: Unter *Settings → Pages → Custom domain* die Domain eintragen und beim Domain-Anbieter einen CNAME-Eintrag auf `DEINNAME.github.io` setzen.

---
Fan-Projekt. Es ist nicht offiziell mit Naruto, Masashi Kishimoto, Shueisha oder Studio Pierrot verbunden.

## Nach einer Änderung
Damit Besucher nicht die alte Version aus ihrem Browser-Cache sehen, hängt hinter CSS und JS in den HTML-Dateien eine Versionsnummer (`?v=…`). Wenn du `content.js`, `wiki.js`, `main.js` oder `style.css` änderst, erhöhe diese Nummer in allen HTML-Dateien (Suchen & Ersetzen).

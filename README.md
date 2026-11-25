# NK – Naruto Roleplay · Website

Statische Website im Schwarz-Gelb-Design mit dem NK-Wappen. Sie läuft kostenlos auf **GitHub Pages** und braucht keinen Server und keinen Build-Schritt.

**Design:** tiefschwarze Nacht, Chakra-Gold aus dem Wappen, dunkle Felder mit Goldkante und NK-Siegel. Oben ist eine Kategorie-Leiste mit Icons, alle Kopfbereiche zeigen Konoha bei Nacht, auf der Startseite zündet beim ersten Besuch das Wappen und den Countdown als Briefbomben-Zettel. Leere Bereiche zeigen automatisch eine versiegelte Schriftrolle.

Die Schriften liegen direkt im Repo (`assets/fonts`), es werden also keine Google-Server geladen. Lizenz: SIL Open Font License (Anton, Bitter).

## Seiten (Kategorien oben im Menü)
| Datei | Inhalt |
|---|---|
| `index.html` | Start: Wappen, Release-Countdown, Discord, neueste News und Leaks |
| `news.html` | News (angepinnte oben) |
| `welt.html` | Welt: Dörfer und Clans mit Filter |
| `wiki.html` | Durchsuchbares Wiki |
| `regelwerk.html` | Regelwerk mit Paragraphen |
| `team.html` | Team nach Gruppen |
| `galerie.html` | Galerie, Klick öffnet das Bild groß |
| `quiz.html` | Quiz mit Auswertung am Ende |
| `faq.html` | Häufige Fragen |
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

## Auf GitHub Pages veröffentlichen
1. Auf GitHub ein neues Repository anlegen, z. B. `nk-website`.
2. Den ganzen Ordner hochladen (*Add file → Upload files*) oder pushen.
3. *Settings → Pages → Source: Deploy from a branch → `main` / `(root)`* auswählen und speichern.
4. Nach 1–2 Minuten ist die Seite unter `https://DEINNAME.github.io/nk-website/` online.

Eigene Domain: Unter *Settings → Pages → Custom domain* die Domain eintragen und beim Domain-Anbieter einen CNAME-Eintrag auf `DEINNAME.github.io` setzen.

---
Fan-Projekt. Es ist nicht offiziell mit Naruto, Masashi Kishimoto, Shueisha oder Studio Pierrot verbunden.

# NK – Naruto Roleplay · Website

Statische Website im Schwarz-Gelb-Design mit dem NK-Wappen. Sie läuft kostenlos auf **GitHub Pages** und braucht keinen Server und keinen Build-Schritt.

## Seiten
| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Logo, Release-Countdown, Discord-Button, Features, Dörfer, neueste News und Leaks |
| `news.html` | Ankündigungen (angepinnte News oben) |
| `leaks.html` | Leaks: verschwommen bis zum Klick, gesperrte schalten sich zum Datum automatisch frei |
| `lore.html` | Die fünf Großdörfer und alle Clans mit Filter |
| `wiki.html` | Durchsuchbares Wiki (Start-Guide, Ränge, Jutsu, Missionen …) |
| `regeln.html` | Regeln (§1, §2 …) und FAQ |
| `team.html` | Team nach Gruppen |

## Inhalte ändern – nur eine Datei
**Alle Texte stehen in `assets/js/content.js`.** Datei öffnen, Text ändern, speichern, hochladen. Fertig.

Als Erstes solltet ihr Folgendes ausfüllen (in der Datei mit `>>` markiert):
- `discord`: euer Discord-Invite-Link
- `release`: Release-Datum und Uhrzeit für den Countdown
- Team-Namen, eure Regel für Zweitcharaktere, Kekkei-Genkai-Plätze

Eine **neue Ankündigung** fügt ihr ganz oben bei `news:` ein:
```js
{ date: "2026-12-01", tag: "Update", title: "Titel", text: "Text …\n- Listenpunkt" },
```
Für einen **neuen Leak** mit Freischaltdatum tragt ihr bei `leaks:` ein:
```js
{ title: "Neuer Leak", icon: "🔥", image: "", unlock: "2026-12-10T18:00:00+01:00", text: "…" },
```
Bilder legt ihr in `assets/img/` ab und tragt den Pfad ein, z. B. `image: "assets/img/leak1.jpg"`.

Farben und Schriften stehen oben in `assets/css/style.css` (`--yellow`, `--bg` …).

## Auf GitHub Pages veröffentlichen
1. Auf GitHub ein neues Repository anlegen, z. B. `nk-website`.
2. Den ganzen Ordner hochladen (*Add file → Upload files*) oder pushen.
3. *Settings → Pages → Source: Deploy from a branch → `main` / `(root)`* auswählen und speichern.
4. Nach 1–2 Minuten ist die Seite unter `https://DEINNAME.github.io/nk-website/` online.

Eigene Domain: Unter *Settings → Pages → Custom domain* die Domain eintragen und beim Domain-Anbieter einen CNAME-Eintrag auf `DEINNAME.github.io` setzen.

---
Fan-Projekt. Es ist nicht offiziell mit Naruto, Masashi Kishimoto, Shueisha oder Studio Pierrot verbunden.

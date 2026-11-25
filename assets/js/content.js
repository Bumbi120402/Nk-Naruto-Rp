/* =====================================================================
   NK – INHALTE DER WEBSITE
   ---------------------------------------------------------------------
   Alles, was auf der Seite steht, kommt aus dieser Datei.
   Leere Listen [] zeigen automatisch eine "versiegelte" Schriftrolle.
   Sobald ihr etwas einträgt, erscheint es auf der Seite.
   Beispiele für jeden Eintrag stehen jeweils im Kommentar darüber.
   ===================================================================== */

window.NK = {

  server: {
    name: "NK",
    title: "Naruto Roleplay",
    slogan: "",          // Satz unter dem Logo auf der Startseite
    discord: "",         // z. B. "https://discord.gg/abc123"
    release: ""          // z. B. "2026-12-26T18:00:00+01:00"  -> Countdown startet automatisch
  },

  /* { date: "2026-12-01", tag: "Update", pinned: false, title: "Titel", text: "Text\n- Listenpunkt" } */
  news: [],

  /* { title: "Titel", image: "assets/img/leak1.jpg", unlock: "2026-12-10T18:00:00+01:00", text: "…" }
     unlock leer = sofort sichtbar (verdeckt bis Klick)                                   */
  leaks: [],

  /* { emblem: "assets/img/konoha.png", name: "Konohagakure", alias: "…", land: "Feuerreich", kage: "Hokage", text: "…" } */
  villages: [],

  /* { name: "Uchiha", village: "Konohagakure", status: "Offen", ability: "…", text: "…" } */
  clans: [],

  /* { id: "start", cat: "Erste Schritte", title: "Start-Guide", html: "<p>…</p>" } */
  wiki: [],

  /* { title: "Allgemein", items: [ ["Regel-Titel", "Beschreibung"], … ] } */
  rules: [],

  /* [ "Frage?", "Antwort" ] */
  faq: [],

  /* { image: "assets/img/galerie/bild1.jpg", title: "Erstes Event" } */
  gallery: [],

  /* { q: "Wie heißt das Dorf versteckt hinter den Blättern?", answers: ["Suna", "Konoha", "Kiri"], correct: 1 }
     correct = Nummer der richtigen Antwort, gezählt ab 0                                     */
  quiz: [],

  /* { group: "Serverleitung", members: [ { name: "DJ Reeps", role: "Serverleitung", avatar: "", text: "" } ] } */
  team: []
};

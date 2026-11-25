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
    discordId: "",       // Server-ID für die Live-Anzeige "xx online" (Discord: Servereinstellungen -> Widget -> aktivieren, ID kopieren)
    music: "assets/audio/ambient.mp3",  // Musik für den Lautsprecher-Knopf. Leer "" = eingebauter Ambient-Sound
    release: ""          // leer = kein Countdown. Sobald ein Datum drinsteht, z. B. "2026-12-26T18:00:00+01:00", erscheint er auf der Startseite
  },

  /* { date: "2026-12-01", tag: "Update", pinned: false, title: "Titel", text: "Text\n- Listenpunkt" } */
  news: [],

  /* { title: "Titel", image: "assets/img/leak1.jpg", unlock: "2026-12-10T18:00:00+01:00", text: "…" }
     unlock leer = sofort sichtbar (verdeckt bis Klick)                                   */
  leaks: [],

  /* color = Akzentfarbe des Dorfs auf der Welt-Seite, z. B. "#6fbf4a"
     { emblem: "assets/img/konoha.png", color: "#6fbf4a", name: "Konohagakure", alias: "…", land: "Feuerreich", kage: "Hokage", text: "…" } */
  villages: [],

  /* { name: "Uchiha", village: "Konohagakure", status: "Offen", ability: "…", text: "…" } */
  clans: [],

  /* Das Wiki steht in einer eigenen Datei: assets/js/wiki.js */
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
  team: [],

  /* ------------------------------------------------------------ JUTSU-DATENBANK
     { name: "Feuerball-Technik", element: "Feuer", rank: "C", type: "Ninjutsu", clan: "", text: "…" }
     element: Feuer, Wind, Wasser, Blitz, Erde (oder leer)  ·  rank: E, D, C, B, A, S          */
  jutsu: [],

  /* ------------------------------------------------------------ ZEITLEISTE (Welt-Seite)
     { date: "Jahr 1", title: "Gründung von NK", text: "…" }                                   */
  timeline: [],

  /* ------------------------------------------------------------ NINJA DES MONATS (Startseite)
     { name: "Spielername", title: "Ninja des Monats · Dezember", image: "", text: "Warum?" }    */
  hall: [],

  /* ------------------------------------------------------------ KARTE (Welt-Seite)
     image leer = eingebaute Karte. Eigene Karte: image: "assets/img/karte.jpg"
     x / y = Position in Prozent (0–100) von links / oben                                       */
  map: {
    image: "",
    markers: [
      { name: "Iwagakure",   realm: "Erdreich",    x: 25, y: 28, color: "#b08463", text: "Das Dorf versteckt im Stein." },
      { name: "Kumogakure",  realm: "Blitzreich",  x: 72, y: 24, color: "#a98bea", text: "Das Dorf versteckt in den Wolken." },
      { name: "Konohagakure",realm: "Feuerreich",  x: 47, y: 54, color: "#6fbf4a", text: "Das Dorf versteckt hinter den Blättern." },
      { name: "Sunagakure",  realm: "Windreich",   x: 22, y: 70, color: "#d9a441", text: "Das Dorf versteckt im Sand." },
      { name: "Kirigakure",  realm: "Wasserreich", x: 88, y: 60, color: "#4aa3c9", text: "Das Dorf versteckt im Nebel." }
    ]
  },

  /* ------------------------------------------------------------ STECKBRIEF-GENERATOR (Mitmachen)
     type: text, number, textarea, select
     options: Liste ODER "villages" (nimmt die Dörfer) ODER "clans" (nimmt die Clans + Clanlos)  */
  steckbrief: [
    { id: "name", label: "Name", type: "text", required: true, placeholder: "Vor- und Nachname" },
    { id: "alter", label: "Alter", type: "number", placeholder: "z. B. 14" },
    { id: "geschlecht", label: "Geschlecht", type: "text" },
    { id: "dorf", label: "Herkunftsdorf", type: "select", options: "villages" },
    { id: "clan", label: "Clan", type: "select", options: "clans" },
    { id: "element", label: "Chakra-Natur", type: "select", options: ["Feuer", "Wind", "Wasser", "Blitz", "Erde"] },
    { id: "aussehen", label: "Aussehen", type: "textarea" },
    { id: "charakter", label: "Persönlichkeit", type: "textarea" },
    { id: "staerken", label: "Stärken", type: "textarea" },
    { id: "schwaechen", label: "Schwächen", type: "textarea" },
    { id: "geschichte", label: "Vorgeschichte", type: "textarea", rows: 7 },
    { id: "ziel", label: "Ziel", type: "text", placeholder: "Was will dein Charakter erreichen?" }
  ],

  /* ------------------------------------------------------------ DORF-TEST (Mitmachen)
     Jede Antwort gibt einen Punkt für ein Dorf (Schlüssel aus results).                         */
  dorftest: {
    questions: [
      { q: "Ein Freund steckt in Schwierigkeiten. Was tust du?", answers: [
        ["Ich helfe sofort, egal was es kostet.", "konoha"], ["Ich überlege erst, wie ich am klügsten helfe.", "suna"],
        ["Ich regle das leise, ohne dass jemand davon erfährt.", "kiri"], ["Ich gehe direkt auf das Problem los.", "kumo"],
        ["Ich stelle mich vor ihn und weiche nicht zurück.", "iwa"] ] },
      { q: "Wo fühlst du dich zu Hause?", answers: [
        ["In dichten Wäldern", "konoha"], ["In der Wüste unter brennender Sonne", "suna"], ["Im Nebel am Meer", "kiri"],
        ["Hoch in den Bergen, wenn ein Gewitter aufzieht", "kumo"], ["Zwischen Felsen und Schluchten", "iwa"] ] },
      { q: "Was ist dir am wichtigsten?", answers: [
        ["Zusammenhalt", "konoha"], ["Überleben", "suna"], ["Freiheit", "kiri"], ["Stärke", "kumo"], ["Beständigkeit", "iwa"] ] },
      { q: "Wie kämpfst du am liebsten?", answers: [
        ["Vielseitig, je nach Lage", "konoha"], ["Aus der Distanz, mit Taktik", "suna"], ["Lautlos, mit der Klinge", "kiri"],
        ["Schnell und mit voller Wucht", "kumo"], ["Erst abwehren, dann zurückschlagen", "iwa"] ] },
      { q: "Ein Fremder kommt in dein Dorf. Wie reagierst du?", answers: [
        ["Ich heiße ihn willkommen.", "konoha"], ["Vorsichtig, aber fair.", "suna"], ["Ich beobachte ihn aus dem Schatten.", "kiri"],
        ["Ich teste, was er draufhat.", "kumo"], ["Er muss sich mein Vertrauen erst verdienen.", "iwa"] ] },
      { q: "Welches Element passt zu dir?", answers: [
        ["Feuer", "konoha"], ["Wind", "suna"], ["Wasser", "kiri"], ["Blitz", "kumo"], ["Erde", "iwa"] ] }
    ],
    results: {
      konoha: { name: "Konohagakure", color: "#6fbf4a", text: "Für dich zählt, wer neben dir steht. Du kämpfst für andere und gibst niemanden auf. Der Wille des Feuers brennt in dir." },
      suna:   { name: "Sunagakure",   color: "#d9a441", text: "Du denkst, bevor du handelst. Wo andere aufgeben, findest du einen Weg, auch wenn die Lage hart ist." },
      kiri:   { name: "Kirigakure",   color: "#4aa3c9", text: "Du gehst deinen eigenen Weg und zeigst nicht jedem, was du denkst. Unterschätzt wirst du nur einmal." },
      kumo:   { name: "Kumogakure",   color: "#a98bea", text: "Direkt, laut und voller Energie. Du suchst die Herausforderung und weichst keinem Kampf aus." },
      iwa:    { name: "Iwagakure",    color: "#b08463", text: "Standhaft wie ein Fels. Wer dein Vertrauen hat, kann sich für immer auf dich verlassen." }
    }
  }
};

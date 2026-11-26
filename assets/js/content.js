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
    /* Live-Anzeige "X auf der Seite" über Supabase (kostenlos, Server in Frankfurt).
       Beide Werte stehen in Supabase unter Project Settings -> API. Leer = Anzeige aus. */
    live: { url: "", key: "" },   // url z. B. "https://abcdefgh.supabase.co", key = anon / publishable key
    discordId: "",       // Server-ID für die Live-Anzeige "xx online" (Discord: Servereinstellungen -> Widget -> aktivieren, ID kopieren)
    music: "assets/audio/ambient.mp3",  // Musik für den Lautsprecher-Knopf. Leer "" = eingebauter Ambient-Sound
    playable: ["Konohagakure", "Sunagakure"],  // zum Start spielbare Dörfer (Startseite, Karte, Dorf-Test)
    /* Serverstatus oben auf der Startseite.
       state: "entwicklung", "online", "wartung" oder "offline"
       statusUrl: optional Adresse, die {"online": true, "players": 12, "max": 64} liefert -> Status kommt dann automatisch */
    status: { state: "entwicklung", text: "", statusUrl: "" },
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
    image: "assets/img/karte.webp",
    markers: [
      { name: "Konohagakure", realm: "Feuerreich",  x: 42.1, y: 63.3, color: "#6fbf4a", text: "Das Dorf versteckt hinter den Blättern.", link: "wiki.html#konoha" },
      { name: "Sunagakure",   realm: "Windreich",   x: 20.1, y: 85.2, color: "#d9a441", text: "Das Dorf versteckt im Sand.", link: "wiki.html#suna" },
      { name: "Iwagakure",    realm: "Erdreich",    x: 26.9, y: 31.5, color: "#b08463", text: "Das Dorf versteckt hinter den Felsen.", link: "wiki.html#erdreich" },
      { name: "Kumogakure",   realm: "Blitzreich",  x: 71.1, y: 29.9, color: "#a98bea", text: "Das Dorf versteckt in den Wolken.", link: "wiki.html#blitzreich" },
      { name: "Kirigakure",   realm: "Wasserreich", x: 82.8, y: 74.3, color: "#4aa3c9", text: "Das Dorf versteckt im Nebel.", link: "wiki.html#wasserreich" },
      /* kleine Länder: small: true = kleiner Punkt, Name erscheint beim Drüberfahren */
      { name: "Regenland",            small: true, x: 28.7, y: 54.2, text: "Fast ununterbrochener Regen, im Krieg schwer verwüstet.", link: "wiki.html#kleine-laender" },
      { name: "Grasland",             small: true, x: 34.7, y: 39.9, text: "Grenzt an das Feuerreich. Sein kleines Dorf heißt Kusagakure.", link: "wiki.html#kleine-laender" },
      { name: "Steinland",            small: true, x: 18.9, y: 57.8, text: "Karges Bergland voller Höhlen.", link: "wiki.html#kleine-laender" },
      { name: "Reisreich",            small: true, x: 46.1, y: 43.8, text: "Reisfelder ohne offizielles Shinobi-Dorf, Unterschlupf für Abtrünnige.", link: "wiki.html#kleine-laender" },
      { name: "Land der Wasserfälle", small: true, x: 50.6, y: 44.3, text: "Schluchten, Wasserfälle und das versteckte Dorf Takigakure.", link: "wiki.html#kleine-laender" },
      { name: "Frostland",            small: true, x: 55.9, y: 40.3, text: "Kurze Sommer, lange Winter.", link: "wiki.html#kleine-laender" },
      { name: "Land der heißen Quellen", small: true, x: 54.9, y: 51.3, text: "Berühmt für seine Badehäuser, neutraler Treffpunkt.", link: "wiki.html#kleine-laender" },
      { name: "Strudelland",          small: true, x: 63.1, y: 71.7, text: "Insel voller Strudel, Ruinen eines Siegel-Clans.", link: "wiki.html#kleine-laender" },
      { name: "Wellenland",           small: true, x: 45.3, y: 88.3, text: "Kleines Inselland, lebt von Fischerei und Handel.", link: "wiki.html#kleine-laender" },
      { name: "Flussland",            small: true, x: 35.2, y: 87.7, text: "Pufferzone zwischen Feuer- und Windreich.", link: "wiki.html#kleine-laender" }
    ]
  },


  /* ------------------------------------------------------------ SOCIAL MEDIA
     url leer = Karte zeigt "Folgt bald". platform: Discord, TikTok, YouTube, Instagram, Twitch, X
     { platform: "TikTok", url: "https://www.tiktok.com/@name", handle: "@name", text: "Clips & Highlights" } */
  socials: [
    { platform: "Discord", url: "", handle: "", text: "Community, Support und alle Ankündigungen" },
    { platform: "TikTok", url: "", handle: "", text: "Clips und Highlights vom Server" },
    { platform: "YouTube", url: "", handle: "", text: "Trailer, Events und Videos" },
    { platform: "Instagram", url: "", handle: "", text: "Bilder und Neuigkeiten" },
    { platform: "Twitch", url: "", handle: "", text: "Live dabei sein" }
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
  },

  /* ------------------------------------------------------------ CHANGELOG
     Neueste Version oben. Art: "neu", "geändert", "behoben", "entfernt"
     { version: "0.2", date: "2026-12-01", title: "Clan-Update", changes: [ ["neu", "Hyūga spielbar"], ["behoben", "…"] ] } */
  changelog: [],

  /* ------------------------------------------------------------ IMPRESSUM
     Solange name, address oder email leer sind, zeigt die Impressum-Seite eine Vorlage
     mit allem, was hinein muss. Sobald alles ausgefüllt ist, erscheint das fertige Impressum. */
  impressum: {
    name: "Max Mustermann",            // Vor- und Nachname (bei Verein/Firma: Name + Rechtsform)
    representative: "",  // nur bei Verein/Firma: vertretungsberechtigte Person
    address: "Musterstraße 1",         // Straße und Hausnummer
    city: "12345 Musterstadt",            // PLZ und Ort
    country: "",
    email: "kontakt@beispiel.de",
    phone: "0123 456789",           // Telefon ODER contactForm angeben (zweiter schneller Kontaktweg)
    contactForm: "",     // z. B. Link zu einem Kontaktformular
    register: "",        // falls vorhanden, z. B. "Vereinsregister Amtsgericht Musterstadt, VR 12345"
    responsible: "Max Mustermann, Anschrift wie oben"      // Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Name + Anschrift (leer = wie oben)
  },

  /* ------------------------------------------------------------ DATENSCHUTZ & NUTZUNGSBEDINGUNGEN
     Die Texte stehen in main.js und passen sich automatisch an (z. B. Discord-Anzeige nur, wenn aktiv).
     authority: optional eure Datenschutz-Aufsichtsbehörde, z. B. "Landesbeauftragte für Datenschutz Niedersachsen" */
  legal: { updated: "November 2026", authority: "" },

  /* ------------------------------------------------------------ SERVER-LORE (Welt-Seite, ganz oben)
     Jedes Kapitel: place = Ort, title, color, text = Absätze.
     Ein Absatz mit "> " am Anfang wird als großes Zitat hervorgehoben. "…" = Name folgt noch. */
  lore: {
  "title": "Der Frieden von Kagerō",
  "chapters": [
    {
      "place": "Die Shinobi-Welt",
      "title": "Der Frieden von Kagerō",
      "color": "#ffc400",
      "text": [
        "Seit dem Ende des Ersten Ninja-Weltkriegs sind sieben Monate vergangen. Zum ersten Mal sollen Shinobi aus Konoha und Suna wieder Seite an Seite einen Auftrag erfüllen.",
        "Der Waffenstillstand von Kagerō wurde in einem kleinen Grenzort geschlossen, dessen Brücke im Krieg von beiden Seiten zerstört worden war. Konoha versprach Getreide und Heilkräuter für die Dörfer im Windreich. Suna öffnete im Gegenzug seine Handelswege und sagte Hilfe beim Wiederaufbau der Grenzbrücke zu. Sobald sie wieder begehbar wäre, sollte ein gemeinsamer Konvoi die ersten Vorräte über die Grenze bringen.",
        "> Die Brücke steht inzwischen. Der Konvoi ist nie angekommen."
      ]
    },
    {
      "place": "Konohagakure",
      "title": "Die Namen der Vermissten",
      "color": "#6fbf4a",
      "text": [
        "Nach Tobirama Senjus Tod übernahm … Sarutobi als Dritte Hokage die Führung des Dorfes. Während des Krieges hatte sie die Evakuierung mehrerer Grenzsiedlungen geleitet. Viele Familien verdankten ihr die Rückkehr ihrer Angehörigen. Bei ihrer Ernennung versprach sie, auch nach jenen suchen zu lassen, die das Dorf längst für tot erklärt hatte.",
        "Die ersten Nachforschungen führten die Suchtrupps zurück in Konohas eigenes Archiv. In den letzten Wochen des Krieges waren mehrere Einheiten unter falschen Namen an die Grenze geschickt worden. Einige dieser Shinobi galten offiziell als Deserteure, obwohl ihre Einsatzbefehle das Siegel des Hokage trugen.",
        "Die Uchiha fordern, dass die ursprünglichen Befehle veröffentlicht und die betroffenen Familien entschädigt werden. Älteste der Senju drängen darauf, zuerst die Überlebenden zu finden. Unter den falschen Namen geführte Shinobi könnten noch immer im Ausland leben. Die Yamanaka, die die Angehörigen befragen, haben inzwischen ein anderes Problem. Drei Familien erhielten noch nach dem Waffenstillstand Briefe von Vermissten. Alle drei Briefe wurden in Kagerō aufgegeben.",
        "… ließ die Briefe versiegeln und setzte einen Suchtrupp auf die Spur. Zwei Mitglieder dieses Trupps sollten den ersten Konvoi begleiten."
      ]
    },
    {
      "place": "Sunagakure",
      "title": "Wem gehört das Wasser?",
      "color": "#d9a441",
      "text": [
        "In Suna dauerte die Wahl eines neuen Kazekage bis weit in den ersten Sommer nach dem Krieg. Schließlich einigten sich die Clans auf … Sabaku, der während der Belagerung die Versorgung des Dorfes organisiert hatte. Sein erster Erlass stellte die großen Zisternen unter die Verwaltung des Dorfes. Bis dahin hatten die Clans selbst entschieden, wem sie in Zeiten der Dürre Wasser abgaben.",
        "In den unteren Vierteln fand der Erlass breite Zustimmung. Dort hatten Familien während des Krieges ganze Wochen von den Lieferungen aus dem Tempel gelebt. Mehrere Clanälteste weigern sich jedoch bis heute, ihre Schlüssel herauszugeben. Sie erinnern … bei jeder Ratssitzung daran, wer die Zisternen gebaut und ihre Wachen bezahlt hat.",
        "Auch die Shirogane geraten unter Druck. Bei der Übernahme einer Zisterne fanden Dorfwachen darunter Werkstätten, in denen während des Krieges Puppen für geheime Einsätze gebaut worden waren. Laut Werkstattbuch ging eine Lieferung kurz nach dem Waffenstillstand an einen Auftraggeber in Kagerō. Die Bezahlung wurde quittiert. Die Unterschrift gehört einem Shinobi, dessen Name seit zwei Jahren auf Sunas Gedenkstein steht.",
        "… schickte eine Puppenspielerin mit dem Konvoi, um die Lieferung zurückzuverfolgen. Ihrer Familie teilte man mit, sie solle unterwegs beschädigte Wagen reparieren."
      ]
    },
    {
      "place": "Kagerō",
      "title": "Drei Tage bis zur Grenzversammlung",
      "color": "#e8c77a",
      "text": [
        "Am Morgen nach dem Verschwinden des Konvois fand ein Fährmann die Wagen auf der alten Uferstraße. Die Vorräte waren unberührt. Von den Fahrern und ihren Begleitern fehlte jede Spur. Auf der letzten Ladefläche lag ein Bündel Soldbücher. Darin standen Namen vermisster Shinobi aus beiden Dörfern, mit quittierten Auszahlungen bis in die vergangene Woche.",
        "In drei Tagen sollen sich die Gesandten Konohas und Sunas auf der neuen Brücke treffen. Sunas Rat hat bereits angekündigt, den Grenzübergang zu schließen, falls seine Leute bis dahin verschwunden bleiben. Konohas Garnison hat Verstärkung angefordert. Im Ort selbst sind die Herbergen voll mit Angehörigen, die hoffen, in den Soldbüchern endlich einen Namen zu finden."
      ]
    }
  ],
  "hook": "Hier beginnt euer RP. Während die Kage über den Waffenstillstand verhandeln, suchen junge Shinobi das Flussufer ab, die Clans schicken eigene Unterhändler nach Kagerō und Händler versuchen, ihre Vorräte durch die Grenze zu bringen. Wer einen Vermissten findet, muss entscheiden, wem er davon erzählt. Für manche Familien ist es die erste Hoffnung seit Jahren. Für jemanden in Kagerō ist es der Grund, die Soldbücher vor der Grenzversammlung zurückzubekommen."
}
};

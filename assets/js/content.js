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
    discord: "https://discord.gg/66X6vCe9SZ",
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

  /* crest = Wappen-Bild, wiki = id der Wiki-Seite. status = Text unter dem Clan.
     { name: "Uchiha", village: "Konohagakure", crest: "assets/img/clans/uchiha.webp", ability: "…", text: "…" } */
  clans: [
    { name: "Uchiha", village: "Konohagakure", crest: "assets/img/clans/uchiha.webp", wiki: "uchiha", ability: "Sharingan & Katon", text: "Einer der ältesten Clans der Ninja-Welt. Einst die größten Rivalen der Senju, heute einer der Gründer Konohas.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Hyūga", village: "Konohagakure", crest: "assets/img/clans/hyuga.webp", wiki: "hyuga", ability: "Byakugan & Jūken", text: "Ein alter, stolzer Clan mit strengen Traditionen, geteilt in Sōke und Bunke.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Senju", village: "Konohagakure", crest: "assets/img/clans/senju.webp", wiki: "senju", ability: "Mokuton & Vitalität", text: "In den Clan-Kriegen eine der mächtigsten Familien. Gründeten Konoha gemeinsam mit den Uchiha.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Aburame", village: "Konohagakure", crest: "assets/img/clans/aburame.webp", wiki: "aburame", ability: "Insektenkontrolle", text: "Leben zurückgezogen und gelten als unheimlich. Kaum ein Clan ist so loyal.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Mugen", village: "Sunagakure", crest: "assets/img/clans/mugen.webp", wiki: "mugen", ability: "Sōryūgan", text: "Ein geheimnisvoller Clan. Über seine Herkunft spricht er nicht.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Shirogane", village: "Sunagakure", crest: "assets/img/clans/shirogane.webp", wiki: "shirogane", ability: "Puppenkunst", text: "Meister der Puppenkunst. Ihre Werkstätten gehören zu den wertvollsten Orten des Dorfes.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Ayakaze", village: "Sunagakure", crest: "assets/img/clans/ayakaze.webp", wiki: "ayakaze", ability: "Windkontrolle", text: "Leben mit den Stürmen der Wüste. Sie formen Wind und Tornados ohne Fächer, allein mit ihrem Chakra.", status: "1 Clanleitung · 2 Mitglieder" },
    { name: "Sabaku", village: "Sunagakure", crest: "assets/img/clans/sabaku.webp", wiki: "sabaku", ability: "Sandkontrolle", text: "Mit der Wüste verwachsen wie kein anderer Clan. Sie formen den Sand mit ihrem Chakra.", status: "1 Clanleitung · 2 Mitglieder" }
  ],

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
    { platform: "Discord", url: "https://discord.gg/66X6vCe9SZ", handle: "Jetzt beitreten", text: "Community, Support und alle Ankündigungen" },
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
    phone: "",           // Telefon ODER contactForm angeben (zweiter schneller Kontaktweg)
    contactForm: "https://discord.gg/66X6vCe9SZ",  // zweiter Kontaktweg: Ticket auf dem Discord-Server
    register: "",        // falls vorhanden, z. B. "Vereinsregister Amtsgericht Musterstadt, VR 12345"
    responsible: "Max Mustermann, Anschrift wie oben"      // Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Name + Anschrift (leer = wie oben)
  },

  /* ------------------------------------------------------------ DATENSCHUTZ & NUTZUNGSBEDINGUNGEN
     Die Texte stehen in main.js und passen sich automatisch an (z. B. Discord-Anzeige nur, wenn aktiv).
     authority: optional eure Datenschutz-Aufsichtsbehörde, z. B. "Landesbeauftragte für Datenschutz Niedersachsen" */
  legal: { updated: "November 2026", authority: "" },

  /* ------------------------------------------------------------ SERVER-LORE (Welt-Seite, ganz oben)
     Mehrere Geschichten als Reiter. Jede: id, tab (Reitername), color, title, intro (Einleitung),
     chapters (place, title, text = Absätze; "> " am Anfang = großes Zitat), hook = Absätze zu "Hier beginnt euer RP".
     "…" = Name folgt noch. Direkt-Link auf einen Reiter: welt.html#konoha */
  lore: [
  {
    "id": "kagero",
    "tab": "Die Shinobi-Welt",
    "color": "#ffc400",
    "title": "Der Frieden von Kagerō",
    "intro": "",
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
          "Nach Tobirama Senjus Tod übernahm der Dritte Hokage die Führung des Dorfes. Während des Krieges hatte er die Evakuierung mehrerer Grenzsiedlungen geleitet. Viele Familien verdankten ihm die Rückkehr ihrer Angehörigen. Bei seiner Ernennung versprach er, auch nach jenen suchen zu lassen, die das Dorf längst für tot erklärt hatte.",
          "Die ersten Nachforschungen führten die Suchtrupps zurück in Konohas eigenes Archiv. In den letzten Wochen des Krieges waren mehrere Einheiten unter falschen Namen an die Grenze geschickt worden. Einige dieser Shinobi galten offiziell als Deserteure, obwohl ihre Einsatzbefehle das Siegel des Hokage trugen.",
          "Die Uchiha fordern, dass die ursprünglichen Befehle veröffentlicht und die betroffenen Familien entschädigt werden. Älteste der Senju drängen darauf, zuerst die Überlebenden zu finden. Unter den falschen Namen geführte Shinobi könnten noch immer im Ausland leben. Die Yamanaka, die die Angehörigen befragen, haben inzwischen ein anderes Problem. Drei Familien erhielten noch nach dem Waffenstillstand Briefe von Vermissten. Alle drei Briefe wurden in Kagerō aufgegeben.",
          "Der Hokage ließ die Briefe versiegeln und setzte einen Suchtrupp auf die Spur. Zwei Mitglieder dieses Trupps sollten den ersten Konvoi begleiten."
        ]
      },
      {
        "place": "Sunagakure",
        "title": "Wem gehört das Wasser?",
        "color": "#d9a441",
        "text": [
          "In Suna dauerte die Wahl eines neuen Kazekage bis weit in den ersten Sommer nach dem Krieg. Schließlich einigten sich die Clans auf den Shinobi, der während der Belagerung die Versorgung des Dorfes organisiert hatte. Sein erster Erlass stellte die großen Zisternen unter die Verwaltung des Dorfes. Bis dahin hatten die Clans selbst entschieden, wem sie in Zeiten der Dürre Wasser abgaben.",
          "In den unteren Vierteln fand der Erlass breite Zustimmung. Dort hatten Familien während des Krieges ganze Wochen von den Lieferungen aus dem Tempel gelebt. Mehrere Clanälteste weigern sich jedoch bis heute, ihre Schlüssel herauszugeben. Sie erinnern den Kazekage bei jeder Ratssitzung daran, wer die Zisternen gebaut und ihre Wachen bezahlt hat.",
          "Auch die Shirogane geraten unter Druck. Bei der Übernahme einer Zisterne fanden Dorfwachen darunter Werkstätten, in denen während des Krieges Puppen für geheime Einsätze gebaut worden waren. Laut Werkstattbuch ging eine Lieferung kurz nach dem Waffenstillstand an einen Auftraggeber in Kagerō. Die Bezahlung wurde quittiert. Die Unterschrift gehört einem Shinobi, dessen Name seit zwei Jahren auf Sunas Gedenkstein steht.",
          "Der Kazekage schickte eine Puppenspielerin mit dem Konvoi, um die Lieferung zurückzuverfolgen. Ihrer Familie teilte man mit, sie solle unterwegs beschädigte Wagen reparieren."
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
    "hook": [
      "Während die Kage über den Waffenstillstand verhandeln, suchen junge Shinobi das Flussufer ab, die Clans schicken eigene Unterhändler nach Kagerō und Händler versuchen, ihre Vorräte durch die Grenze zu bringen. Wer einen Vermissten findet, muss entscheiden, wem er davon erzählt. Für manche Familien ist es die erste Hoffnung seit Jahren. Für jemanden in Kagerō ist es der Grund, die Soldbücher vor der Grenzversammlung zurückzubekommen."
    ]
  },
  {
    "id": "konoha",
    "tab": "Konohagakure",
    "color": "#6fbf4a",
    "title": "Das Dorf verborgen hinter den Blättern",
    "place": "Konohagakure",
    "intro": "Als die Akademie nach dem Krieg wieder ihre Tore öffnete, mussten einige Klassen zusammengelegt werden. Zu viele ihrer Lehrer waren von der Front nicht zurückgekehrt. Über den Dächern des Dorfes blickten die steinernen Gesichter der ersten beiden Hokage auf einen Schulhof, der wieder voller Kinder war.",
    "chapters": [
      {
        "place": "Konohagakure",
        "title": "Hashirama und der Frieden zwischen den Clans",
        "color": "#6fbf4a",
        "text": [
          "Lange vor der Gründung Konohas kämpften die Shinobi des Feuerreichs unter den Bannern ihrer Clans. Die Senju und die Uchiha gehörten zu den mächtigsten unter ihnen. Ihre Fehde währte so lange, dass bereits Kinder für Schlachten ausgebildet wurden, deren Ursprung kaum jemand noch kannte.",
          "In dieser Zeit begegneten sich Hashirama Senju und Madara Uchiha an einem Fluss. Als Jungen erzählten sie einander von einem Ort, an dem ihre jüngeren Geschwister aufwachsen könnten, ohne in den Krieg ziehen zu müssen. Jahre später standen sie sich als Oberhäupter ihrer Clans gegenüber. Erst nach weiteren Verlusten legten sie die Waffen nieder und schlossen das Bündnis, aus dem Konohagakure hervorging.",
          "Unter Hashirama, dem Ersten Hokage, schlossen sich weitere Clans dem Dorf an. Wo früher jede Familie ihre eigenen Wachen gestellt hatte, standen nun Shinobi verschiedener Clans gemeinsam am Tor. Selbst nachdem Madara das Dorf verlassen hatte und der Konflikt mit Hashirama im Tal des Endes gipfelte, hielt das Bündnis. Die Frage, wie viel Mitsprache jeder Clan in der gemeinsamen Heimat haben sollte, blieb offen."
        ]
      },
      {
        "place": "Konohagakure",
        "title": "Tobiramas Vermächtnis",
        "color": "#6fbf4a",
        "text": [
          "Nach Hashiramas Tod übernahm sein Bruder Tobirama Senju als Zweiter Hokage die Führung. Unter ihm erhielt Konoha feste Strukturen für die Ausbildung, die Vergabe von Missionen und den Schutz des Dorfes. An der Ninja-Akademie lernten Kinder verschiedener Clans im selben Klassenzimmer. Viele von ihnen gingen später gemeinsam auf ihre erste Mission.",
          "Tobirama übertrug den Uchiha die Verantwortung für die Dorfpolizei. Einige nahmen die Aufgabe als Zeichen des Vertrauens an. Andere fragten sich, weshalb ihre Stimmen bei Entscheidungen des Dorfes so wenig Gewicht hatten, obwohl sie täglich für dessen Sicherheit einstanden. Der Streit blieb bestehen, als der Erste Ninja-Weltkrieg Konoha erreichte.",
          "Während eines Einsatzes gegen Shinobi aus Kumogakure befahl Tobirama seiner Einheit den Rückzug und blieb zurück, um ihr Zeit zu verschaffen. Seine Schüler kehrten ins Feuerreich zurück. Der Zweite Hokage fiel, und zum ersten Mal seit der Gründung musste Konoha seine Führung ohne einen der beiden Senju-Brüder bestimmen."
        ]
      },
      {
        "place": "Konohagakure",
        "title": "Die Wahl des Dritten Hokage",
        "color": "#6fbf4a",
        "text": [
          "Nach mehreren Sitzungen einigte sich der Rat auf einen erfahrenen Shinobi, der während des Krieges die Evakuierung mehrerer Grenzsiedlungen geleitet hatte. Viele Familien kannten ihn aus jener Zeit. Die Akimichi unterstützten seine Wahl, weil sie erlebt hatten, wie er selbst unter schwierigen Bedingungen die Versorgung der Flüchtlinge aufrechterhalten hatte. Die Uchiha erwarteten von ihm, dass er ihnen mehr Mitsprache einräumen würde. Unter den Senju blieb umstritten, wer künftig über die geheimen Befehle aus Tobiramas Amtszeit verfügen durfte.",
          "Der neue Hokage versprach, nach den Vermissten des Krieges suchen zu lassen. Dabei stießen seine Shinobi im Dorfarchiv auf Einsatzbefehle für Männer und Frauen, die offiziell als desertiert galten. Sie waren unter falschen Namen an die Grenze geschickt worden. Als die ersten Familien von den Befehlen erfuhren, verlangten sie Antworten. Einige hatten jahrelang geglaubt, ihre Angehörigen hätten das Dorf im Stich gelassen."
        ]
      },
      {
        "place": "Konohagakure",
        "title": "Der Zweikampf an der Grenze",
        "color": "#6fbf4a",
        "text": [
          "Der Waffenstillstand mit Sunagakure gab beiden Dörfern Zeit für den Wiederaufbau. An der Grenze gingen die Überfälle auf Karawanen weiter, und nach einem gescheiterten Einsatz trafen Shinobi aus beiden Dörfern auf neutralem Boden aufeinander. Der Dritte Kazekage forderte das dort anwesende Oberhaupt der Senju zum Zweikampf.",
          "Der Senju kehrte nach Konoha zurück. Der Kazekage wurde schwer verwundet nach Sunagakure gebracht. Wenig später meldete Suna seinen Tod. Seitdem kommen die Patrouillen beider Dörfer mit widersprüchlichen Berichten zurück. In Konoha streitet der Rat darüber, ob er eine Gesandtschaft schicken oder die Grenzposten verstärken soll."
        ]
      }
    ],
    "hook": [
      "Sunagakure hat inzwischen einen neuen Kazekage gewählt. In Konoha muss der Dritte Hokage entscheiden, wie er auf den Machtwechsel reagiert. Die Familien der Vermissten hoffen, dass die Grenze offen bleibt und die Suche weitergehen kann. Andere haben im letzten Krieg genug verloren und verlangen, dass er zuerst die Dörfer im Feuerreich schützt. Während der Rat berät, stehen die ersten jungen Shinobi seit Wiedereröffnung der Akademie vor ihrer Abschlussprüfung.",
      "Wird der neue Hokage Konoha zu neuem Ruhm führen oder das Dorf in einen Krieg treiben, der es zugrunde richtet? Wie ihr den Willen des Feuers weitertragt, liegt in euren Händen."
    ]
  },
  {
    "id": "suna",
    "tab": "Sunagakure",
    "color": "#d9a441",
    "title": "Das Dorf verborgen im Sand",
    "place": "Sunagakure",
    "intro": "Am Morgen nach dem Duell öffneten sich die Tore Sunagakures für eine Trage. Bis zum Abend hatte sich im Dorf herumgesprochen, dass der Dritte Kazekage darauf gelegen hatte.",
    "chapters": [
      {
        "place": "Sunagakure",
        "title": "Reto und die Gründung Sunagakures",
        "color": "#d9a441",
        "text": [
          "Lange bevor Sunagakure auf den Karten des Windreichs stand, zogen die Clans der Wüste zwischen Brunnen, Oasen und Handelsplätzen umher. In guten Jahren teilten sie die Wege. In schlechten Jahren stritten sie darum, wer die wenigen Wasserstellen bewachen und wer aus ihnen trinken durfte.",
          "Reto brachte die verfeindeten Clans an einen Tisch. Unter seiner Führung verpflichteten sie sich, die Brunnen und Karawanen gemeinsam zu schützen. Aus dem Bündnis entstand Sunagakure, und Reto wurde sein Erster Kazekage. Die Shinobi des jungen Dorfes entwickelten eigene Techniken für den Kampf im Sand. Ihre Späher kannten Pfade durch die Dünen, die auf keiner Karte verzeichnet waren.",
          "Mit den ersten dauerhaften Siedlungen kamen neue Streitfragen auf. Wer durfte über die Vorräte bestimmen? Welche Clans sollten ihre Shinobi an die Grenze schicken? Als Reto unter ungeklärten Umständen ermordet wurde, musste der Rat zum ersten Mal ohne den Mann auskommen, der das Bündnis geschlossen hatte."
        ]
      },
      {
        "place": "Sunagakure",
        "title": "Shamon und das Erbe des Einschwänzigen",
        "color": "#d9a441",
        "text": [
          "Shamon, der Zweite Kazekage, übernahm ein Dorf, dessen Nachbarn im Krieg immer mehr Macht gewannen. Während andere Großmächte begannen, die Kräfte der Bijū für sich zu nutzen, ließ er alte Aufzeichnungen über Shukaku, den Einschwänzigen, zusammentragen. Er wollte herausfinden, wie sich dessen Chakra in einem Jinchūriki binden ließe.",
          "Für sein Vorhaben wählte Shamon ein Kind aus Sunagakure aus, dessen Chakra bei den ersten Untersuchungen ungewöhnlich auf die Siegel reagierte. Im Dorf wussten nur wenige, warum das Kind regelmäßig zu ihm gebracht wurde. Die Familie bekam zu hören, dass seine Ausbildung unter dem persönlichen Schutz des Kazekage stünde.",
          "Dann wurde Shamon ermordet. In den Tagen danach stritt der Rat darüber, wer seine Aufzeichnungen verwahren und die Verantwortung für das Kind übernehmen sollte. Als schließlich eine Wache zu seinem Quartier geschickt wurde, war es verschwunden."
        ]
      },
      {
        "place": "Sunagakure",
        "title": "Die Lanze in den Dünen",
        "color": "#d9a441",
        "text": [
          "Mehrere Suchtrupps folgten den Wegen aus dem Dorf. In einer Senke abseits der Karawanenroute fanden sie zerbrochenen Fels, Furchen im Boden und mitten darin eine Lanze, die tief im Sand steckte. Die Familie erkannte sie an einer Kerbe unterhalb der Spitze. Sie hatte dem Kind gehört.",
          "Die Suchtrupps kehrten ohne das Kind zurück. Seine Familie bewahrte die Lanze auf und bat den Rat jedes Jahr um eine neue Suche. Bei den Shinobi, die damals in der Senke gewesen waren, hielt sich unterdessen eine Frage. Der Fundort lag eine Tagesreise von den Toren entfernt. Wie hatte das Kind ihn in der Nacht seines Verschwindens erreicht?"
        ]
      },
      {
        "place": "Sunagakure",
        "title": "Der Dritte Kazekage",
        "color": "#d9a441",
        "text": [
          "Nach Shamons Tod brauchte der Rat Wochen, um sich auf einen Nachfolger zu einigen. Die Wahl fiel schließlich auf den Shinobi, der während der letzten Belagerung die Versorgung des Dorfes organisiert hatte. Als Dritter Kazekage stellte er die Zisternen unter die Verwaltung Sunagakures. In den unteren Vierteln gab es daraufhin zum ersten Mal seit Monaten regelmäßige Wasserlieferungen. Einige Clanälteste behielten trotzdem die Schlüssel zu ihren Brunnen.",
          "An der Grenze zum Feuerreich häuften sich derweil die Überfälle auf Karawanen. Nach einem gescheiterten Einsatz gerieten Shinobi aus Suna und Konoha auf neutralem Boden aneinander. Um eine weitere Auseinandersetzung zwischen ihren Einheiten zu verhindern, forderte der Kazekage das anwesende Oberhaupt der Senju zum Zweikampf.",
          "Der Senju verließ den Kampfplatz aus eigener Kraft. Der Kazekage wurde schwer verletzt nach Sunagakure zurückgebracht. Noch in derselben Nacht meldete der Rat seinen Tod. Am nächsten Morgen stand vor dem Krankenzimmer weiterhin eine Wache, und den Angehörigen wurde der Zutritt verweigert."
        ]
      }
    ],
    "hook": [
      "Nach dem Tod des Dritten Kazekage hat der Rat von Sunagakure einen Nachfolger gewählt. Als der neue Kazekage zum ersten Mal vor sein Dorf tritt, haben sich die Clanältesten, die Händler und die Familien der Vermissten vor seinem Amtssitz versammelt. Die einen wollen ihre Brunnen zurück, die anderen fordern sichere Handelswege. Und die Familien warten noch immer darauf, dass jemand Shamons versiegelte Aufzeichnungen öffnet.",
      "Jenseits der Dünen hält der Waffenstillstand mit Konoha. Doch seit dem Duell reicht an der Grenze schon eine verspätete Patrouille, um Gerüchte über einen neuen Angriff auszulösen. Die erste Entscheidung des Kazekage wird zeigen, wem er vertraut und wer bereit ist, ihm zu folgen.",
      "Wird der neue Kazekage Sunagakure zu neuem Ruhm führen oder das Dorf in den Untergang stürzen? Was aus dem Dorf im Sand wird, liegt auch in euren Händen."
    ]
  }
],

  /* ------------------------------------------------------------ BEWERBUNGS-GUIDE (bewerbung.html)
     Auf NK kann jeder ohne Bewerbung spielen. Bewerben muss man sich nur für hohe Posten.
     posts = welche Posten, mit Voraussetzung. steps = Ablauf. sections = worauf wir achten.
     goals = schwache und starke Beispiele. checklist = vor dem Einreichen. Alles frei anpassbar. */
  bewerbung: {
    intro: "Auf NK brauchst du keine Bewerbung, um zu spielen. Komm in den Discord, erstell deinen Charakter und leg los. Bewerben musst du dich nur, wenn dein Charakter einen hohen Posten übernehmen soll. Diese Posten tragen Verantwortung für andere Spieler. Deshalb wollen wir vorher wissen, was du mit ihnen vorhast.",
    posts: [
      ["Kage", "Erfahrener Jōnin", "Führt das Dorf. Wird vom Rat gewählt, die Entscheidung fällt im RP."],
      ["Berater des Kage", "Erfahrener Jōnin", "Engste Vertraute und Strategen des Kage."],
      ["Jōnin-Kommandant", "Jōnin", "Führt die Jōnin und das Militär des Dorfes."],
      ["Jōnin", "Chūnin", "Führt schwere Missionen und bildet Genin-Teams aus."],
      ["Akademie-Lehrer", "Chūnin", "Unterrichtet die nächste Generation. Drei Posten pro Dorf."],
      ["Clanleitung", "Mitglied des Clans", "Führt den Clan und seine zwei Mitglieder. Ein Posten pro Clan."],
      ["Leitung einer Abteilung", "Je nach Abteilung", "Siehe Abteilungen."],
      ["ANBU", "Keine Bewerbung", "Wer zur ANBU gehört, wird vom Kommandanten ausgewählt."]
    ],
    steps: [
      ["Spielen", "Jeder startet ohne Bewerbung. Sammle Erfahrung im RP und lerne das Dorf kennen."],
      ["Rang erreichen", "Für viele Posten braucht dein Charakter einen bestimmten Rang. Den erspielst du dir."],
      ["Freien Posten finden", "Du kannst dich nur auf einen Posten bewerben, der gerade frei ist."],
      ["Bewerbung schreiben", "Zeig, wer dein Charakter ist und was du mit dem Posten vorhast."],
      ["Entscheidung", "Das Team prüft deine Bewerbung. Wenn sie passt, wird die Übergabe im RP ausgespielt."]
    ],
    sections: [
      { title: "Dein Charakter", items: [
        "Wer ist dein Charakter und was hat er im RP bisher erlebt?",
        "Warum passt gerade er zu diesem Posten?",
        "Rang und Erfahrung passen zu dem, was der Posten verlangt."
      ]},
      { title: "Deine Pläne", items: [
        "Was willst du mit dem Posten konkret machen? Ein guter Plan beantwortet Wann, Wie und Warum.",
        "Wie gibst du anderen Spielern damit etwas zu spielen?",
        "Ein hoher Posten ist kein Preis. Er ist eine Aufgabe für das ganze Dorf."
      ]},
      { title: "Verantwortung", items: [
        "Wie gehst du mit Streit oder schwierigen Spielern um?",
        "Bist du bereit, Entscheidungen zu treffen, die nicht jedem gefallen?",
        "Kannst du deinen Posten auch abgeben, wenn du keine Zeit mehr hast?"
      ]},
      { title: "Aktivität", items: [
        "Gib deine Spielzeiten an, zum Beispiel: Montag 18 bis 22 Uhr.",
        "Ein Posten lebt davon, dass du regelmäßig da bist.",
        "Wenn du länger weg bist, sag dem Team rechtzeitig Bescheid."
      ]},
      { title: "Erfahrung", items: [
        "Hast du schon einmal einen ähnlichen Posten gespielt, auf NK oder anderswo?",
        "Was hast du dabei gelernt?",
        "Keine Erfahrung ist kein Ausschluss. Dann zählen deine Pläne umso mehr."
      ]},
      { title: "Was wir ablehnen", items: [
        "Bewerbungen, in denen nur steht, dass du den Posten willst, aber nicht wofür.",
        "Pläne, die nur deinem eigenen Charakter nützen.",
        "Pläne, die andere Spieler oder Clans zu etwas zwingen.",
        "Bewerbungen auf Posten, die gerade nicht frei sind."
      ]}
    ],
    goalsTitle: "Pläne: schwach und stark",
    goals: {
      bad: [
        ["Ich will Lehrer werden, weil ich gern erkläre.", "Sagt nichts darüber, was im RP passieren wird."],
        ["Als Hokage mache ich das Dorf stärker.", "Zu allgemein. Wie genau, und was haben andere Spieler davon?"],
        ["Ich will Clanleitung, weil ich den Clan schon lange spiele.", "Erfahrung ist gut, aber wo ist der Plan für den Clan?"]
      ],
      good: [
        ["Als Akademie-Lehrer will ich einmal pro Woche eine Unterrichtsstunde im RP halten. Jeden Monat gibt es eine kleine Prüfung, bei der die Schüler im Team eine Aufgabe im Wald lösen. Wer besteht, darf beim nächsten Mal einem Jüngeren helfen.", "Fester Rhythmus, klarer Ablauf und Spiel für viele Schüler."],
        ["Als Clanleitung der Hyūga will ich das Verhältnis zwischen Sōke und Bunke zum Thema machen. Jeden Monat gibt es eine Clanversammlung, bei der auch die Bunke sprechen darf. Die Ältesten werden das nicht mögen. Genau daraus entsteht RP.", "Greift die Lore auf, bezieht den ganzen Clan ein und schafft Reibung."]
      ]
    },
    checklist: [
      "Der Posten ist gerade frei.",
      "Mein Charakter hat den nötigen Rang.",
      "Ich habe erklärt, warum gerade mein Charakter passt.",
      "Ich habe konkrete Pläne mit Wann, Wie und Warum.",
      "Meine Pläne geben anderen Spielern etwas zu spielen.",
      "Ich habe meine Spielzeiten angegeben.",
      "Ich habe die Rechtschreibung noch einmal geprüft."
    ]
  },

  /* ------------------------------------------------------------ ABTEILUNGEN (abteilungen.html)
     Pro Dorf eine Liste. lead = Name der Leitung, leer = "Leitung offen". access = wer mitmachen kann. */
  abteilungen: {
    Konohagakure: [
      { name: "Führung des Dorfes", text: "Der Hokage und seine Berater. Hier werden die großen Entscheidungen getroffen, von Bündnissen bis zur Besetzung der Posten.", access: "Ernennung", lead: "" },
      { name: "Missionsbüro", text: "Nimmt Aufträge an, teilt sie nach Rang ein und vergibt sie an die Teams. Nach jeder Mission wird hier Bericht erstattet.", access: "ab Genin", lead: "" },
      { name: "Ninja-Akademie", text: "Bildet die nächste Generation aus: Grundlagen in Nin-, Tai- und Genjutsu, Chakra-Kontrolle und der Wille des Feuers. Es gibt drei Lehrerposten.", access: "Lehrer ab Chūnin", lead: "" },
      { name: "Militär", text: "Plant die Verteidigung des Dorfes, führt die Jōnin und koordiniert die Teams an der Grenze. Geleitet vom Jōnin-Kommandanten.", access: "ab Chūnin", lead: "" },
      { name: "Medizin", text: "Versorgt Verletzte im Dorf und auf Missionen und bildet Medizin-Ninja aus. Iryō-Ninjutsu verlangt die beste Chakra-Kontrolle von allen.", access: "ab Genin", lead: "" },
      { name: "Dorfpolizei", text: "Sorgt im Dorf für Ordnung und schützt die Bewohner. Seit dem Zweiten Hokage liegt sie in der Verantwortung der Uchiha.", access: "Uchiha und Ernennung", lead: "" },
      { name: "ANBU", text: "Die geheime Eliteeinheit des Hokage. Wer dazugehört, weiß kaum jemand. Man bewirbt sich nicht, man wird ausgewählt.", access: "Ernennung durch den Kommandanten", lead: "geheim" }
    ],
    Sunagakure: [
      { name: "Führung des Dorfes", text: "Der Kazekage und der Rat. Hier wird über Wasser, Handel und die Grenze entschieden, oft gegen den Willen einzelner Clans.", access: "Ernennung", lead: "" },
      { name: "Missionsbüro", text: "Verteilt die Aufträge, von denen Suna lebt. Weil das Windreich arm ist, zählt hier jede Mission.", access: "ab Genin", lead: "" },
      { name: "Ninja-Akademie", text: "Ausbildung mit Schwerpunkt auf Überleben in der Wüste, Fūton und Fallenbau. Es gibt drei Lehrerposten.", access: "Lehrer ab Chūnin", lead: "" },
      { name: "Militär", text: "Hält die Grenze, schützt die Karawanen und plant die Verteidigung der Schlucht, des einzigen Zugangs zum Dorf.", access: "ab Chūnin", lead: "" },
      { name: "Medizin", text: "Behandelt Verletzte und kennt sich wie kaum jemand sonst mit Giften und Gegengiften aus.", access: "ab Genin", lead: "" },
      { name: "Werkstätten", text: "Hier entstehen Puppen, Waffen und Gifte. Sunas Erfindungsgeist kommt aus diesen Räumen.", access: "ab Genin", lead: "" },
      { name: "Wasserwache", text: "Bewacht die Zisternen und Wasserspeicher, das wertvollste Gut des Dorfes. Seit dem Erlass des Kazekage untersteht sie dem Dorf und nicht mehr den Clans.", access: "ab Genin", lead: "" },
      { name: "ANBU", text: "Die geheime Eliteeinheit des Kazekage. Ihre Mitglieder kennt nur die Führung.", access: "Ernennung durch den Kommandanten", lead: "geheim" }
    ]
  }
};

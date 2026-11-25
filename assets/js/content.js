/* =====================================================================
   NK – INHALTE DER WEBSITE
   ---------------------------------------------------------------------
   Hier änderst du ALLES, was auf der Seite steht – ohne HTML anfassen.
   Einfach Text zwischen den Anführungszeichen ersetzen, speichern,
   auf GitHub hochladen. Fertig.
   Alles mit  >>  im Text ist ein Platzhalter, den ihr noch füllen solltet.
   ===================================================================== */

window.NK = {

  /* ------------------------------------------------------------ ALLGEMEIN */
  server: {
    name: "NK",
    title: "Naruto Roleplay",
    slogan: "Wähle dein Dorf. Schreib deine Geschichte. Werde zur Legende.",
    discord: "https://discord.gg/DEIN-INVITE",        // >> euren Discord-Invite eintragen
    // Release-Datum & Uhrzeit (deutsche Zeit). Format: JJJJ-MM-TTTHH:MM:SS+01:00
    release: "2026-12-26T18:00:00+01:00",               // >> echtes Datum eintragen
    connect: "",                                        // optional: Server-IP / Connect-Link, z. B. "connect nk-rp.de"
    stats: [                                            // Zahlen auf der Startseite
      { value: "5", label: "Großdörfer" },
      { value: "12", label: "Spielbare Clans" },
      { value: "6", label: "Ninja-Ränge" },
      { value: "∞", label: "Geschichten" }
    ]
  },

  /* ------------------------------------------------------------ FEATURES (Startseite) */
  features: [
    { icon: "🍃", title: "Eigene Ninja-Laufbahn", text: "Starte als Akademie-Schüler und kämpf dich über Genin und Chūnin bis zum Kage hoch – jede Beförderung wird ausgespielt." },
    { icon: "🔥", title: "Jutsu-System", text: "Elemente, Chakra-Kontrolle und Kekkei Genkai. Techniken lernst du im RP – bei Sensei, in Schriftrollen oder auf Missionen." },
    { icon: "🏯", title: "Lebendige Dörfer", text: "Jedes Dorf hat eigene Politik, Rangliste, Missionsbrett und Konflikte. Was ihr tut, verändert die Welt." },
    { icon: "⚔️", title: "Missionen D bis S", text: "Von Botengängen bis zu Attentaten: Missionen werden von Spielern & Teams geleitet und belohnt." },
    { icon: "📜", title: "Clans mit Geschichte", text: "Uchiha, Hyūga, Nara und mehr – mit Clan-Oberhäuptern, Traditionen und Geheimnissen." },
    { icon: "🌑", title: "Nuke-Nin & Untergrund", text: "Nicht jeder bleibt loyal. Verrat, Kopfgelder und geheime Organisationen gehören dazu." }
  ],

  /* ------------------------------------------------------------ ANKÜNDIGUNGEN
     pinned: true  -> wird oben hervorgehoben
     tag: "Update", "Event", "Wichtig", "Info" … frei wählbar
     text: normaler Text; Zeilen mit "- " am Anfang werden zur Liste       */
  news: [
    {
      date: "2026-11-25", tag: "Wichtig", pinned: true,
      title: "Es ist offiziell: Naruto RP auf NK",
      text: "Der Teaser hat es schon angedeutet – jetzt ist es raus. NK startet ein eigenes Naruto-Roleplay-Projekt. Alle Infos, Regeln und die Lore findet ihr ab sofort hier auf der Website.\n- Release-Countdown läuft auf der Startseite\n- Discord ist offen – kommt rein!\n- Wiki wird laufend erweitert"
    },
    {
      date: "2026-11-24", tag: "Teaser",
      title: "Bald startet etwas Neues …",
      text: "Der erste Teaser ist draußen. Wer genau hingeschaut hat, hat das Stirnband vielleicht schon gesehen."
    },
    {
      date: "2026-11-20", tag: "Info",
      title: "Serverleitung steht",
      text: "Die Serverleitung übernimmt DJ Reeps. Das restliche Team stellen wir in den nächsten Tagen vor."
    }
  ],

  /* ------------------------------------------------------------ LEAKS
     unlock: ab diesem Datum ist der Leak automatisch sichtbar.
             Leer lassen ("") = sofort sichtbar (aber verschwommen bis Klick).
     image:  optionales Bild, z. B. "assets/img/leak1.jpg" – sonst wird das icon gezeigt. */
  leaks: [
    { title: "Das Logo", icon: "🦅", image: "assets/img/logo-classic.webp", unlock: "", text: "Das klassische NK-Wappen – bevor es sein Stirnband bekam." },
    { title: "Erster Blick: Konoha", icon: "🍃", image: "", unlock: "", text: "Das Dorf versteckt hinter den Blättern wird der erste große Startpunkt für neue Spieler." },
    { title: "Kekkei-Genkai-System", icon: "👁️", image: "", unlock: "2026-12-05T18:00:00+01:00", text: "Wie Bluterben vergeben werden und warum nicht jeder ein Sharingan bekommt." },
    { title: "Die erste große Bedrohung", icon: "☁️", image: "", unlock: "2026-12-12T18:00:00+01:00", text: ">> Hier kommt euer Story-Leak hin." },
    { title: "Kage-Wahl", icon: "🏯", image: "", unlock: "2026-12-19T18:00:00+01:00", text: ">> Wie die ersten Kage bestimmt werden." },
    { title: "???", icon: "❓", image: "", unlock: "2026-12-26T18:00:00+01:00", text: "Zum Release." }
  ],

  /* ------------------------------------------------------------ LORE: DÖRFER */
  villages: [
    { short: "木", name: "Konohagakure", alias: "Das Dorf versteckt hinter den Blättern", land: "Feuerreich", kage: "Hokage", element: "Feuer",
      text: "Das größte und älteste der fünf Großdörfer. Konoha lebt vom „Willen des Feuers“: Zusammenhalt, Loyalität und der Glaube, dass jede Generation die nächste beschützt. Zwischen den alten Clans brodelt es trotzdem." },
    { short: "砂", name: "Sunagakure", alias: "Das Dorf versteckt im Sand", land: "Windreich", kage: "Kazekage", element: "Wind",
      text: "Mitten in der Wüste, umgeben von Felswänden. Wasser und Ressourcen sind knapp, deshalb gilt Suna als pragmatisch und hart. Berühmt für Puppenspieler und Windtechniken." },
    { short: "霧", name: "Kirigakure", alias: "Das Dorf versteckt im Nebel", land: "Wasserreich", kage: "Mizukage", element: "Wasser",
      text: "Ein Dorf im ewigen Nebel mit düsterer Vergangenheit – einst als „Blutiges Nebeldorf“ gefürchtet. Heimat der legendären sieben Schwertkämpfer." },
    { short: "雲", name: "Kumogakure", alias: "Das Dorf versteckt in den Wolken", land: "Blitzreich", kage: "Raikage", element: "Blitz",
      text: "Hoch in den Bergen über den Wolken. Militärisch das stärkste Dorf, stolz und direkt. Wer Kumo herausfordert, sollte schnell sein." },
    { short: "岩", name: "Iwagakure", alias: "Das Dorf versteckt im Stein", land: "Erdreich", kage: "Tsuchikage", element: "Erde",
      text: "Eine Festung aus Fels. Iwa ist misstrauisch gegenüber Fremden, standhaft und berühmt für seine Explosions- und Erdtechniken." }
  ],

  /* ------------------------------------------------------------ LORE: CLANS
     village: muss zum Dorf-Namen passen (für den Filter)
     status:  "Offen", "Limitiert", "Auf Anfrage", "Gesperrt"            */
  clans: [
    { name: "Uchiha", village: "Konohagakure", status: "Limitiert", ability: "Sharingan · Feuer-Jutsu", text: "Stolz, talentiert und oft missverstanden. Das Sharingan erwacht nur durch starke Gefühle." },
    { name: "Hyūga", village: "Konohagakure", status: "Limitiert", ability: "Byakugan · Sanfte Faust", text: "Streng geteilt in Haupt- und Nebenfamilie. Ihr Kampfstil greift direkt die Chakra-Bahnen an." },
    { name: "Nara", village: "Konohagakure", status: "Offen", ability: "Schatten-Techniken · Strategie", text: "Faul wirkend, aber brillante Taktiker. Kontrollieren Gegner über ihren Schatten." },
    { name: "Akimichi", village: "Konohagakure", status: "Offen", ability: "Körper-Expansion", text: "Herzlich, loyal und unterschätzt. Verwandeln Kalorien in rohe Kraft." },
    { name: "Yamanaka", village: "Konohagakure", status: "Offen", ability: "Geist-Techniken · Sensorik", text: "Spezialisten für Verhör und Aufklärung – und betreiben nebenbei den Blumenladen." },
    { name: "Inuzuka", village: "Konohagakure", status: "Offen", ability: "Ninken · Tier-Kampfstil", text: "Kämpfen Seite an Seite mit ihren Ninja-Hunden. Wild, laut, unzertrennlich." },
    { name: "Aburame", village: "Konohagakure", status: "Offen", ability: "Insekten-Symbiose", text: "Leben mit Käfern in ihrem Körper. Ruhig, logisch, gefährlich." },
    { name: "Uzumaki", village: "Konohagakure", status: "Auf Anfrage", ability: "Siegel-Techniken · Riesige Chakra-Reserven", text: "Nachfahren eines zerstörten Clans aus Uzushio. Meister der Versiegelung." },
    { name: "Sabaku", village: "Sunagakure", status: "Auf Anfrage", ability: "Sand-Manipulation", text: "Die Familie des Kazekage. Ihr Name allein sorgt in Suna für Respekt." },
    { name: "Hōzuki", village: "Kirigakure", status: "Offen", ability: "Wasser-Körper", text: "Können ihren Körper verflüssigen. Viele zieht es zu den Schwertkämpfern." },
    { name: "Kaguya", village: "Kirigakure", status: "Limitiert", ability: "Knochen-Manipulation", text: "Ein fast ausgelöschter Kriegerclan, der für den Kampf lebt." },
    { name: "Yuki", village: "Kirigakure", status: "Limitiert", ability: "Eis-Freisetzung", text: "Kombinieren Wind und Wasser zu Eis – und wurden dafür gejagt." }
  ],

  /* ------------------------------------------------------------ WIKI
     Jeder Eintrag = ein Artikel. "html" darf einfache HTML-Tags enthalten
     (<p>, <h2>, <ul><li>, <table>, <b>, <div class="note">)                */
  wiki: [
    { id: "start", cat: "Erste Schritte", title: "Neu hier? Start-Guide", html: `
      <p>Willkommen bei <b>NK – Naruto Roleplay</b>! So kommst du in fünf Schritten ins Spiel:</p>
      <ol>
        <li><b>Discord beitreten</b> und die Regeln bestätigen.</li>
        <li><b>Regeln lesen</b> – ja, wirklich. Die meisten Probleme entstehen durch Unwissen.</li>
        <li><b>Charakter überlegen:</b> Name, Herkunftsdorf, Clan (oder clanlos), Persönlichkeit, Ziel.</li>
        <li><b>Charakter-Steckbrief</b> im Discord einreichen.</li>
        <li>Nach der Freigabe startest du als <b>Akademie-Schüler</b> in deinem Dorf.</li>
      </ol>
      <div class="note">Tipp: Clanlose Charaktere sind kein Nachteil – viele der stärksten Ninja hatten keinen berühmten Namen.</div>` },
    { id: "charakter", cat: "Erste Schritte", title: "Charaktererstellung", html: `
      <h2>Pflichtangaben</h2>
      <ul><li>Vor- und Nachname (lore-tauglich, keine Canon-Charaktere)</li><li>Alter (ab 12 Jahren im RP)</li><li>Herkunftsdorf &amp; ggf. Clan</li><li>Kurze Vorgeschichte (mind. 5 Sätze)</li><li>Stärken &amp; Schwächen</li></ul>
      <h2>Nicht erlaubt</h2>
      <ul><li>Canon-Charaktere oder deren direkte Verwandte (z. B. „Sohn von Itachi“)</li><li>Mehrere Kekkei Genkai</li><li>Start mit hohem Rang</li></ul>` },
    { id: "raenge", cat: "System", title: "Ninja-Ränge", html: `
      <p>Beförderungen passieren <b>im RP</b> – durch Prüfungen, Missionen und Entscheidungen der Dorfleitung.</p>
      <table><tr><th>Rang</th><th>Voraussetzung</th><th>Missionen</th></tr>
        <tr><td>Akademie</td><td>Start</td><td>–</td></tr>
        <tr><td>Genin</td><td>Akademie-Abschlussprüfung</td><td>D, C</td></tr>
        <tr><td>Chūnin</td><td>Chūnin-Auswahlprüfung</td><td>C, B</td></tr>
        <tr><td>Jōnin</td><td>Ernennung durch den Kage</td><td>B, A</td></tr>
        <tr><td>ANBU</td><td>Auswahl durch den Kage</td><td>A, S (geheim)</td></tr>
        <tr><td>Kage</td><td>Wahl / Ernennung (Event)</td><td>Dorfführung</td></tr></table>` },
    { id: "jutsu", cat: "System", title: "Jutsu & Chakra", html: `
      <p>Jeder Charakter hat eine <b>Chakra-Natur</b> (Element). Weitere Elemente können später erlernt werden.</p>
      <h2>Jutsu lernen</h2>
      <ul><li>Bei einem Sensei (RP-Training)</li><li>Aus Schriftrollen (Belohnung, Handel, Diebstahl …)</li><li>Clan-Techniken nur innerhalb des Clans</li></ul>
      <h2>Grenzen</h2>
      <p>Verbotene Techniken (Kinjutsu) sind nur über Events zugänglich. Keine „unendlichen“ Techniken – jedes Jutsu kostet Chakra.</p>` },
    { id: "kekkei", cat: "System", title: "Kekkei Genkai", html: `
      <p>Bluterben (Sharingan, Byakugan, Eis-Freisetzung …) sind <b>limitiert</b>, damit sie besonders bleiben.</p>
      <div class="note">>> Hier könnt ihr eintragen, wie viele Plätze es pro Clan gibt und wie man sich darauf bewirbt.</div>` },
    { id: "missionen", cat: "System", title: "Missionen", html: `
      <table><tr><th>Rang</th><th>Art</th><th>Beispiel</th></tr>
        <tr><td>D</td><td>Alltag</td><td>Katze suchen, Felder ernten</td></tr>
        <tr><td>C</td><td>Leichter Schutz</td><td>Händler eskortieren</td></tr>
        <tr><td>B</td><td>Kampf möglich</td><td>Banditen vertreiben</td></tr>
        <tr><td>A</td><td>Gefährlich</td><td>Spionage im Feindesland</td></tr>
        <tr><td>S</td><td>Lebensgefahr</td><td>Nuke-Nin jagen, Attentate</td></tr></table>` },
    { id: "kampf", cat: "Roleplay", title: "Kampf-RP", html: `
      <ul><li>Jeder Angriff wird <b>angekündigt</b>, nicht automatisch getroffen („versucht zu treffen“).</li><li>Der Gegner entscheidet über Ausweichen/Treffer – fair und realistisch.</li><li>Kein Powergaming, kein Metagaming.</li><li>Tod eines Charakters (CK) nur mit Zustimmung oder per Team-Entscheidung.</li></ul>` },
    { id: "begriffe", cat: "Roleplay", title: "RP-Begriffe", html: `
      <table><tr><th>Begriff</th><th>Bedeutung</th></tr>
        <tr><td>IC / OOC</td><td>In Character / Out of Character</td></tr>
        <tr><td>Powergaming</td><td>Dinge tun, die dein Charakter nicht kann, oder anderen keine Chance lassen</td></tr>
        <tr><td>Metagaming</td><td>OOC-Wissen im RP benutzen</td></tr>
        <tr><td>CK</td><td>Character Kill – dauerhafter Tod des Charakters</td></tr>
        <tr><td>Nuke-Nin</td><td>Abtrünniger Ninja ohne Dorf</td></tr></table>` }
  ],

  /* ------------------------------------------------------------ REGELN */
  rules: [
    { title: "Allgemein", items: [
      ["Respekt", "Behandle alle Spieler und Teammitglieder respektvoll. Beleidigungen, Rassismus, Sexismus und Diskriminierung führen zum Bann."],
      ["Team-Entscheidungen", "Anweisungen des Teams sind zu befolgen. Bei Problemen meldest du dich per Ticket – nicht im laufenden RP."],
      ["Accounts", "Ein Account pro Person. Account-Sharing ist verboten."],
      ["Werbung", "Keine Werbung für andere Server ohne Erlaubnis."]
    ]},
    { title: "Roleplay", items: [
      ["Charakter halten", "Bleib in deiner Rolle. OOC nur in den vorgesehenen Kanälen bzw. mit Kennzeichnung."],
      ["Kein Powergaming", "Du spielst einen Menschen, keinen Gott. Lass anderen Spielern immer eine Reaktionsmöglichkeit."],
      ["Kein Metagaming", "Wissen aus Discord, Streams oder OOC-Gesprächen darf im RP nicht verwendet werden."],
      ["Fear-RP", "Dein Charakter hat Angst um sein Leben. Wer gegen fünf Jōnin allein angreift, braucht einen sehr guten Grund."],
      ["Canon", "Canon-Charaktere sind nicht spielbar. Die Welt ist von Naruto inspiriert, die Geschichte schreibt ihr."]
    ]},
    { title: "Kampf & Jutsu", items: [
      ["Ankündigung", "Angriffe und Jutsu werden angespielt, nicht automatisch ausgeführt."],
      ["Chakra", "Jutsu kosten Chakra. Endlos-Spam ist Powergaming."],
      ["Kekkei Genkai", "Nur mit Freigabe durch das Team nutzbar."],
      ["Character Kill", "CKs nur mit Zustimmung des Spielers oder nach Team-Entscheidung bei schweren Vergehen im RP."]
    ]},
    { title: "Discord", items: [
      ["Kanäle", "Nutze die Kanäle für ihren Zweck. Spam und Caps-Lock-Nachrichten werden entfernt."],
      ["Tickets", "Support, Beschwerden und Fragen an das Team bitte per Ticket."],
      ["Leaks", "Interne Infos aus Team-Kanälen dürfen nicht weitergegeben werden."]
    ]}
  ],

  /* ------------------------------------------------------------ FAQ */
  faq: [
    ["Wann ist der Release?", "Der genaue Termin steht im Countdown auf der Startseite. Updates gibt es zuerst im Discord."],
    ["Was kostet das?", "Nichts. NK ist kostenlos spielbar."],
    ["Brauche ich Naruto-Wissen?", "Hilft, ist aber kein Muss. Im Wiki erklären wir alles Wichtige zu Dörfern, Clans und Rängen."],
    ["Kann ich einen Uchiha spielen?", "Ja, aber Kekkei-Genkai-Clans sind limitiert. Wie die Plätze vergeben werden, steht im Wiki unter „Kekkei Genkai“."],
    ["Kann ich mehrere Charaktere haben?", ">> Eure Regel hier eintragen (z. B. „Ab Chūnin-Rang ist ein Zweitcharakter erlaubt“)."],
    ["Wo melde ich Regelverstöße?", "Per Ticket im Discord. Bitte mit Beweis (Clip oder Screenshot)."]
  ],

  /* ------------------------------------------------------------ TEAM
     avatar: optional Bildpfad, z. B. "assets/img/team/reeps.png" – sonst Initialen */
  team: [
    { group: "Serverleitung", members: [
      { name: "DJ Reeps", role: "Serverleitung", avatar: "", text: "Gründer von NK und Kopf hinter dem Naruto-Projekt." }
    ]},
    { group: "Administration", members: [
      { name: ">> Name", role: "Admin", avatar: "", text: "Zuständig für Technik & Server." },
      { name: ">> Name", role: "Admin", avatar: "", text: "Zuständig für Regeln & Support." }
    ]},
    { group: "Lore & Events", members: [
      { name: ">> Name", role: "Lore-Leitung", avatar: "", text: "Schreibt die Geschichte der Welt." },
      { name: ">> Name", role: "Event-Team", avatar: "", text: "Plant Prüfungen, Kriege und Großevents." },
      { name: ">> Name", role: "Supporter", avatar: "", text: "Erste Anlaufstelle bei Fragen." }
    ]}
  ]
};

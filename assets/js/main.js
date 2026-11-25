/* NK Website – Aufbau & Logik. Texte stehen in content.js */
(function () {
  "use strict";
  const D = window.NK, S = D.server;
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const discordSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.5 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z"/></svg>';

  const ICON = {
    home: '<path d="M3 5c6 1.3 12 1.3 18 0"/><path d="M5 9h14"/><path d="M7 6.5V21M17 6.5V21"/><path d="M12 9v3"/>',
    news: '<rect x="4" y="3" width="13" height="18" rx="1.5"/><path d="M17 8h3v11a2 2 0 0 1-2 2"/><path d="M7.5 7h6M7.5 11h6M7.5 15h4"/>',
    welt: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    wiki: '<path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z"/><path d="M6 3v18M9.5 8h5M9.5 12h5"/>',
    regelwerk: '<path d="M5 4h14M5 20h14"/><rect x="7" y="4" width="10" height="16"/><path d="M10 9h4M10 13h4"/>',
    team: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20c0-2.9-1.7-5-4.5-5.7"/>',
    galerie: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
    quiz: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    faq: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7"/><path d="M12 17h.01"/>',
    jutsu: '<path d="M12 2c1.5 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.6.7-2.6 1.5-3.5.2 1.6 1 2.5 2 2.5-.6-2.5-.4-4.6.5-7z"/><path d="M6 15c-1 1.5-1.5 2.7-1.5 4 0 1.5 3.4 3 7.5 3s7.5-1.5 7.5-3c0-1.3-.5-2.5-1.5-4"/>',
    dorftest: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    changelog: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/><path d="M12 7.5V12l3 2"/>',
    social: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4"/>',
    soundOn: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    soundOff: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 5 6M22 9l-5 6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
  const PAGES = [
    ["index.html", "Start", "home"],
    ["news.html", "News", "news"],
    ["welt.html", "Welt", "welt"],
    ["wiki.html", "Wiki", "wiki"],
    ["jutsu.html", "Jutsu", "jutsu"],
    ["regelwerk.html", "Regelwerk", "regelwerk"],
    ["team.html", "Team", "team"],
    ["galerie.html", "Galerie", "galerie"],
    ["quiz.html", "Quiz", "quiz"],
    ["faq.html", "FAQ", "faq"],
    ["dorftest.html", "Dorf-Test", "dorftest"],
    ["changelog.html", "Changelog", "changelog"],
    ["social.html", "Social Media", "social"]
  ];
  const cur = (p) => (p === page ? ' aria-current="page"' : "");

  /* Discord-Knopf: ohne Link deaktiviert */
  const discordBtn = (cls = "btn", label = "Discord beitreten") =>
    S.discord
      ? `<a class="${cls}" href="${esc(S.discord)}" target="_blank" rel="noopener">${discordSvg}${label}</a>`
      : `<span class="${cls}" aria-disabled="true">${discordSvg}Discord-Link folgt</span>`;

  /* ---------------- Navigation ---------------- */
  const nav = document.createElement("header");
  nav.className = "nav";
  nav.innerHTML = `<div class="nav-in">
    <a class="nav-logo" href="index.html" aria-label="${esc(S.name)} Startseite"><img src="assets/img/logo-small.png" alt=""></a>
    <nav class="nav-links" aria-label="Kategorien">${PAGES.map(([h, l, p]) => `<a href="${h}"${cur(p)}>${icon(p)}${l}</a>`).join("")}</nav>
    <div class="nav-tools">
      <span class="online" hidden><i></i><b></b></span>
      <button type="button" class="sound-btn" aria-pressed="false" aria-label="Musik an/aus" title="Musik">${icon("soundOff")}</button>
      <input type="range" class="vol" min="0" max="100" step="1" value="50" aria-label="Lautstärke" title="Lautstärke" hidden>
      ${S.discord ? `<a class="nav-discord" href="${esc(S.discord)}" target="_blank" rel="noopener">${discordSvg}Discord</a>` : `<span class="nav-discord" aria-disabled="true">${discordSvg}Discord</span>`}
    </div>
  </div>`;
  document.body.prepend(nav);
  const act = nav.querySelector('[aria-current="page"]');
  const bar = nav.querySelector(".nav-links");
  const centerActive = () => {
    if (!act || bar.scrollWidth <= bar.clientWidth) return;
    const a = act.getBoundingClientRect(), b = bar.getBoundingClientRect();
    bar.scrollLeft += (a.left + a.width / 2) - (b.left + b.width / 2);
  };
  centerActive(); addEventListener("load", centerActive);
  if (document.fonts) document.fonts.ready.then(centerActive);

  /* ---------------- Footer ---------------- */
  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="wrap">
    <div class="f">
      <a class="brand" href="index.html"><img src="assets/img/logo-small.png" alt=""><div><b>NK Gaming Area</b><span>${esc(S.title)}</span></div></a>
      <nav aria-label="Fußzeile">${PAGES.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</nav>
    </div>
    ${(D.socials || []).some((x) => x.url) ? `<div class="f-social">${D.socials.filter((x) => x.url).map((x) => `<a href="${esc(x.url)}" target="_blank" rel="noopener" aria-label="${esc(x.platform)}">${(SOC[x.platform.toLowerCase()] || SOC.link).i}</a>`).join("")}</div>` : ""}
    <div class="legal-row"><nav aria-label="Rechtliches"><a href="impressum.html"${page === "impressum" ? ' aria-current="page"' : ""}>Impressum</a></nav>
    <p class="legal">© ${new Date().getFullYear()} NK Gaming Area. Ein Fan-Projekt, nicht offiziell verbunden mit Naruto, Masashi Kishimoto, Shueisha oder Studio Pierrot.</p></div>
  </div>`;
  $(".shell").append(footer);

  /* ---------------- Leere Schriftrolle ---------------- */
  const sealed = (title, text) => `<div class="scroll sealed"><div><h3>${title}</h3><p>${text}</p></div></div>`;

  /* ---------------- Countdown-Zettel ---------------- */
  function countdownTag(el) {
    const t = new Date(S.release).getTime();
    const head = `<img class="tag-logo" src="assets/img/logo-small.png" alt="">`;
    if (!S.release || isNaN(t)) { el.remove(); return; }  // kein Datum = kein Countdown
    const tick = () => {
      const d = t - Date.now();
      if (d <= 0) { el.innerHTML = `<div class="tag-paper">${head}<div class="live">Wir sind live</div></div>`; return; }
      const v = [[Math.floor(d / 864e5), "Tage"], [Math.floor(d / 36e5) % 24, "Stunden"], [Math.floor(d / 6e4) % 60, "Minuten"], [Math.floor(d / 1e3) % 60, "Sekunden"]];
      el.innerHTML = `<div class="tag-paper">${head}<p class="label">Release in</p><div class="units">${v.map(([n, l]) => `<div class="u"><b>${String(n).padStart(2, "0")}</b><span>${l}</span></div>`).join("")}</div></div>`;
      setTimeout(tick, 1000);
    };
    tick();
  }

  /* ---------------- Bausteine für Inhalte ---------------- */
  const textBlock = (t) => {
    let html = "", list = [];
    const flush = () => { if (list.length) { html += `<ul>${list.map((l) => `<li>${l}</li>`).join("")}</ul>`; list = []; } };
    esc(t).split("\n").forEach((l) => { if (l.startsWith("- ")) list.push(l.slice(2)); else { flush(); if (l.trim()) html += `<p>${l}</p>`; } });
    flush(); return html;
  };
  const newsSorted = () => [...D.news].sort((a, b) => (b.pinned - a.pinned) || (new Date(b.date) - new Date(a.date)));
  const newsHTML = (n) => {
    const d = new Date(n.date);
    return `<article class="news"><time datetime="${esc(n.date)}">${d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}<small>${d.getFullYear()}</small></time>
      <div>${n.pinned ? '<span class="stamp-tag">Angepinnt</span> ' : ""}${n.tag ? `<span class="stamp-tag" style="color:#6a5a3d">${esc(n.tag)}</span>` : ""}<h3>${esc(n.title)}</h3>${textBlock(n.text)}</div></article>`;
  };
  const leakHTML = (l) => {
    const at = l.unlock ? new Date(l.unlock).getTime() : 0, locked = at > Date.now();
    const img = l.image ? `<img src="${esc(l.image)}" alt="">` : `<div class="ph">${icon("lock")}</div>`;
    const tag = locked
      ? `<div class="tag-paper"><img class="tag-logo" src="assets/img/logo-small.png" alt=""><p class="label" style="margin:0">Frei ab ${new Date(l.unlock).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}</p></div>`
      : `<div class="tag-paper"><img class="tag-logo" src="assets/img/logo-small.png" alt=""><p class="label" style="margin:0">Aufdecken</p></div>`;
    return `<button type="button" class="leak ${locked ? "locked" : "covered"}" ${locked ? "disabled" : ""}>
      <div class="leak-img">${img}<div class="leak-wrap">${tag}</div></div>
      <div class="leak-body"><h3>${locked ? "Versiegelt" : esc(l.title)}</h3><p>${locked ? "Dieser Leak öffnet sich von selbst." : esc(l.text)}</p></div></button>`;
  };
  const villageHTML = (v) => `<article class="village" id="${esc(v.name)}"${v.color ? ` style="--vc:${esc(v.color)}"` : ""}><div class="emblem" aria-hidden="true">${v.emblem ? `<img src="${esc(v.emblem)}" alt="">` : esc((v.name || "?").slice(0, 1))}</div>
    <div><h3>${esc(v.name)}</h3>${v.alias ? `<p class="alias">${esc(v.alias)}</p>` : ""}
    <dl>${v.land ? `<div><dt>Reich</dt><dd>${esc(v.land)}</dd></div>` : ""}${v.kage ? `<div><dt>Oberhaupt</dt><dd>${esc(v.kage)}</dd></div>` : ""}</dl>
    <p style="color:var(--ash)">${esc(v.text)}</p></div></article>`;


  /* ---------------- Serverstatus ---------------- */
  function serverStatus(el) {
    if (!el) return;
    const st = S.status || {}, NAMES = { entwicklung: "In Entwicklung", online: "Online", wartung: "Wartung", offline: "Offline" };
    const draw = (state, extra) => {
      state = NAMES[state] ? state : "entwicklung";
      el.className = `status s-${state}`;
      el.innerHTML = `<i aria-hidden="true"></i><span>Server: <b>${NAMES[state]}</b>${extra ? ` · ${esc(extra)}` : ""}${st.text ? ` · ${esc(st.text)}` : ""}</span>`;
      el.hidden = false;
    };
    draw(st.state);
    if (st.statusUrl) fetch(st.statusUrl, { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((d) => {
      if (!d) return;
      draw(d.online ? "online" : "offline", d.online && typeof d.players === "number" ? `${d.players}${d.max ? " / " + d.max : ""} Spieler` : "");
    }).catch(() => {});
  }

  /* ---------------- Social-Media-Icons ---------------- */
  const sv = (p, fill) => `<svg viewBox="0 0 24 24" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'} aria-hidden="true">${p}</svg>`;
  const SOC = {
    discord: { c: "#5865f2", i: discordSvg },
    tiktok: { c: "#ff2a55", i: sv('<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.3 4.4 5 4.6"/>') },
    youtube: { c: "#ff3b30", i: sv('<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z" fill="currentColor"/>') },
    instagram: { c: "#e4405f", i: sv('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>') },
    twitch: { c: "#9146ff", i: sv('<path d="M5 3 3.5 6.5V19H8v2.5h2.5L13 19h3.5L20.5 15V3z"/><path d="M11 7.5v4M15.5 7.5v4"/>') },
    x: { c: "#e8e6e0", i: sv('<path d="M4 4l16 16M20 4 4 20"/>') },
    link: { c: "#ffc400", i: sv('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>') }
  };

  /* ---------------- Spielbare Dörfer ---------------- */
  const PLAY = S.playable || [];
  const isPlayable = (name) => PLAY.includes(name);
  const villageColor = (name) => (Object.values((D.dorftest || {}).results || {}).find((r) => r.name === name) || {}).color
    || ((D.map || {}).markers || []).find((m) => m.name === name)?.color || "#ffc400";
  const playNote = () => PLAY.length ? `<div class="play-note"><b>Zum Start spielbar:</b> ${PLAY.map((n) => `<span style="--vc:${esc(villageColor(n))}">${esc(n)}</span>`).join(" und ")}. Die anderen Dörfer gibt es in der Welt, sie spielen aber erst einmal im Hintergrund.</div>` : "";

  /* ---------------- Karte ---------------- */
  const MAP_SVG = `<svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <radialGradient id="sea" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#0c1322"/><stop offset="1" stop-color="#03050a"/></radialGradient>
      <linearGradient id="land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1810"/><stop offset="1" stop-color="#100d08"/></linearGradient>
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="rgba(255,196,0,.05)"/></pattern>
    </defs>
    <rect width="1000" height="620" fill="url(#sea)"/><rect width="1000" height="620" fill="url(#grid)"/>
    <g fill="url(#land)" stroke="rgba(255,196,0,.55)" stroke-width="2">
      <path d="M120 140C160 80 260 70 330 95C400 60 520 70 600 60C690 50 770 80 800 140C830 200 790 240 760 270C780 320 760 380 720 420C690 470 620 500 560 520C480 560 380 555 300 530C220 510 150 480 110 420C70 360 90 300 80 250C70 200 90 170 120 140Z"/>
      <path d="M840 330C870 300 920 312 935 342C950 377 925 412 890 414C855 416 825 382 840 330Z"/>
      <path d="M880 455C900 440 930 450 932 470C935 495 905 505 888 493C872 482 868 465 880 455Z"/>
      <path d="M905 250C920 238 945 245 945 262C945 282 920 287 907 277C897 269 897 257 905 250Z"/>
    </g>
    <g fill="none" stroke="rgba(255,196,0,.22)" stroke-width="1.5" stroke-dasharray="6 7">
      <path d="M340 92C350 170 360 230 330 300C300 350 250 380 190 395"/>
      <path d="M560 66C565 140 600 200 680 240C720 260 750 268 760 270"/>
      <path d="M330 300C400 290 470 280 560 300C620 315 680 330 735 330"/>
      <path d="M190 395C230 430 260 470 300 530"/>
    </g>
    <g fill="rgba(255,196,0,.08)" font-family="Anton NK, Impact, sans-serif" font-size="30" letter-spacing="4">
      <text x="140" y="215">ERDE</text><text x="600" y="150">BLITZ</text><text x="420" y="430">FEUER</text><text x="120" y="470">WIND</text><text x="830" y="520">WASSER</text>
    </g>
    <g transform="translate(70 540)" stroke="rgba(255,196,0,.5)" fill="none"><circle r="26"/><path d="M0-34V34M-34 0H34"/><path d="M0-26 6 0 0 26-6 0Z" fill="rgba(255,196,0,.5)"/></g>
  </svg>`;
  function renderMap(el) {
    if (!el) return;
    const M = D.map || {}, mk = M.markers || [];
    el.innerHTML = `<div class="map${M.image ? " has-img" : ""}">${M.image ? `<img src="${esc(M.image)}" alt="Karte der Welt">` : MAP_SVG}
      ${mk.map((m, i) => `<button type="button" class="marker${m.small ? " small" : ""}${!m.small && PLAY.length ? (isPlayable(m.name) ? " playable" : " npc") : ""}" data-i="${i}" aria-expanded="false" aria-label="${esc(m.name)}" style="left:${+m.x}%;top:${+m.y}%;--mc:${esc(m.color || "#ffc400")}"><i class="dot"></i><span>${esc(m.name)}</span></button>`).join("")}</div>`;
    const map = el.querySelector(".map");
    const close = () => { map.querySelector(".map-pop")?.remove(); map.querySelectorAll(".marker").forEach((b) => b.setAttribute("aria-expanded", "false")); };
    map.addEventListener("click", (e) => {
      const b = e.target.closest(".marker");
      if (!b) { if (!e.target.closest(".map-pop")) close(); return; }
      const open = b.getAttribute("aria-expanded") === "true"; close(); if (open) return;
      const m = mk[+b.dataset.i]; b.setAttribute("aria-expanded", "true");
      const hasVillage = (D.villages || []).some((v) => v.name === m.name);
      const pop = document.createElement("div");
      pop.className = "map-pop" + (+m.y < 40 ? " below" : "");
      pop.style.cssText = `left:${Math.min(Math.max(+m.x, 18), 82)}%;top:${+m.y}%;--mc:${m.color || "#ffc400"}`;
      pop.innerHTML = `<h3>${esc(m.name)}</h3>${m.realm ? `<small>${esc(m.realm)}</small>` : ""}${!m.small && PLAY.length ? `<span class="badge ${isPlayable(m.name) ? "yes" : "no"}">${isPlayable(m.name) ? "Spielbar" : "Zum Start nicht spielbar"}</span>` : ""}${m.text ? `<p>${esc(m.text)}</p>` : ""}${hasVillage ? `<a href="#${encodeURIComponent(m.name)}">Mehr über das Dorf</a>` : m.link ? `<a href="${esc(m.link)}">Mehr im Wiki</a>` : ""}`;
      map.append(pop);
    });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------------- Dorf-Test ---------------- */
  function dorftest(el) {
    if (!el) return;
    const T = D.dorftest || {}, Q = T.questions || [], RES = T.results || {};
    if (!Q.length) { el.innerHTML = sealed("Der Dorf-Test kommt bald", "Ein paar Fragen, und du weißt, welches Dorf zu dir passt."); return; }
    let i = 0, pts = {};
    const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((x) => x[1]);
    const result = (key, scores) => {
      const r = RES[key] || { name: key, color: "#ffc400", text: "" }, total = Object.values(scores || {}).reduce((a, b) => a + b, 0) || 1;
      const bars = scores ? Object.entries(RES).map(([k, x]) => [x, scores[k] || 0]).sort((a, b) => b[1] - a[1]) : [];
      let alt = "";
      if (PLAY.length && !isPlayable(r.name)) {
        const opts = Object.entries(RES).filter(([, x]) => isPlayable(x.name)).sort((a, b) => ((scores || {})[b[0]] || 0) - ((scores || {})[a[0]] || 0));
        const best = opts[0] && opts[0][1];
        alt = `<div class="play-note">${esc(r.name)} ist zum Start nicht spielbar.${best ? ` Von den spielbaren Dörfern passt <span style="--vc:${esc(best.color)}">${esc(best.name)}</span> am besten zu dir.` : ""}</div>`;
      }
      el.innerHTML = `<div class="result" style="--vc:${esc(r.color)}"><div class="scroll"><p class="kicker-line">Dein Dorf ist</p><h3>${esc(r.name)}</h3><p>${esc(r.text)}</p>${alt}
        ${bars.length ? `<div class="bars">${bars.map(([x, n]) => `<div class="bar"><span>${esc(x.name)}</span><b><i style="width:${(n / total) * 100}%;--c:${esc(x.color)}"></i></b><span>${Math.round((n / total) * 100)}%</span></div>`).join("")}</div>` : ""}
        <div class="form-actions"><button type="button" class="btn" id="dt-share">Ergebnis teilen</button><button type="button" class="btn btn-ghost" id="dt-again">Nochmal machen</button><p class="hint" id="dt-hint" aria-live="polite"></p></div></div></div>`;
      $("#dt-again", el).addEventListener("click", () => { history.replaceState(null, "", location.pathname + "#dorftest"); i = 0; pts = {}; ask(); });
      $("#dt-share", el).addEventListener("click", async () => {
        const url = `${location.origin}${location.pathname}?dorf=${encodeURIComponent(key)}#dorftest`, msg = `Mein Dorf bei NK ist ${r.name}. Welches ist deins?`;
        try { if (navigator.share) { await navigator.share({ title: "NK Dorf-Test", text: msg, url }); return; } await navigator.clipboard.writeText(`${msg} ${url}`); $("#dt-hint", el).textContent = "Link kopiert."; }
        catch (e) { $("#dt-hint", el).textContent = url; }
      });
    };
    const ask = () => {
      if (i >= Q.length) {
        const top = Object.entries(pts).sort((a, b) => b[1] - a[1])[0][0];
        history.replaceState(null, "", `${location.pathname}?dorf=${encodeURIComponent(top)}#dorftest`);
        return result(top, pts);
      }
      const q = Q[i];
      el.innerHTML = `<div class="scroll quiz dorftest"><div class="quiz-top"><span>Frage ${i + 1} von ${Q.length}</span><div class="quiz-bar"><i style="width:${(i / Q.length) * 100}%"></i></div></div>
        <h3>${esc(q.q)}</h3><div class="answers">${shuffle(q.answers).map(([t, k]) => `<button type="button" data-k="${esc(k)}">${esc(t)}</button>`).join("")}</div></div>`;
      el.querySelector(".answers").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; pts[b.dataset.k] = (pts[b.dataset.k] || 0) + 1; i++; ask(); });
    };
    const shared = new URLSearchParams(location.search).get("dorf");
    if (shared && RES[shared]) result(shared, null); else ask();
  }

  /* ---------------- Discord live ---------------- */
  if (S.discordId) {
    fetch(`https://discord.com/api/guilds/${encodeURIComponent(S.discordId)}/widget.json`).then((r) => r.ok ? r.json() : null).then((d) => {
      if (!d || typeof d.presence_count !== "number") return;
      const o = $(".online"); o.hidden = false; o.querySelector("b").textContent = `${d.presence_count} online`;
    }).catch(() => {});
  }

  /* ---------------- Ambient-Sound (nur auf Klick) ---------------- */
  (function sound() {
    const btn = $(".sound-btn"); if (!btn) return;
    let ctx, master, running = false, timer, audioEl;
    const vol = $(".vol");
    let level = 0.5; try { const v = localStorage.getItem("nk-vol"); if (v !== null) level = +v; } catch (e) {}
    vol.value = Math.round(level * 100);
    const paint = () => vol.style.setProperty("--p", vol.value + "%");
    paint();
    vol.addEventListener("input", () => {
      level = vol.value / 100; paint();
      try { localStorage.setItem("nk-vol", level); } catch (e) {}
      if (audioEl) audioEl.volume = level;
      if (ctx && master && running) master.gain.setTargetAtTime(level, ctx.currentTime, .05);
    });
    const scale = [293.66, 311.13, 392, 440, 466.16, 587.33, 622.25, 783.99];
    const pluck = () => {
      const t = ctx.currentTime, f = scale[Math.floor(Math.random() * scale.length)] / (Math.random() < .3 ? 2 : 1);
      const o = ctx.createOscillator(), g = ctx.createGain(), o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o.type = "triangle"; o.frequency.value = f; o2.type = "sine"; o2.frequency.value = f * 2;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + 3.2);
      g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(.05, t + .01); g2.gain.exponentialRampToValueAtTime(.0001, t + 1.4);
      o.connect(g).connect(master.delayIn); o2.connect(g2).connect(master.delayIn);
      o.start(t); o2.start(t); o.stop(t + 3.3); o2.stop(t + 1.5);
      timer = setTimeout(pluck, 1400 + Math.random() * 3200);
    };
    const start = () => {
      if (S.music) { audioEl = audioEl || Object.assign(new Audio(S.music), { loop: true }); audioEl.volume = level; audioEl.play().catch(() => {}); return; }
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (!master) {
        master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
        const delay = ctx.createDelay(); delay.delayTime.value = .42; const fb = ctx.createGain(); fb.gain.value = .35;
        const wet = ctx.createGain(); wet.gain.value = .5; const inp = ctx.createGain();
        inp.connect(master); inp.connect(delay); delay.connect(fb).connect(delay); delay.connect(wet).connect(master); master.delayIn = inp;
        const len = ctx.sampleRate * 3, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0); let last = 0;
        for (let k = 0; k < len; k++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[k] = last * 3.2; }
        const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
        const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 420;
        const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = .07; lg.gain.value = 260; lfo.connect(lg).connect(lp.frequency); lfo.start();
        const ng = ctx.createGain(); ng.gain.value = .5; noise.connect(lp).connect(ng).connect(master); noise.start();
      }
      ctx.resume(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(level, ctx.currentTime + 1.5);
      clearTimeout(timer); pluck();
    };
    const stop = () => {
      if (audioEl) audioEl.pause();
      if (ctx && master) { clearTimeout(timer); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6); }
    };
    btn.addEventListener("click", () => {
      running = !running; btn.setAttribute("aria-pressed", running); btn.innerHTML = icon(running ? "soundOn" : "soundOff");
      vol.hidden = !running;
      running ? start() : stop();
    });
  })();

  /* ---------------- Seiten ---------------- */
  const R = {
    home() {
      $("#hero-sub").textContent = S.slogan || "";
      serverStatus($("#status"));
      $("#hero-actions").innerHTML = discordBtn() + `<a class="btn btn-ghost" href="regelwerk.html">Zum Regelwerk</a>`;
      countdownTag($("#tag-cd"));
      $("#home-news").innerHTML = D.news.length
        ? `<div class="scroll">${newsSorted().slice(0, 3).map(newsHTML).join("")}</div>`
        : sealed("Noch versiegelt", "Die ersten Ankündigungen erscheinen hier, sobald das Team sie veröffentlicht.");
      $("#home-leaks").innerHTML = D.leaks.length
        ? `<div class="leaks">${D.leaks.slice(0, 3).map(leakHTML).join("")}</div>`
        : sealed("Noch nichts geleakt", "Vor dem Release tauchen hier erste Einblicke auf. Manche öffnen sich zu einem festen Zeitpunkt von selbst.");
      $("#join-btn").innerHTML = discordBtn();
      const sd = $("#step-discord");
      if (S.discord) { sd.href = S.discord; sd.target = "_blank"; sd.rel = "noopener"; }
      else { sd.removeAttribute("href"); sd.setAttribute("aria-disabled", "true"); sd.querySelector("span").textContent = "Der Link folgt in Kürze."; }
      $("#hall").innerHTML = D.hall.length
        ? `<div class="hall">${D.hall.map((h) => `<article class="hall-card"><div class="pic">${h.image ? `<img src="${esc(h.image)}" alt="">` : esc((h.name || "?").slice(0, 1))}</div><small>${esc(h.title || "")}</small><h3>${esc(h.name)}</h3>${h.text ? `<p>${esc(h.text)}</p>` : ""}</article>`).join("")}</div>`
        : sealed("Noch kein Ninja des Monats", "Hier ehren wir regelmäßig Spieler, die mit ihrem Roleplay herausgestochen sind.");
      $("#playable").innerHTML = PLAY.length ? `<div class="play-cards">${PLAY.map((n) => {
        const mk = ((D.map || {}).markers || []).find((m) => m.name === n) || {};
        return `<a class="play-card" style="--vc:${esc(villageColor(n))}" href="${esc(mk.link || "welt.html")}"><small>${esc(mk.realm || "")}</small><h3>${esc(n)}</h3><p>${esc(mk.text || "")}</p><span class="badge yes">Zum Start spielbar</span></a>`;
      }).join("")}</div>` : "";
      if (!PLAY.length) $("#playable").closest("section").remove();
      const res = Object.values((D.dorftest || {}).results || {});
      $("#teaser-dots").innerHTML = res.map((r) => `<i style="--c:${esc(r.color)}"></i>`).join("");
      if (!reduced) embers($(".hero canvas"));
    },
    news() {
      $("#list").innerHTML = D.news.length ? `<div class="scroll">${newsSorted().map(newsHTML).join("")}</div>`
        : sealed("Noch versiegelt", "Hier erscheinen alle Ankündigungen und Updates, das Neueste immer oben. Bis dahin gibt es alles im Discord.");
    },
    leaks() {
      $("#list").innerHTML = D.leaks.length ? `<div class="leaks">${D.leaks.map(leakHTML).join("")}</div>`
        : sealed("Noch nichts geleakt", "Sobald es erste Einblicke gibt, liegen sie hier verdeckt. Ein Klick deckt sie auf, gesperrte öffnen sich zum angegebenen Zeitpunkt.");
    },
    welt() {
      $("#map").insertAdjacentHTML("beforebegin", playNote());
      renderMap($("#map"));
      $("#timeline").innerHTML = D.timeline.length
        ? `<div class="timeline">${D.timeline.map((t) => `<article class="tl"><time>${esc(t.date)}</time><h3>${esc(t.title)}</h3>${t.text ? `<p>${esc(t.text)}</p>` : ""}</article>`).join("")}</div>`
        : sealed("Die Geschichte beginnt bald", "Was in der Welt von NK passiert, wird hier Schritt für Schritt festgehalten.");
      $("#villages").innerHTML = D.villages.length ? D.villages.map(villageHTML).join("")
        : sealed("Die Dörfer werden noch geschrieben", "Hier stellen sich bald die Dörfer vor, aus denen eure Charaktere stammen können.");
      if (!D.clans.length) { $("#clans").innerHTML = sealed("Clans folgen", "Jeder Clan bekommt hier seine Fähigkeiten, seine Geschichte und den Hinweis, ob er frei spielbar ist."); return; }
      const vs = ["Alle", ...new Set(D.clans.map((c) => c.village).filter(Boolean))];
      const draw = (f) => { $("#clans").innerHTML = `<div class="clans">${D.clans.filter((c) => f === "Alle" || c.village === f).map((c) =>
        `<article class="clan"><h3>${esc(c.name)}</h3>${c.ability ? `<div class="ab">${esc(c.ability)}</div>` : ""}<p>${esc(c.text)}</p><div class="st">${esc(c.status || "")}${c.village ? ` · ${esc(c.village)}` : ""}</div></article>`).join("")}</div>`; };
      $("#clan-filter").innerHTML = vs.map((v, i) => `<button type="button" class="chip" aria-pressed="${!i}">${esc(v)}</button>`).join("");
      $("#clan-filter").addEventListener("click", (e) => { const b = e.target.closest(".chip"); if (!b) return;
        $("#clan-filter").querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b)); draw(b.textContent); });
      draw("Alle");
    },
    wiki() {
      const C = D.wiki || [], side = $("#wiki-nav"), art = $("#wiki-article"), q = $("#wiki-search");
      const pages = C.flatMap((c) => c.pages.map((p) => ({ ...p, cat: c })));
      if (!pages.length) {
        side.innerHTML = `<p class="none">Noch keine Artikel.</p>`;
        art.innerHTML = sealed("Das Wiki ist noch leer", "Sobald die ersten Artikel stehen, findest du sie links und kannst sie durchsuchen.");
        q.disabled = true; return;
      }
      const plain = (h) => h.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
      const cur = () => pages.find((p) => p.id === decodeURIComponent(location.hash.slice(1))) || pages[0];
      const toggle = $("#wiki-toggle");
      const drawNav = () => {
        const term = q.value.trim().toLowerCase(), now = cur();
        if (term) {
          const hits = pages.filter((p) => (p.title + " " + plain(p.html)).toLowerCase().includes(term));
          side.innerHTML = hits.length
            ? `<p class="none">${hits.length} Treffer</p><ul class="wk-hits">${hits.map((p) => `<li><a href="#${p.id}">${esc(p.title)}<small>${esc(p.cat.name)}</small></a></li>`).join("")}</ul>`
            : `<p class="none">Nichts gefunden für „${esc(q.value)}“.</p>`;
          return;
        }
        side.innerHTML = C.map((c) => `<div class="wk-cat${c.id === now.cat.id ? " open" : ""}"><button type="button" aria-expanded="${c.id === now.cat.id}">${esc(c.name)}<span>${c.pages.length}</span></button>
          <ul>${c.pages.map((p) => `<li><a href="#${p.id}"${p.id === now.id ? ' aria-current="page"' : ""}>${esc(p.title)}</a></li>`).join("")}</ul></div>`).join("");
      };
      side.addEventListener("click", (e) => {
        const b = e.target.closest(".wk-cat > button");
        if (b) { const c = b.parentElement, o = !c.classList.contains("open"); c.classList.toggle("open", o); b.setAttribute("aria-expanded", o); }
        if (e.target.closest("a")) { document.body.classList.remove("wk-open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
      });
      const show = (scroll) => {
        const p = cur(), i = pages.indexOf(p), prev = pages[i - 1], next = pages[i + 1];
        art.innerHTML = `<div class="crumbs">${esc(p.cat.name)}</div><h1>${esc(p.title)}</h1>${p.html}
          <nav class="wk-pager" aria-label="Blättern">${prev ? `<a href="#${prev.id}"><small>Zurück</small>${esc(prev.title)}</a>` : "<span></span>"}${next ? `<a class="next" href="#${next.id}"><small>Weiter</small>${esc(next.title)}</a>` : ""}</nav>`;
        document.title = `${p.title} · Wiki · ${S.name}`;
        drawNav();
        if (scroll) window.scrollTo({ top: $(".wiki").offsetTop - 90, behavior: "smooth" });
      };
      q.addEventListener("input", () => { if (q.value) document.body.classList.add("wk-open"); drawNav(); });
      if (toggle) toggle.addEventListener("click", () => { const o = document.body.classList.toggle("wk-open"); toggle.setAttribute("aria-expanded", o); });
      addEventListener("hashchange", () => show(true));
      show(false);
    },
    regelwerk() {
      $("#rules").innerHTML = D.rules.length
        ? `<div class="chips">${D.rules.map((s, i) => `<a class="chip" href="#r${i + 1}">§${i + 1} ${esc(s.title)}</a>`).join("")}</div><div class="scroll">${D.rules.map((s, i) =>
          `<section class="rules-sec" id="r${i + 1}"><h2><span class="para">§${i + 1}</span>${esc(s.title)}</h2>${s.items.map(([t, d], j) => `<div class="rule"><div class="n">${i + 1}.${j + 1}</div><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join("")}</section>`).join("")}</div>`
        : sealed("Das Regelwerk wird gerade verfasst", "Hier steht bald alles, was auf dem Server gilt, sortiert nach Paragraphen.");
    },
    faq() {
      $("#faq-list").innerHTML = D.faq.length ? `<div class="faq">${D.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="a">${esc(a)}</div></details>`).join("")}</div>`
        : sealed("Noch keine Fragen beantwortet", "Häufige Fragen sammeln wir hier, sobald sie im Discord auftauchen.");
    },
    galerie() {
      const G = D.gallery || [];
      if (!G.length) { $("#gallery").innerHTML = sealed("Die Galerie ist noch leer", "Screenshots, Artworks und Event-Bilder landen hier. Ein Klick öffnet sie groß."); return; }
      $("#gallery").innerHTML = `<div class="gallery">${G.map((g, i) => `<button type="button" data-i="${i}"><img src="${esc(g.image)}" alt="${esc(g.title || "")}" loading="lazy">${g.title ? `<figcaption>${esc(g.title)}</figcaption>` : ""}</button>`).join("")}</div>`;
      $("#gallery").addEventListener("click", (e) => {
        const b = e.target.closest("button[data-i]"); if (!b) return;
        const g = G[+b.dataset.i], box = document.createElement("div");
        box.className = "lightbox"; box.innerHTML = `<div><img src="${esc(g.image)}" alt="">${g.title ? `<p>${esc(g.title)}</p>` : ""}</div>`;
        const close = () => { box.remove(); removeEventListener("keydown", key); };
        const key = (ev) => { if (ev.key === "Escape") close(); };
        box.addEventListener("click", close); addEventListener("keydown", key); document.body.append(box);
      });
    },
    quiz() {
      const Q = D.quiz || [], el = $("#quiz");
      if (!Q.length) { el.innerHTML = sealed("Das Quiz ist noch in Arbeit", "Bald kannst du hier testen, wie gut du dich in der Welt von NK auskennst."); return; }
      let i = 0, score = 0;
      const show = () => {
        if (i >= Q.length) {
          el.innerHTML = `<div class="scroll quiz"><p>Dein Ergebnis</p><div class="quiz-score">${score} / ${Q.length}</div>
            <p>${score === Q.length ? "Perfekt. Du kennst dich aus." : score >= Q.length / 2 ? "Gut gemacht. Da geht noch mehr." : "Schau mal ins Wiki und versuch es nochmal."}</p>
            <button type="button" class="btn" id="again">Nochmal spielen</button></div>`;
          $("#again").addEventListener("click", () => { i = 0; score = 0; show(); }); return;
        }
        const q = Q[i];
        el.innerHTML = `<div class="scroll quiz"><div class="quiz-top"><span>Frage ${i + 1} von ${Q.length}</span><div class="quiz-bar"><i style="width:${(i / Q.length) * 100}%"></i></div></div>
          <h3>${esc(q.q)}</h3><div class="answers">${q.answers.map((a, k) => `<button type="button" data-k="${k}">${esc(a)}</button>`).join("")}</div>
          <div class="quiz-foot"><p id="fb" aria-live="polite"></p></div></div>`;
        el.querySelector(".answers").addEventListener("click", (e) => {
          const b = e.target.closest("button"); if (!b || b.disabled) return;
          const k = +b.dataset.k, ok = k === q.correct; if (ok) score++;
          el.querySelectorAll(".answers button").forEach((x, j) => { x.disabled = true; if (j === q.correct) x.classList.add("right"); });
          if (!ok) b.classList.add("wrong");
          $("#fb").textContent = ok ? "Richtig." : `Falsch. Richtig ist: ${q.answers[q.correct]}`;
          const n = document.createElement("button"); n.type = "button"; n.className = "btn"; n.textContent = i + 1 < Q.length ? "Nächste Frage" : "Ergebnis anzeigen";
          n.addEventListener("click", () => { i++; show(); }); el.querySelector(".quiz-foot").append(n); n.focus();
        });
      };
      show();
    },
    changelog() {
      const L = D.changelog || [], el = $("#changelog");
      if (!L.length) { el.innerHTML = sealed("Noch keine Einträge", "Hier steht bald jede Änderung am Server: neue Inhalte, Anpassungen und behobene Fehler."); return; }
      const lab = { neu: "Neu", "geändert": "Geändert", behoben: "Behoben", entfernt: "Entfernt" };
      el.innerHTML = `<div class="timeline changelog">${L.map((v) => `<article class="tl"><time>${v.version ? "Version " + esc(v.version) : ""}${v.date ? `<small>${new Date(v.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}</small>` : ""}</time>
        ${v.title ? `<h3>${esc(v.title)}</h3>` : ""}<ul class="changes">${(v.changes || []).map(([k, x]) => `<li><span class="ch ch-${esc((k || "").toLowerCase())}">${esc(lab[(k || "").toLowerCase()] || k)}</span>${esc(x)}</li>`).join("")}</ul></article>`).join("")}</div>`;
    },
    impressum() {
      const I = D.impressum || {}, el = $("#impressum");
      const ready = I.name && I.address && I.city && I.email && (I.phone || I.contactForm);
      if (ready) {
        el.innerHTML = `<div class="scroll legal-doc">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>${esc(I.name)}${I.representative ? `<br>vertreten durch ${esc(I.representative)}` : ""}<br>${esc(I.address)}<br>${esc(I.city)}${I.country ? `<br>${esc(I.country)}` : ""}</p>
          <h2>Kontakt</h2>
          <p>E-Mail: <a href="mailto:${esc(I.email)}">${esc(I.email)}</a>${I.phone ? `<br>Telefon: ${esc(I.phone)}` : ""}${I.contactForm ? `<br>Kontaktformular: <a href="${esc(I.contactForm)}">${esc(I.contactForm)}</a>` : ""}</p>
          ${I.register ? `<h2>Registereintrag</h2><p>${esc(I.register)}</p>` : ""}
          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>${I.responsible ? esc(I.responsible) : `${esc(I.name)}, Anschrift wie oben`}</p>
          <h2>Haftung für Links</h2>
          <p>Diese Website enthält Links zu externen Seiten, auf deren Inhalte wir keinen Einfluss haben. Für diese Inhalte ist der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links umgehend.</p>
          <h2>Hinweis</h2>
          <p>NK Gaming Area ist ein Fan-Projekt und steht in keiner Verbindung zu Masashi Kishimoto, Shueisha, Studio Pierrot oder den Rechteinhabern von Naruto. Alle Marken gehören ihren jeweiligen Eigentümern.</p></div>`;
        return;
      }
      el.innerHTML = `<div class="play-note"><b>Vorlage.</b> Diese Seite zeigt, was in euer Impressum muss. Sobald ihr in <code>assets/js/content.js</code> unter <code>impressum</code> Name, Anschrift, E-Mail und einen zweiten Kontaktweg eintragt, erscheint hier automatisch das fertige Impressum.</div>
        <div class="scroll legal-doc">
          <h2>Pflichtangaben nach § 5 DDG</h2>
          <ul class="checklist">
            <li><b>Name:</b> Vor- und Nachname der verantwortlichen Person. Bei einem Verein oder einer Firma der vollständige Name mit Rechtsform (z. B. „NK Gaming e. V.“) und die vertretungsberechtigte Person.</li>
            <li><b>Ladungsfähige Anschrift:</b> Straße, Hausnummer, PLZ und Ort. Ein Postfach reicht nicht. Wer die eigene Wohnadresse nicht zeigen will, kann eine ladungsfähige Adresse über einen Impressum-Service nutzen.</li>
            <li><b>E-Mail-Adresse</b></li>
            <li><b>Zweiter schneller Kontaktweg:</b> Telefonnummer oder ein Kontaktformular.</li>
            <li><b>Nur falls vorhanden:</b> Registereintrag (Vereins- oder Handelsregister mit Nummer) und Umsatzsteuer-ID.</li>
          </ul>
          <h2>Verantwortlich nach § 18 Abs. 2 MStV</h2>
          <p>Weil die Seite News und redaktionelle Texte enthält, muss eine verantwortliche Person mit Name und Anschrift genannt werden. Das kann dieselbe Person wie oben sein.</p>
          <h2>Sinnvoll, aber freiwillig</h2>
          <ul class="checklist"><li>Haftungshinweis für externe Links</li><li>Hinweis, dass NK ein Fan-Projekt ist und nicht zu den Rechteinhabern von Naruto gehört</li></ul>
          <h2>Gut zu wissen</h2>
          <ul class="checklist">
            <li>Das Impressum muss von jeder Seite aus leicht erreichbar sein. Der Link unten in der Fußzeile erfüllt das.</li>
            <li>Die Impressumspflicht steht seit Mai 2024 im Digitale-Dienste-Gesetz (DDG), nicht mehr im TMG. Alte Vorlagen mit „§ 5 TMG“ sollten angepasst werden.</li>
            <li>Der früher übliche Link zur EU-Streitschlichtungsplattform ist seit Juli 2025 nicht mehr nötig, die Plattform wurde eingestellt.</li>
            <li>Sobald Discord-Anzeige, Musik oder andere externe Dienste eingebunden sind, braucht ihr zusätzlich eine Datenschutzerklärung.</li>
          </ul>
          <p class="fine">Diese Vorlage ist keine Rechtsberatung. Für ein verbindliches Impressum am besten einen Generator wie e-recht24 nutzen oder es prüfen lassen.</p>
          <h2>So sieht es fertig aus</h2>
          <div class="example"><p><b>Angaben gemäß § 5 DDG</b><br>Max Mustermann<br>Musterstraße 1<br>12345 Musterstadt</p><p><b>Kontakt</b><br>E-Mail: kontakt@beispiel.de<br>Telefon: 0123 456789</p><p><b>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</b><br>Max Mustermann, Anschrift wie oben</p></div>
        </div>`;
    },
    jutsu() {
      const J = D.jutsu || [], el = $("#jutsu");
      if (!J.length) { el.innerHTML = sealed("Die Jutsu-Datenbank ist noch leer", "Hier kannst du bald alle Techniken durchsuchen und nach Element, Rang und Art filtern."); return; }
      const EC = { Feuer: "#ff6a3d", Wind: "#8fd19e", Wasser: "#4aa3c9", Blitz: "#b59cff", Erde: "#c19a6b" };
      const uniq = (k) => [...new Set(J.map((j) => j[k]).filter(Boolean))];
      const order = ["E", "D", "C", "B", "A", "S"];
      const F = { q: "", element: "", rank: "", type: "" };
      const group = (k, label, vals) => vals.length ? `<span class="chip-label">${label}</span>` + [["", "Alle"], ...vals.map((v) => [v, v])].map(([v, l]) => `<button type="button" class="chip" data-k="${k}" data-v="${esc(v)}" aria-pressed="${v === ""}">${esc(l)}</button>`).join("") : "";
      el.innerHTML = `<div class="jutsu-tools"><input class="search" type="search" placeholder="Jutsu suchen" aria-label="Jutsu suchen">
        <div class="chips">${group("element", "Element", uniq("element"))}${group("rank", "Rang", uniq("rank").sort((a, b) => order.indexOf(a) - order.indexOf(b)))}${group("type", "Art", uniq("type"))}</div></div>
        <p class="jutsu-count"></p><div class="jutsus"></div>`;
      const draw = () => {
        const q = F.q.toLowerCase();
        const list = J.filter((j) => (!F.element || j.element === F.element) && (!F.rank || j.rank === F.rank) && (!F.type || j.type === F.type) &&
          (!q || [j.name, j.text, j.clan, j.element, j.type].join(" ").toLowerCase().includes(q)));
        el.querySelector(".jutsu-count").textContent = `${list.length} von ${J.length} Techniken`;
        el.querySelector(".jutsus").innerHTML = list.map((j) => `<article class="jutsu" style="--ec:${EC[j.element] || "#6b6253"}"><h3>${esc(j.name)}</h3>
          <div class="meta">${j.element ? `<span class="el">${esc(j.element)}</span>` : ""}${j.rank ? `<span class="rk">Rang ${esc(j.rank)}</span>` : ""}${j.type ? `<span>${esc(j.type)}</span>` : ""}${j.clan ? `<span>${esc(j.clan)}</span>` : ""}</div>
          ${j.text ? `<p>${esc(j.text)}</p>` : ""}</article>`).join("") || `<article class="jutsu"><p>Keine Technik passt zu diesen Filtern.</p></article>`;
      };
      el.querySelector(".search").addEventListener("input", (e) => { F.q = e.target.value; draw(); });
      el.querySelector(".chips").addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        F[b.dataset.k] = b.dataset.v;
        el.querySelectorAll(`.chip[data-k="${b.dataset.k}"]`).forEach((c) => c.setAttribute("aria-pressed", c === b));
        draw();
      });
      draw();
    },
    dorftest() {
      dorftest($("#dorftest-app"));
    },
    social() {
      const L = (D.socials || []).filter((x) => x.platform);
      if (!L.length) { $("#socials").innerHTML = sealed("Noch keine Kanäle eingetragen", "Hier findest du bald alle Kanäle von NK an einem Ort."); return; }
      $("#socials").innerHTML = `<div class="socials">${L.map((x) => {
        const k = SOC[x.platform.toLowerCase()] || SOC.link, live = !!x.url;
        const inner = `<span class="s-ico" style="--sc:${k.c}">${k.i}</span><span class="s-txt"><b>${esc(x.platform)}</b><small>${live ? esc(x.handle || "Jetzt folgen") : "Folgt bald"}</small>${x.text ? `<em>${esc(x.text)}</em>` : ""}</span>`;
        return live ? `<a class="social" href="${esc(x.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="social off" aria-disabled="true">${inner}</div>`;
      }).join("")}</div>`;
    },
    team() {
      $("#team").innerHTML = D.team.length ? D.team.map((g) => `<section class="team-group"><h2>${esc(g.group)}</h2><div class="members">${g.members.map((m) =>
        `<article class="member"><div class="portrait">${m.avatar ? `<img src="${esc(m.avatar)}" alt="">` : esc((m.name || "?").slice(0, 1))}</div><h3>${esc(m.name)}</h3><div class="role">${esc(m.role)}</div>${m.text ? `<p>${esc(m.text)}</p>` : ""}</article>`).join("")}</div></section>`).join("")
        : sealed("Das Team stellt sich bald vor", "Hier findest du demnächst alle, die hinter NK stehen, und wofür sie zuständig sind.");
    }
  };
  if (R[page]) R[page]();

  /* Leaks aufdecken */
  document.addEventListener("click", (e) => { const l = e.target.closest(".leak.covered"); if (l) l.classList.remove("covered"); });

  /* ---------------- Glut-Partikel im Hero ---------------- */
  function embers(c) {
    if (!c) return;
    const x = c.getContext("2d"); let w, h, P = [];
    const size = () => { w = c.width = c.offsetWidth * devicePixelRatio; h = c.height = c.offsetHeight * devicePixelRatio; };
    size(); addEventListener("resize", size);
    const spawn = (init) => ({ x: Math.random() * w, y: init ? Math.random() * h : h + 10, r: (Math.random() * 1.8 + .4) * devicePixelRatio,
      vy: (Math.random() * .5 + .2) * devicePixelRatio, vx: (Math.random() - .5) * .3, a: Math.random() * .7 + .2, t: Math.random() * 6.28 });
    for (let i = 0; i < 70; i++) P.push(spawn(true));
    (function loop() {
      x.clearRect(0, 0, w, h);
      for (const p of P) {
        p.y -= p.vy; p.t += .02; p.x += p.vx + Math.sin(p.t) * .25;
        if (p.y < -10) Object.assign(p, spawn(false));
        x.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t * 2));
        x.fillStyle = p.r > 1.6 * devicePixelRatio ? "#ffc400" : "#ff8a00";
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- Intro (einmal pro Sitzung) ---------------- */
  const intro = $(".intro");
  if (intro) {
    let seen = false; try { seen = sessionStorage.getItem("nk-intro") === "1"; } catch (e) {}
    if (seen || reduced) intro.remove();
    else {
      try { sessionStorage.setItem("nk-intro", "1"); } catch (e) {}
      const timers = [];
      const end = () => { timers.forEach(clearTimeout); intro.classList.add("done"); setTimeout(() => intro.remove(), 600); };
      intro.addEventListener("click", end);
      timers.push(setTimeout(() => intro.classList.add("ignite"), 250));
      timers.push(setTimeout(end, 1700));
    }
  }
})();

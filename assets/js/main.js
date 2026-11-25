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
    mitmachen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 7l3 3"/><path d="M4 20h16"/>',
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
    ["mitmachen.html", "Mitmachen", "mitmachen"]
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
      <button type="button" class="sound-btn" aria-pressed="false" aria-label="Ambient-Sound an/aus" title="Ambient-Sound">${icon("soundOff")}</button>
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
      <a class="brand" href="index.html"><img src="assets/img/logo-small.png" alt=""><div><b>${esc(S.name)}</b><span>${esc(S.title)}</span></div></a>
      <nav aria-label="Fußzeile">${PAGES.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</nav>
    </div>
    <p class="legal">© ${new Date().getFullYear()} ${esc(S.name)} ${esc(S.title)}. Ein Fan-Projekt, nicht offiziell verbunden mit Naruto, Masashi Kishimoto, Shueisha oder Studio Pierrot.</p>
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
    el.innerHTML = `<div class="map">${M.image ? `<img src="${esc(M.image)}" alt="Karte der Welt">` : MAP_SVG}
      ${mk.map((m, i) => `<button type="button" class="marker" data-i="${i}" aria-expanded="false" style="left:${+m.x}%;top:${+m.y}%;--mc:${esc(m.color || "#ffc400")}"><i class="dot"></i><span>${esc(m.name)}</span></button>`).join("")}</div>`;
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
      pop.innerHTML = `<h3>${esc(m.name)}</h3>${m.realm ? `<small>${esc(m.realm)}</small>` : ""}${m.text ? `<p>${esc(m.text)}</p>` : ""}${hasVillage ? `<a href="#${encodeURIComponent(m.name)}">Mehr über das Dorf</a>` : m.link ? `<a href="${esc(m.link)}">Mehr erfahren</a>` : ""}`;
      map.append(pop);
    });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------------- Steckbrief-Generator ---------------- */
  function steckbrief(el) {
    if (!el) return;
    const FIELDS = D.steckbrief || [];
    const defVillages = Object.values((D.dorftest || {}).results || {}).map((r) => r.name);
    const opts = (f) => f.options === "villages" ? (D.villages.length ? D.villages.map((v) => v.name) : defVillages)
      : f.options === "clans" ? (D.clans.length ? [...D.clans.map((c) => c.name), "Clanlos"] : null) : f.options;
    const KEY = "nk-steckbrief";
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    const input = (f) => {
      const id = `sb-${f.id}`, v = esc(saved[f.id] || ""), o = opts(f), lab = `<label for="${id}">${esc(f.label)}${f.required ? ' <span class="req">*</span>' : ""}</label>`;
      const ph = f.placeholder ? ` placeholder="${esc(f.placeholder)}"` : "";
      if (f.type === "textarea") return `<div class="field wide">${lab}<textarea id="${id}" name="${f.id}" rows="${f.rows || 3}"${ph}>${v}</textarea></div>`;
      if (f.type === "select" && o) return `<div class="field">${lab}<select id="${id}" name="${f.id}"><option value="">Bitte wählen</option>${o.map((x) => `<option${saved[f.id] === x ? " selected" : ""}>${esc(x)}</option>`).join("")}</select></div>`;
      return `<div class="field">${lab}<input id="${id}" name="${f.id}" type="${f.type === "number" ? "number" : "text"}" value="${v}"${ph}${f.required ? " required" : ""}></div>`;
    };
    el.innerHTML = `<div class="form-grid">
      <form class="scroll" id="sb-form" novalidate><div class="fields">${FIELDS.map(input).join("")}</div>
        <div class="form-actions"><button type="submit" class="btn">Steckbrief kopieren</button><button type="button" class="btn btn-ghost" id="sb-reset">Leeren</button><p class="hint" id="sb-hint" aria-live="polite">Wird automatisch auf deinem Gerät gespeichert.</p></div></form>
      <aside class="idcard" aria-label="Vorschau"><div class="idcard-head"><span>Ninja-Ausweis</span><img src="assets/img/logo-small.png" alt=""></div>
        <div class="idcard-body"><div class="photo"></div><div><h3 id="id-name">Dein Name</h3><dl id="id-dl"></dl></div></div><div class="story" id="id-story"></div></aside></div>`;
    const form = $("#sb-form", el);
    const val = () => Object.fromEntries(FIELDS.map((f) => [f.id, (form.elements[f.id]?.value || "").trim()]));
    const short = FIELDS.filter((f) => f.type !== "textarea" && f.id !== "name");
    const update = () => {
      const v = val();
      $("#id-name", el).textContent = v.name || "Dein Name";
      $("#id-dl", el).innerHTML = short.map((f) => `<dt>${esc(f.label)}</dt><dd>${esc(v[f.id] || "–")}</dd>`).join("");
      const story = FIELDS.find((f) => f.id === "geschichte");
      $("#id-story", el).textContent = story ? v[story.id] : "";
      try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
    };
    const text = () => {
      const v = val(), lines = ["**Charakter-Steckbrief**", ""];
      FIELDS.forEach((f) => { if (!v[f.id]) return; lines.push(f.type === "textarea" ? `**${f.label}:**\n${v[f.id]}\n` : `**${f.label}:** ${v[f.id]}`); });
      return lines.join("\n").trim();
    };
    form.addEventListener("input", update);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const miss = FIELDS.filter((f) => f.required && !val()[f.id]);
      const hint = $("#sb-hint", el);
      if (miss.length) { hint.textContent = `Bitte noch ausfüllen: ${miss.map((f) => f.label).join(", ")}.`; form.elements[miss[0].id].focus(); return; }
      try { await navigator.clipboard.writeText(text()); hint.textContent = "Kopiert. Jetzt einfach im Discord einfügen."; }
      catch (err) { const t = document.createElement("textarea"); t.value = text(); document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); hint.textContent = "Kopiert. Jetzt einfach im Discord einfügen."; }
    });
    $("#sb-reset", el).addEventListener("click", () => { form.reset(); form.querySelectorAll("input,textarea").forEach((x) => (x.value = "")); form.querySelectorAll("select").forEach((x) => (x.selectedIndex = 0)); update(); $("#sb-hint", el).textContent = "Formular geleert."; });
    update();
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
      el.innerHTML = `<div class="result" style="--vc:${esc(r.color)}"><div class="scroll"><p class="kicker-line">Dein Dorf ist</p><h3>${esc(r.name)}</h3><p>${esc(r.text)}</p>
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
      if (S.music) { audioEl = audioEl || Object.assign(new Audio(S.music), { loop: true, volume: .5 }); audioEl.play().catch(() => {}); return; }
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
      ctx.resume(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(.5, ctx.currentTime + 1.5);
      clearTimeout(timer); pluck();
    };
    const stop = () => {
      if (audioEl) audioEl.pause();
      if (ctx && master) { clearTimeout(timer); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6); }
    };
    btn.addEventListener("click", () => {
      running = !running; btn.setAttribute("aria-pressed", running); btn.innerHTML = icon(running ? "soundOn" : "soundOff");
      running ? start() : stop();
    });
  })();

  /* ---------------- Seiten ---------------- */
  const R = {
    home() {
      $("#hero-sub").textContent = S.slogan || "";
      $("#hero-actions").innerHTML = discordBtn() + `<a class="btn btn-ghost" href="regelwerk.html">Zum Regelwerk</a>`;
      countdownTag($("#tag-cd"));
      $("#home-news").innerHTML = D.news.length
        ? `<div class="scroll">${newsSorted().slice(0, 3).map(newsHTML).join("")}</div>`
        : sealed("Noch versiegelt", "Die ersten Ankündigungen erscheinen hier, sobald das Team sie veröffentlicht.");
      $("#home-leaks").innerHTML = D.leaks.length
        ? `<div class="leaks">${D.leaks.slice(0, 3).map(leakHTML).join("")}</div>`
        : sealed("Noch nichts geleakt", "Vor dem Release tauchen hier erste Einblicke auf. Manche öffnen sich zu einem festen Zeitpunkt von selbst.");
      $("#join-btn").innerHTML = discordBtn();
      $("#hall").innerHTML = D.hall.length
        ? `<div class="hall">${D.hall.map((h) => `<article class="hall-card"><div class="pic">${h.image ? `<img src="${esc(h.image)}" alt="">` : esc((h.name || "?").slice(0, 1))}</div><small>${esc(h.title || "")}</small><h3>${esc(h.name)}</h3>${h.text ? `<p>${esc(h.text)}</p>` : ""}</article>`).join("")}</div>`
        : sealed("Noch kein Ninja des Monats", "Hier ehren wir regelmäßig Spieler, die mit ihrem Roleplay herausgestochen sind.");
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
      const nav = $("#wiki-nav"), art = $("#wiki-article"), q = $("#wiki-search");
      if (!D.wiki.length) {
        nav.innerHTML = `<p class="none">Noch keine Artikel.</p>`;
        art.innerHTML = sealed("Das Wiki ist noch leer", "Sobald die ersten Artikel stehen, findest du sie links und kannst sie durchsuchen.");
        q.disabled = true; return;
      }
      const id = () => location.hash.slice(1) || D.wiki[0].id;
      const drawNav = (f = "") => {
        f = f.toLowerCase();
        const items = D.wiki.filter((w) => !f || (w.title + " " + w.html.replace(/<[^>]+>/g, " ")).toLowerCase().includes(f));
        const cats = [...new Set(items.map((w) => w.cat))];
        nav.innerHTML = cats.map((c) => `<h4>${esc(c)}</h4>` + items.filter((w) => w.cat === c).map((w) => `<a href="#${esc(w.id)}"${w.id === id() ? ' aria-current="true"' : ""}>${esc(w.title)}</a>`).join("")).join("") || `<p class="none">Nichts gefunden.</p>`;
      };
      const show = () => { const w = D.wiki.find((x) => x.id === id()) || D.wiki[0];
        art.innerHTML = `<h1>${esc(w.title)}</h1>${w.html}`; document.title = `${w.title} · Wiki · ${S.name}`; drawNav(q.value); };
      q.addEventListener("input", () => drawNav(q.value));
      addEventListener("hashchange", show); show();
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
    mitmachen() {
      steckbrief($("#steckbrief-app"));
      dorftest($("#dorftest-app"));
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

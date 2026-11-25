/* NK Website – Aufbau & Logik. Texte stehen in content.js */
(function () {
  "use strict";
  const D = window.NK, S = D.server;
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const discordSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.5 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z"/></svg>';

  const PAGES = [
    ["index.html", "Start", "始", "home"],
    ["news.html", "Ankündigungen", "報", "news"],
    ["leaks.html", "Leaks", "漏", "leaks"],
    ["lore.html", "Lore", "史", "lore"],
    ["wiki.html", "Wiki", "書", "wiki"],
    ["regeln.html", "Regeln & FAQ", "掟", "regeln"],
    ["team.html", "Team", "衆", "team"]
  ];
  const cur = (p) => (p === page ? ' aria-current="page"' : "");

  /* Discord-Knopf: ohne Link deaktiviert */
  const discordBtn = (cls = "btn", label = "Discord beitreten") =>
    S.discord
      ? `<a class="${cls}" href="${esc(S.discord)}" target="_blank" rel="noopener">${discordSvg}${label}</a>`
      : `<span class="${cls}" aria-disabled="true">${discordSvg}Discord-Link folgt</span>`;

  /* ---------------- Navigation ---------------- */
  const rail = document.createElement("aside");
  rail.className = "rail";
  rail.innerHTML = `
    <a class="rail-logo" href="index.html" aria-label="${esc(S.name)} Startseite"><img src="assets/img/logo-small.png" alt=""></a>
    <nav aria-label="Hauptmenü">${PAGES.map(([h, l, k, p]) => `<a href="${h}"${cur(p)}><span class="kanji" aria-hidden="true">${k}</span><small>${l}</small></a>`).join("")}</nav>
    ${S.discord ? `<a class="rail-discord" href="${esc(S.discord)}" target="_blank" rel="noopener" aria-label="Discord">${discordSvg}</a>` : `<span class="rail-discord" style="opacity:.35" title="Discord-Link folgt">${discordSvg}</span>`}`;
  const top = document.createElement("div");
  top.className = "topbar";
  top.innerHTML = `<a href="index.html" aria-label="Startseite"><img src="assets/img/logo-small.png" alt=""></a><button type="button" aria-expanded="false" aria-controls="sheet">Menü</button>`;
  const sheet = document.createElement("nav");
  sheet.className = "sheet"; sheet.id = "sheet"; sheet.setAttribute("aria-label", "Menü");
  sheet.innerHTML = `<button type="button" class="btn btn-ghost close">Schließen</button>` +
    PAGES.map(([h, l, k, p]) => `<a href="${h}"${cur(p)}><span class="kanji" aria-hidden="true">${k}</span>${l}</a>`).join("") +
    `<div style="margin-top:30px">${discordBtn()}</div>`;
  document.body.prepend(rail, top, sheet);
  const toggle = (open) => { sheet.classList.toggle("open", open); top.querySelector("button").setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : ""; };
  top.querySelector("button").addEventListener("click", () => toggle(true));
  sheet.querySelector(".close").addEventListener("click", () => toggle(false));

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
  const sealed = (title, text, k = "封") => `<div class="scroll sealed"><div class="hanko" aria-hidden="true">${k}</div><div><h3>${title}</h3><p>${text}</p></div></div>`;

  /* ---------------- Countdown-Zettel ---------------- */
  function countdownTag(el) {
    const t = new Date(S.release).getTime();
    const head = `<div class="bomb" aria-hidden="true">爆</div>`;
    if (!S.release || isNaN(t)) { el.innerHTML = `<div class="tag-paper">${head}<p class="label">Release</p><div class="soon">Datum folgt</div></div>`; return; }
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
    const img = l.image ? `<img src="${esc(l.image)}" alt="">` : `<div class="ph" aria-hidden="true">漏</div>`;
    const tag = locked
      ? `<div class="tag-paper"><div class="bomb">封</div><p class="label" style="margin:0">Frei ab ${new Date(l.unlock).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}</p></div>`
      : `<div class="tag-paper"><div class="bomb">爆</div><p class="label" style="margin:0">Aufdecken</p></div>`;
    return `<button type="button" class="leak ${locked ? "locked" : "covered"}" ${locked ? "disabled" : ""}>
      <div class="leak-img">${img}<div class="leak-wrap">${tag}</div></div>
      <div class="leak-body"><h3>${locked ? "Versiegelt" : esc(l.title)}</h3><p>${locked ? "Dieser Leak öffnet sich von selbst." : esc(l.text)}</p></div></button>`;
  };
  const villageHTML = (v) => `<article class="village" id="${esc(v.name)}"><div class="kanji" aria-hidden="true">${esc(v.kanji || "")}</div>
    <div><h3>${esc(v.name)}</h3>${v.alias ? `<p class="alias">${esc(v.alias)}</p>` : ""}
    <dl>${v.land ? `<div><dt>Reich</dt><dd>${esc(v.land)}</dd></div>` : ""}${v.kage ? `<div><dt>Oberhaupt</dt><dd>${esc(v.kage)}</dd></div>` : ""}</dl>
    <p style="color:var(--ash)">${esc(v.text)}</p></div></article>`;

  /* ---------------- Seiten ---------------- */
  const R = {
    home() {
      $("#hero-sub").textContent = S.slogan || "";
      $("#hero-actions").innerHTML = discordBtn() + `<a class="btn btn-ghost" href="regeln.html">Regeln lesen</a>`;
      countdownTag($("#tag-cd"));
      $("#home-news").innerHTML = D.news.length
        ? `<div class="scroll">${newsSorted().slice(0, 3).map(newsHTML).join("")}</div>`
        : sealed("Noch versiegelt", "Die ersten Ankündigungen erscheinen hier, sobald das Team sie veröffentlicht.");
      $("#home-leaks").innerHTML = D.leaks.length
        ? `<div class="leaks">${D.leaks.slice(0, 3).map(leakHTML).join("")}</div>`
        : sealed("Noch nichts geleakt", "Vor dem Release tauchen hier erste Einblicke auf. Manche öffnen sich zu einem festen Zeitpunkt von selbst.", "漏");
      $("#join-btn").innerHTML = discordBtn();
      if (!reduced) embers($(".hero canvas"));
    },
    news() {
      $("#list").innerHTML = D.news.length ? `<div class="scroll">${newsSorted().map(newsHTML).join("")}</div>`
        : sealed("Noch versiegelt", "Hier erscheinen alle Ankündigungen und Updates, das Neueste immer oben. Bis dahin gibt es alles im Discord.");
    },
    leaks() {
      $("#list").innerHTML = D.leaks.length ? `<div class="leaks">${D.leaks.map(leakHTML).join("")}</div>`
        : sealed("Noch nichts geleakt", "Sobald es erste Einblicke gibt, liegen sie hier verdeckt. Ein Klick deckt sie auf, gesperrte öffnen sich zum angegebenen Zeitpunkt.", "漏");
    },
    lore() {
      $("#villages").innerHTML = D.villages.length ? D.villages.map(villageHTML).join("")
        : sealed("Die Dörfer werden noch geschrieben", "Hier stellen sich bald die Dörfer vor, aus denen eure Charaktere stammen können.", "里");
      if (!D.clans.length) { $("#clans").innerHTML = sealed("Clans folgen", "Jeder Clan bekommt hier seine Fähigkeiten, seine Geschichte und den Hinweis, ob er frei spielbar ist.", "血"); return; }
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
        art.innerHTML = sealed("Das Wiki ist noch leer", "Sobald die ersten Artikel stehen, findest du sie links und kannst sie durchsuchen.", "書");
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
    regeln() {
      $("#rules").innerHTML = D.rules.length
        ? `<div class="chips">${D.rules.map((s, i) => `<a class="chip" href="#r${i + 1}">§${i + 1} ${esc(s.title)}</a>`).join("")}</div><div class="scroll">${D.rules.map((s, i) =>
          `<section class="rules-sec" id="r${i + 1}"><h2><span class="para">§${i + 1}</span>${esc(s.title)}</h2>${s.items.map(([t, d], j) => `<div class="rule"><div class="n">${i + 1}.${j + 1}</div><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join("")}</section>`).join("")}</div>`
        : sealed("Die Regeln werden gerade verfasst", "Hier steht bald alles, was auf dem Server gilt, sortiert nach Paragraphen.", "掟");
      $("#faq-list").innerHTML = D.faq.length ? D.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="a">${esc(a)}</div></details>`).join("")
        : sealed("Noch keine Fragen beantwortet", "Häufige Fragen sammeln wir hier, sobald sie im Discord auftauchen.", "問");
    },
    team() {
      $("#team").innerHTML = D.team.length ? D.team.map((g) => `<section class="team-group"><h2>${esc(g.group)}</h2><div class="members">${g.members.map((m) =>
        `<article class="member"><div class="portrait">${m.avatar ? `<img src="${esc(m.avatar)}" alt="">` : esc((m.name || "?").slice(0, 1))}</div><h3>${esc(m.name)}</h3><div class="role">${esc(m.role)}</div>${m.text ? `<p>${esc(m.text)}</p>` : ""}</article>`).join("")}</div></section>`).join("")
        : sealed("Das Team stellt sich bald vor", "Hier findest du demnächst alle, die hinter NK stehen, und wofür sie zuständig sind.", "衆");
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
      const seals = intro.querySelectorAll(".seal"); let i = 0, timers = [];
      const end = () => { timers.forEach(clearTimeout); intro.classList.add("done"); setTimeout(() => intro.remove(), 600); };
      intro.addEventListener("click", end);
      seals.forEach((s, k) => timers.push(setTimeout(() => s.classList.add("on"), 150 + k * 380)));
      timers.push(setTimeout(() => intro.classList.add("ignite"), 150 + seals.length * 380));
      timers.push(setTimeout(end, 150 + seals.length * 380 + 1300));
    }
  }
})();

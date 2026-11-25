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
    lock: '<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
  const PAGES = [
    ["index.html", "Start", "home"],
    ["news.html", "News", "news"],
    ["welt.html", "Welt", "welt"],
    ["wiki.html", "Wiki", "wiki"],
    ["regelwerk.html", "Regelwerk", "regelwerk"],
    ["team.html", "Team", "team"],
    ["galerie.html", "Galerie", "galerie"],
    ["quiz.html", "Quiz", "quiz"],
    ["faq.html", "FAQ", "faq"]
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
    ${S.discord ? `<a class="nav-discord" href="${esc(S.discord)}" target="_blank" rel="noopener">${discordSvg}Discord</a>` : `<span class="nav-discord" aria-disabled="true">${discordSvg}Discord</span>`}
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
  const villageHTML = (v) => `<article class="village" id="${esc(v.name)}"><div class="emblem" aria-hidden="true">${v.emblem ? `<img src="${esc(v.emblem)}" alt="">` : esc((v.name || "?").slice(0, 1))}</div>
    <div><h3>${esc(v.name)}</h3>${v.alias ? `<p class="alias">${esc(v.alias)}</p>` : ""}
    <dl>${v.land ? `<div><dt>Reich</dt><dd>${esc(v.land)}</dd></div>` : ""}${v.kage ? `<div><dt>Oberhaupt</dt><dd>${esc(v.kage)}</dd></div>` : ""}</dl>
    <p style="color:var(--ash)">${esc(v.text)}</p></div></article>`;

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

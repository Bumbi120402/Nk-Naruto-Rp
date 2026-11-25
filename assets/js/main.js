/* NK Website – Logik. Inhalte stehen in content.js */
(function () {
  const D = window.NK;
  const S = D.server;
  const page = document.body.dataset.page;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (n) => n.replace(/[^\p{L}\p{N} ]/gu, "").split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  const discordIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.5 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z"/></svg>';
  const fmtDate = (iso) => new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

  /* ---------------- Navigation & Footer ---------------- */
  const links = [
    ["index.html", "Start", "home"], ["news.html", "Ankündigungen", "news"], ["leaks.html", "Leaks", "leaks"],
    ["lore.html", "Lore", "lore"], ["wiki.html", "Wiki", "wiki"], ["regeln.html", "Regeln & FAQ", "regeln"], ["team.html", "Team", "team"]
  ];
  const header = document.createElement("header");
  header.className = "nav";
  header.innerHTML = `<div class="container">
      <a class="brand" href="index.html"><img src="assets/img/logo-small.png" alt="NK Logo"><div><span>${esc(S.name)}</span><small>${esc(S.title.toUpperCase())}</small></div></a>
      <button class="burger" aria-label="Menü"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h16M3 11h16M3 16h16"/></svg></button>
      <ul class="nav-links">${links.map(([h, l, p]) => `<li><a href="${h}" class="${p === page ? "active" : ""}">${l}</a></li>`).join("")}</ul>
      <a class="btn btn-y btn-sm" href="${esc(S.discord)}" target="_blank" rel="noopener">${discordIcon}Discord</a>
    </div>`;
  document.body.prepend(header);
  $(".burger").addEventListener("click", () => $(".nav-links").classList.toggle("open"));

  const footer = document.createElement("footer");
  footer.innerHTML = `<div class="container">
      <div class="cols">
        <div><a class="brand" href="index.html"><img src="assets/img/logo-small.png" alt=""><div><span>${esc(S.name)}</span><small>${esc(S.title.toUpperCase())}</small></div></a>
          <p style="margin-top:14px;max-width:360px">${esc(S.slogan)}</p></div>
        <div><h4>Seiten</h4><ul>${links.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul></div>
        <div><h4>Community</h4><ul><li><a href="${esc(S.discord)}" target="_blank" rel="noopener">Discord</a></li><li><a href="regeln.html#faq">FAQ</a></li><li><a href="wiki.html#start">Start-Guide</a></li></ul></div>
      </div>
      <div class="legal"><span>© ${new Date().getFullYear()} ${esc(S.name)} ${esc(S.title)}. Fan-Projekt – nicht offiziell mit Naruto, Masashi Kishimoto, Shueisha oder Studio Pierrot verbunden.</span><span>Made with 🍃 &amp; Chakra</span></div>
    </div>`;
  document.body.append(footer);

  /* ---------------- Countdown ---------------- */
  function countdown(el) {
    const target = new Date(S.release).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (isNaN(target)) { el.innerHTML = ""; return; }
      if (diff <= 0) { el.innerHTML = `<div class="cd-live">🔥 WIR SIND LIVE 🔥</div>`; return; }
      const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
      el.innerHTML = [[d, "Tage"], [h, "Std"], [m, "Min"], [s, "Sek"]]
        .map(([v, l]) => `<div class="cd-box"><div class="cd-num">${String(v).padStart(2, "0")}</div><div class="cd-lbl">${l}</div></div>`).join("");
      setTimeout(tick, 1000);
    };
    tick();
  }

  /* ---------------- Bausteine ---------------- */
  const newsBody = (t) => {
    const lines = esc(t).split("\n");
    let html = "", list = [];
    const flush = () => { if (list.length) { html += `<ul>${list.map((l) => `<li>${l}</li>`).join("")}</ul>`; list = []; } };
    lines.forEach((l) => { if (l.startsWith("- ")) list.push(l.slice(2)); else { flush(); if (l.trim()) html += `<p>${l}</p>`; } });
    flush();
    return html;
  };
  const newsItem = (n) => `<article class="news-item reveal">
      <div class="news-date">${new Date(n.date).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}<small>${new Date(n.date).getFullYear()}</small></div>
      <div class="news-body"><span class="tag ${/wichtig/i.test(n.tag) ? "red" : ""}">${esc(n.tag)}</span><h3>${esc(n.title)}</h3>${newsBody(n.text)}</div>
    </article>`;
  const sortedNews = () => [...D.news].sort((a, b) => new Date(b.date) - new Date(a.date));

  function leakCard(l, i) {
    const unlockAt = l.unlock ? new Date(l.unlock).getTime() : 0;
    const locked = unlockAt > Date.now();
    const media = l.image ? `<img class="art" src="${esc(l.image)}" alt="">` : `<div class="art">${esc(l.icon || "❓")}</div>`;
    const overlay = locked
      ? `<span class="lock">🔒</span><b>Gesperrt</b><small>Freischaltung: ${fmtDate(l.unlock)}</small><small class="leak-cd" data-t="${unlockAt}"></small>`
      : `<span class="lock">👁️</span><b>Klick zum Aufdecken</b>`;
    return `<article class="card leak reveal ${locked ? "locked" : "hidden"}" data-i="${i}">
        <div class="leak-media">${media}<div class="leak-overlay">${overlay}</div></div>
        <div class="leak-body"><span class="tag ${locked ? "grey" : ""}">Leak #${String(i + 1).padStart(2, "0")}</span>
          <h3 style="margin-top:10px">${locked ? "█████ ███" : esc(l.title)}</h3>
          <p class="muted">${locked ? '<span class="redact">Diese Info ist noch geheim</span>' : esc(l.text)}</p></div>
      </article>`;
  }

  /* ---------------- Seiten ---------------- */
  const R = {
    home() {
      $("#hero-slogan").textContent = S.slogan;
      $("#hero-discord").href = S.discord;
      countdown($("#countdown"));
      $("#stats").innerHTML = S.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("");
      $("#features").innerHTML = D.features.map((f) => `<div class="card reveal"><div class="ico">${esc(f.icon)}</div><h3>${esc(f.title)}</h3><p class="muted">${esc(f.text)}</p></div>`).join("");
      $("#home-news").innerHTML = sortedNews().slice(0, 3).map(newsItem).join("");
      $("#home-leaks").innerHTML = D.leaks.slice(0, 3).map(leakCard).join("");
      $("#home-villages").innerHTML = D.villages.map((v) => `<a class="card reveal" href="lore.html#${encodeURIComponent(v.name)}" style="text-align:center;color:inherit"><div class="village"><div class="emb" style="margin:0 auto 12px;width:80px;height:80px;font-size:2.2rem">${esc(v.short)}</div></div><h3 style="font-size:1.4rem">${esc(v.name)}</h3><span class="muted" style="font-size:.85rem">${esc(v.kage)}</span></a>`).join("");
      $("#cta-discord").href = S.discord;
    },
    news() {
      const all = sortedNews();
      const pin = all.find((n) => n.pinned);
      $("#pinned").innerHTML = pin ? `<div class="pinned reveal"><span class="kicker">📌 Angepinnt</span>${newsItem(pin).replace('class="news-item reveal"', 'class="news-item" style="border:0;padding:0"')}</div>` : "";
      $("#news-list").innerHTML = all.filter((n) => n !== pin).map(newsItem).join("");
    },
    leaks() {
      $("#leaks").innerHTML = D.leaks.map(leakCard).join("");
    },
    lore() {
      $("#villages").innerHTML = D.villages.map((v) => `<article class="card village reveal" id="${esc(v.name)}" style="scroll-margin-top:100px">
          <div class="emb">${esc(v.short)}</div>
          <div><h3 style="font-size:2.2rem;margin:0">${esc(v.name)}</h3><div class="muted" style="font-style:italic">${esc(v.alias)}</div>
          <div class="meta"><span class="tag">${esc(v.land)}</span><span class="tag">${esc(v.kage)}</span><span class="tag grey">Element: ${esc(v.element)}</span></div>
          <p class="muted">${esc(v.text)}</p></div></article>`).join("");
      const vs = ["Alle", ...new Set(D.clans.map((c) => c.village))];
      const draw = (f) => {
        $("#clans").innerHTML = D.clans.filter((c) => f === "Alle" || c.village === f).map((c) => {
          const cls = /offen/i.test(c.status) ? "" : /gesperrt/i.test(c.status) ? "red" : "grey";
          return `<article class="card clan reveal in"><div class="clan-top"><h3>${esc(c.name)}</h3><span class="tag ${cls}">${esc(c.status)}</span></div>
            <div class="ability">${esc(c.ability)}</div><p class="muted">${esc(c.text)}</p><small class="muted" style="margin-top:auto">🏯 ${esc(c.village)}</small></article>`;
        }).join("");
      };
      $("#clan-filter").innerHTML = vs.map((v, i) => `<button class="chip ${i ? "" : "on"}" data-v="${esc(v)}">${esc(v)}</button>`).join("");
      $("#clan-filter").addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        document.querySelectorAll("#clan-filter .chip").forEach((c) => c.classList.toggle("on", c === b));
        draw(b.dataset.v);
      });
      draw("Alle");
    },
    wiki() {
      const side = $("#wiki-nav"), art = $("#wiki-article"), q = $("#wiki-search");
      const drawNav = (filter = "") => {
        const f = filter.toLowerCase();
        const items = D.wiki.filter((w) => !f || (w.title + " " + w.html.replace(/<[^>]+>/g, " ")).toLowerCase().includes(f));
        const cats = [...new Set(items.map((w) => w.cat))];
        side.innerHTML = cats.map((c) => `<div class="wiki-cat">${esc(c)}</div>` + items.filter((w) => w.cat === c).map((w) => `<a href="#${w.id}" data-id="${w.id}">${esc(w.title)}</a>`).join("")).join("") || '<p class="muted">Nichts gefunden.</p>';
        mark();
      };
      const mark = () => { const id = location.hash.slice(1) || D.wiki[0].id; side.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.dataset.id === id)); };
      const show = () => {
        const id = location.hash.slice(1) || D.wiki[0].id;
        const w = D.wiki.find((x) => x.id === id) || D.wiki[0];
        art.innerHTML = `<div class="crumbs">Wiki / ${esc(w.cat)}</div><h1>${esc(w.title)}</h1>${w.html}`;
        document.title = `${w.title} · Wiki · ${S.name}`;
        mark();
        if (location.hash) window.scrollTo({ top: 0, behavior: "smooth" });
      };
      q.addEventListener("input", () => drawNav(q.value));
      window.addEventListener("hashchange", show);
      drawNav(); show();
    },
    regeln() {
      $("#rules-nav").innerHTML = D.rules.map((s, i) => `<a class="chip" href="#r${i + 1}">§${i + 1} ${esc(s.title)}</a>`).join("") + `<a class="chip" href="#faq">FAQ</a>`;
      $("#rules").innerHTML = D.rules.map((s, i) => `<div class="rule-sec reveal" id="r${i + 1}"><h2><span class="n">§${i + 1}</span>${esc(s.title)}</h2>
          ${s.items.map(([t, d], j) => `<div class="rule"><div class="id">${i + 1}.${j + 1}</div><div><b>${esc(t)}</b><p>${esc(d)}</p></div></div>`).join("")}</div>`).join("");
      $("#faq-list").innerHTML = D.faq.map(([q, a]) => `<details class="reveal"><summary>${esc(q)}</summary><div class="a">${esc(a)}</div></details>`).join("");
    },
    team() {
      $("#team").innerHTML = D.team.map((g) => `<div class="team-group"><h2>${esc(g.group)}</h2><div class="grid g3">
          ${g.members.map((m) => `<div class="card member reveal"><div class="avatar">${m.avatar ? `<img src="${esc(m.avatar)}" alt="">` : esc(initials(m.name))}</div>
            <h3>${esc(m.name)}</h3><div class="role">${esc(m.role)}</div><p>${esc(m.text)}</p></div>`).join("")}</div></div>`).join("");
    }
  };
  if (R[page]) R[page]();

  /* Leaks: aufdecken per Klick + Live-Countdown bis zur Freischaltung */
  document.addEventListener("click", (e) => {
    const c = e.target.closest(".leak.hidden"); if (c) c.classList.remove("hidden");
  });
  const leakTimers = () => {
    document.querySelectorAll(".leak-cd").forEach((el) => {
      const diff = +el.dataset.t - Date.now();
      if (diff <= 0) { location.reload(); return; }
      const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
      el.textContent = `noch ${d}T ${h}h ${m}m ${s}s`;
    });
  };
  if (document.querySelector(".leak-cd")) { leakTimers(); setInterval(leakTimers, 1000); }

  /* Einblende-Animation beim Scrollen */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.08 }) : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
})();

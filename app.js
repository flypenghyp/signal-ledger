/* Signal Ledger — interactions (no dependencies) */
(() => {
  "use strict";

  const DATA = window.LEDGER;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (v) => String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const nf = new Intl.NumberFormat("en-US");
  const fmtStars = (n) => {
    if (n == null) return "—";
    if (n >= 1000000) return (n / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (n >= 1000) return Math.round(n / 1000) + "k";
    return String(n);
  };
  const fmtDelta = (n) => (n == null ? "—" : "+" + nf.format(n));
  const levelClass = { "高": "lv-5", "中高": "lv-4", "中": "lv-3", "中低": "lv-2", "低": "lv-1" };
  const levelNote = {
    "高": "6–12 个月可跑通付费闭环",
    "中高": "需本地伙伴但路径清晰",
    "中": "可行但需重投入或长周期",
    "中低": "仅特定场景 / 客户可行",
    "低": "不建议作为独立入口"
  };
  const stageText = { "Seed": "种子", "Series A": "A 轮", "Pre-seed": "Pre-seed", "Undisclosed": "未披露" };

  const state = {
    stage: "all",
    region: "all",
    q: "",
    dealSort: { key: "amount", dir: "desc" },
    dealOpen: null,
    quality: "all",
    dir: "all",
    repoSort: "d30",
    repoOpen: null,
    asiaIndex: 0,
    trendIndex: 0
  };

  /* ------------------------------------------------------------ hero */
  function renderTape() {
    const list = $("#heroTape");
    if (!list) return;
    const top = [...DATA.deals].sort((a, b) => b.amount - a.amount).slice(0, 6);
    list.innerHTML = top.map((d, i) => `
      <li class="tape__item" style="transition-delay:${i * 55}ms">
        <span class="tape__rank">${String(i + 1).padStart(2, "0")}</span>
        <span class="tape__name">${esc(d.name)}
          <span class="tape__what">${esc(d.oneLiner)}</span>
        </span>
        <span class="tape__amt">${esc(d.amountLabel)}</span>
      </li>`).join("");
  }

  /* ------------------------------------------------------------ deals */
  function dealMatches(d) {
    if (state.stage !== "all" && d.stage !== state.stage) return false;
    if (state.region !== "all" && d.region !== state.region) return false;
    if (state.q) {
      const q = state.q.toLowerCase();
      if (!(d.name + " " + d.sectorLabel + " " + d.oneLiner + " " + d.hq).toLowerCase().includes(q)) return false;
    }
    return true;
  }

  function filteredDeals() {
    const out = DATA.deals.filter(dealMatches);
    const { key, dir } = state.dealSort;
    out.sort((a, b) => {
      let av, bv;
      if (key === "amount") { av = a.amount; bv = b.amount; }
      else if (key === "date") { av = a.date; bv = b.date; }
      else { av = a.name; bv = b.name; }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return out;
  }

  function confidenceLabel(c) {
    return c === "A" ? "A · 官方 + 权威媒体" : c === "B" ? "B · 单一权威媒体" : "B/C · 聚合/二手";
  }

  function renderDeals() {
    const body = $("#dealBody");
    if (!body) return;
    const rows = filteredDeals();
    const count = $("#dealCount");
    if (count) count.textContent = `${rows.length} 笔 / ${DATA.deals.length}`;

    if (!rows.length) {
      body.innerHTML = `<tr class="empty-row"><td colspan="6">没有符合条件的交易。试试清空筛选。</td></tr>`;
      renderDealChart(rows);
      return;
    }

    body.innerHTML = rows.map((d) => {
      const open = state.dealOpen === d.id;
      const row = `
        <tr class="row ${open ? "is-open" : ""}" data-id="${esc(d.id)}" tabindex="0"
            role="button" aria-expanded="${open}" aria-label="展开 ${esc(d.name)} 详情">
          <td class="name" data-label="公司">${esc(d.name)}<small>${esc(d.sectorLabel)}</small></td>
          <td data-label="总部"><span class="cell-val"><span class="region-mark ${d.region === "EU" ? "eu" : ""}"></span>${esc(d.hq)}</span></td>
          <td data-label="方向"><span class="cell-val">${esc(d.oneLiner)}</span></td>
          <td data-label="轮次"><span class="cell-val">${esc(stageText[d.stage] || d.stage)}</span></td>
          <td class="num amount" data-label="金额"><span class="cell-val">${esc(d.amountLabel)}</span></td>
          <td class="num num-mono" data-label="公布"><span class="cell-val">${esc(d.date.slice(5))}</span></td>
        </tr>`;
      const detail = open ? `
        <tr class="detail">
          <td colspan="6">
            <div class="deal-detail">
              <div>
                <h4>WHY IT MATTERS</h4>
                <p>${esc(d.notable)}</p>
              </div>
              <div>
                <h4>ASIA MIGRATION</h4>
                <p>${esc(d.asia)}</p>
              </div>
              <div>
                <h4>DEAL NOTES</h4>
                <p>${esc(d.lead)}</p>
                <p class="meta-line">${esc(stageText[d.stage] || d.stage)} · ${esc(d.date)} · 原币 ${esc(d.amountLabel)} · 可信度 ${esc(confidenceLabel(d.confidence))}</p>
              </div>
            </div>
          </td>
        </tr>` : "";
      return row + detail;
    }).join("");

    renderDealChart(rows);
    syncDealSortMarks();
  }

  function syncDealSortMarks() {
    $$("[data-sort-deal]").forEach((th) => {
      const mark = $(".sort-mark", th);
      if (!mark) return;
      if (th.dataset.sortDeal === state.dealSort.key) {
        mark.textContent = state.dealSort.dir === "asc" ? "↑" : "↓";
        mark.style.color = "var(--accent)";
      } else {
        mark.textContent = "↕";
        mark.style.color = "";
      }
    });
  }

  function toggleDeal(id) {
    state.dealOpen = state.dealOpen === id ? null : id;
    renderDeals();
    if (state.dealOpen) {
      const row = $(`#dealBody tr.row[data-id="${id}"]`);
      if (row) row.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  function openDealFromChart(id) {
    state.dealOpen = id;
    const row = $(`#dealBody tr.row[data-id="${id}"]`);
    if (row) {
      renderDeals();
      const fresh = $(`#dealBody tr.row[data-id="${id}"]`);
      fresh.scrollIntoView({ block: "center", behavior: "smooth" });
      fresh.classList.add("is-flash");
      setTimeout(() => fresh.classList.remove("is-flash"), 1400);
    }
  }

  function bindDeals() {
    const body = $("#dealBody");
    body.addEventListener("click", (e) => {
      const row = e.target.closest("tr.row");
      if (!row) return;
      toggleDeal(row.dataset.id);
    });
    body.addEventListener("keydown", (e) => {
      const row = e.target.closest("tr.row");
      if (!row) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDeal(row.dataset.id);
      }
    });

    $$("[data-stage]").forEach((btn) => btn.addEventListener("click", () => {
      state.stage = btn.dataset.stage;
      state.dealOpen = null;
      $$("[data-stage]").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      renderDeals();
    }));

    $$("[data-region]").forEach((btn) => btn.addEventListener("click", () => {
      state.region = btn.dataset.region;
      state.dealOpen = null;
      $$("[data-region]").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      renderDeals();
    }));

    const search = $("#dealSearch");
    if (search) search.addEventListener("input", () => {
      state.q = search.value.trim();
      state.dealOpen = null;
      renderDeals();
    });

    $$("[data-sort-deal]").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.sortDeal;
        if (state.dealSort.key === key) {
          state.dealSort.dir = state.dealSort.dir === "asc" ? "desc" : "asc";
        } else {
          state.dealSort = { key, dir: key === "name" ? "asc" : "desc" };
        }
        renderDeals();
      });
      th.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); th.click(); }
      });
      if (!th.hasAttribute("tabindex")) th.setAttribute("tabindex", "0");
    });
  }

  /* ------------------------------------------------------------ deal chart */
  const chart = {
    svg: null, w: 1000, h: 360,
    margin: { top: 22, right: 22, bottom: 42, left: 58 }
  };

  function dateValue(iso) {
    const t = Date.parse(iso + "T00:00:00Z");
    return t / 86400000;
  }

  function renderDealChart(rows) {
    const svg = $("#dealChart");
    if (!svg) return;
    const deals = rows || filteredDeals();
    const vw = window.innerWidth;
    const small = vw < 620;
    const w = small ? 520 : vw < 980 ? 760 : 1000;
    const h = small ? 330 : 360;
    const margin = small
      ? { top: 20, right: 12, bottom: 36, left: 42 }
      : { top: 22, right: 22, bottom: 42, left: 58 };
    svg.classList.toggle("is-small", small);
    const x0 = dateValue("2026-09-24"), x1 = dateValue("2026-10-24");
    const yMin = 3, yMax = 100;
    const plotW = w - margin.left - margin.right;
    const plotH = h - margin.top - margin.bottom;
    const x = (iso) => margin.left + ((dateValue(iso) - x0) / (x1 - x0)) * plotW;
    const y = (v) => margin.top + plotH - (Math.log10(v) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin)) * plotH;

    let out = `<g aria-hidden="true">`;
    [3, 10, 30, 100].forEach((v) => {
      const yy = y(v);
      out += `<line class="grid-line" x1="${margin.left}" x2="${w - margin.right}" y1="${yy}" y2="${yy}"></line>`;
      out += `<text class="axis-text" x="${margin.left - 10}" y="${yy + 3}" text-anchor="end">$${v}M</text>`;
    });
    const ticks = ["2026-09-24", "2026-10-01", "2026-10-08", "2026-10-15", "2026-10-22"];
    ticks.forEach((iso) => {
      const xx = x(iso);
      out += `<line class="grid-line" x1="${xx}" x2="${xx}" y1="${margin.top}" y2="${margin.top + plotH}"></line>`;
      out += `<text class="axis-text" x="${xx}" y="${h - 16}" text-anchor="middle">${iso.slice(5).replace("-", "/")}</text>`;
    });
    out += `<line class="axis" x1="${margin.left}" x2="${w - margin.right}" y1="${margin.top + plotH}" y2="${margin.top + plotH}"></line>`;
    out += `<text class="axis-text" x="${margin.left}" y="${margin.top - 8}">AMOUNT · 已披露口径 · log scale</text>`;
    out += `</g>`;

    const rFor = (stage) => stage === "Series A" ? 9 : stage === "Seed" ? 7 : stage === "Pre-seed" ? 5.5 : 6.5;
    const color = (region) => region === "US" ? "var(--accent)" : "var(--petrol-2)";

    const labelPos = [];
    const placed = [];
    deals.forEach((d) => {
      if (d.amount < 10) return;
      const cx = x(d.date), cy = y(d.amount), r = rFor(d.stage);
      const side = cx > w * 0.64 ? "left" : "right";
      const lx = side === "left" ? cx - r - 6 : cx + r + 6;
      let ly = cy + 3;
      let guard = 0;
      while (placed.some((p) => p.side === side && Math.abs(p.y - ly) < 11 && Math.abs(p.x - lx) < 170) && guard < 8) {
        ly += 12; guard++;
      }
      ly = Math.min(ly, margin.top + plotH - 4);
      placed.push({ side, x: lx, y: ly });
      labelPos.push({ id: d.id, lx, ly, anchor: side === "left" ? "end" : "start" });
    });

    deals.forEach((d) => {
      const cx = x(d.date), cy = y(d.amount), r = rFor(d.stage);
      const lp = labelPos.find((l) => l.id === d.id);
      const label = lp
        ? `<text class="deal-label" x="${lp.lx}" y="${lp.ly}" text-anchor="${lp.anchor}">${esc(d.name)}</text>`
        : "";
      out += `<g class="deal-dot" data-deal="${esc(d.id)}" tabindex="0" role="button"
        aria-label="${esc(d.name)}，${esc(d.amountLabel)}，${esc(stageText[d.stage] || d.stage)}，${esc(d.date)}">
        <circle cx="${cx}" cy="${cy}" r="0" fill="${color(d.region)}"></circle>
        <circle cx="${cx}" cy="${cy}" r="${r + 9}" fill="transparent" stroke="none"></circle>
        ${label}
      </g>`;
    });
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.innerHTML = out;

    requestAnimationFrame(() => {
      $$("#dealChart .deal-dot").forEach((g, i) => {
        const c = $("circle", g);
        const d = deals[i];
        const r = rFor(d.stage);
        setTimeout(() => c.setAttribute("r", r), 40 + i * 22);
      });
    });

    $$("#dealChart .deal-dot").forEach((g) => {
      const id = g.dataset.deal;
      const d = deals.find((x) => x.id === id);
      const show = (ev) => {
        const tip = $("#dealTip");
        const wrap = $("#dealChartWrap");
        if (!tip || !wrap) return;
        tip.innerHTML = `<b>${esc(d.name)}</b>${esc(d.amountLabel)} · ${esc(stageText[d.stage] || d.stage)}<span>${esc(d.date)} · ${esc(d.sectorLabel)}</span>`;
        const rect = wrap.getBoundingClientRect();
        tip.style.left = (ev.clientX - rect.left) + "px";
        tip.style.top = (ev.clientY - rect.top) + "px";
        tip.hidden = false;
      };
      const hide = () => { const tip = $("#dealTip"); if (tip) tip.hidden = true; };
      g.addEventListener("mouseenter", show);
      g.addEventListener("mousemove", show);
      g.addEventListener("mouseleave", hide);
      g.addEventListener("focus", (ev) => {
        const b = g.getBoundingClientRect();
        show({ clientX: b.left + b.width / 2, clientY: b.top });
      });
      g.addEventListener("blur", hide);
      const activate = () => openDealFromChart(id);
      g.addEventListener("click", activate);
      g.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); activate(); }
      });
    });
  }

  /* ------------------------------------------------------------ repos */
  function dirCounts() {
    const map = new Map();
    DATA.repos.forEach((r) => map.set(r.dir, (map.get(r.dir) || 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh"));
  }

  function renderDirChart() {
    const wrap = $("#dirChart");
    if (!wrap) return;
    const counts = dirCounts();
    const max = Math.max(...counts.map(([, n]) => n));
    wrap.innerHTML = counts.map(([dir, n]) => `
      <button class="dir-row ${state.dir === dir ? "is-on" : ""}" data-dir="${esc(dir)}"
              aria-pressed="${state.dir === dir}">
        <span class="dir-label">${esc(dir)}</span>
        <span class="dir-bar"><span style="width:${(n / max) * 100}%"></span></span>
        <span class="dir-count">${n}</span>
      </button>`).join("");
    $$(".dir-row", wrap).forEach((btn) => btn.addEventListener("click", () => {
      state.dir = state.dir === btn.dataset.dir ? "all" : btn.dataset.dir;
      state.repoOpen = null;
      renderDirChart();
      renderRepos();
    }));
  }

  function repoMatches(r) {
    if (state.quality !== "all" && r.quality !== state.quality) return false;
    if (state.dir !== "all" && r.dir !== state.dir) return false;
    return true;
  }

  function renderRepos() {
    const body = $("#repoBody");
    if (!body) return;
    const rows = DATA.repos.filter(repoMatches).sort((a, b) => {
      if (state.repoSort === "stars") return b.stars - a.stars;
      return (b.d30 || b.d7 * 4 || -1) - (a.d30 || a.d7 * 4 || -1);
    });
    const count = $("#repoCount");
    if (count) count.textContent = `${rows.length} 个仓库${state.dir !== "all" ? " · " + state.dir : ""}`;

    if (!rows.length) {
      body.innerHTML = `<tr class="empty-row"><td colspan="5">没有符合条件的仓库。</td></tr>`;
      return;
    }
    const maxDelta = Math.max(...rows.map((r) => r.d30 || r.d7 || 0), 1);
    const qualityText = { strong: "真需求", mixed: "混合信号", hype: "存疑 / 营销" };

    body.innerHTML = rows.map((r) => {
      const open = state.repoOpen === r.repo;
      const delta = r.d30 != null ? r.d30 : r.d7;
      const width = Math.max(3, Math.sqrt(delta / maxDelta) * 100);
      const row = `
        <tr class="row ${open ? "is-open" : ""}" data-repo="${esc(r.repo)}" tabindex="0"
            role="button" aria-expanded="${open}" aria-label="展开 ${esc(r.repo)} 详情">
          <td class="name" data-label="仓库"><a class="repo-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.repo)}</a>
            <small>${esc(r.lang)}</small></td>
          <td data-label="方向"><span class="cell-val">${esc(r.dir)}</span></td>
          <td class="num num-mono" data-label="总 star"><span class="cell-val">${fmtStars(r.stars)}</span></td>
          <td class="num delta" data-label="增量">
            <span class="cell-val">
              <span class="num-mono">${r.d30 != null ? fmtDelta(r.d30) : "—"}</span>
              ${r.d7 != null ? `<span class="muted mono"> / 7d ${fmtDelta(r.d7)}</span>` : ""}
              <span class="delta-bar"><span style="width:${width}%"></span></span>
            </span>
          </td>
          <td data-label="信号"><span class="cell-val"><span class="quality quality--${esc(r.quality)}">${esc(qualityText[r.quality])}</span></span></td>
        </tr>`;
      const detail = open ? `
        <tr class="detail">
          <td colspan="5">
            <div class="deal-detail deal-detail--repo">
              <div><h4>WHAT IT DOES</h4><p>${esc(r.what)}</p></div>
              <div><h4>EVIDENCE / CAVEAT</h4><p>${esc(r.evidence)}</p>
                <p class="meta-line"><a class="text-btn" href="${esc(r.url)}" target="_blank" rel="noopener">打开仓库 ↗</a></p></div>
            </div>
          </td>
        </tr>` : "";
      return row + detail;
    }).join("");
  }

  function bindRepos() {
    const body = $("#repoBody");
    body.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const row = e.target.closest("tr.row");
      if (!row) return;
      state.repoOpen = state.repoOpen === row.dataset.repo ? null : row.dataset.repo;
      renderRepos();
    });
    body.addEventListener("keydown", (e) => {
      const row = e.target.closest("tr.row");
      if (!row) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        state.repoOpen = state.repoOpen === row.dataset.repo ? null : row.dataset.repo;
        renderRepos();
      }
    });

    $$("[data-quality]").forEach((btn) => btn.addEventListener("click", () => {
      state.quality = btn.dataset.quality;
      state.repoOpen = null;
      $$("[data-quality]").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      renderRepos();
    }));

    $$("[data-repo-sort]").forEach((btn) => btn.addEventListener("click", () => {
      state.repoSort = btn.dataset.repoSort;
      $$("[data-repo-sort]").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", String(on));
      });
      renderRepos();
    }));

    $$("[data-sort-repo]").forEach((th) => {
      th.addEventListener("click", () => {
        state.repoSort = state.repoSort === "stars" ? "d30" : "stars";
        $$("[data-repo-sort]").forEach((b) => {
          const on = b.dataset.repoSort === state.repoSort;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-pressed", String(on));
        });
        renderRepos();
      });
      th.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); th.click(); }
      });
      if (!th.hasAttribute("tabindex")) th.setAttribute("tabindex", "0");
    });
  }

  /* ------------------------------------------------------------ trend → asia */
  const scoreMap = { "高": 5, "中高": 4, "中": 3, "中低": 2, "低": 1 };
  const trendRegions = ["中国大陆", "日本", "韩国", "新加坡+东南亚", "印度"];

  function trendScore(t) {
    const nums = t.ratings.map((r) => scoreMap[r] || 0);
    return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
  }

  function fillCadence() {
    const t = DATA.trend;
    if (!t) return;
    const period = t.period.replace("-", ".");
    const updated = t.updatedAt.slice(5);
    const next = t.nextUpdate.slice(5);
    $$("[data-trend-period]").forEach((el) => { el.textContent = period; });
    $$("[data-trend-updated]").forEach((el) => { el.textContent = updated; });
    $$("[data-trend-next]").forEach((el) => { el.textContent = next; });
  }

  function renderTrendTabs() {
    const wrap = $("#trendTabs");
    if (!wrap || !DATA.trend) return;
    wrap.innerHTML = DATA.trend.directions.map((t, i) => `
      <button class="trend-tab ${i === state.trendIndex ? "is-on" : ""}" role="tab"
              id="trendTab${i}" aria-selected="${i === state.trendIndex}"
              aria-controls="trendDetail" data-trend="${i}">
        <span class="trend-tab__no">${String(i + 1).padStart(2, "0")}</span>
        <span class="trend-tab__name">${esc(t.name)}</span>
        <span class="trend-tab__score">${trendScore(t)}</span>
      </button>`).join("");
    $$(".trend-tab", wrap).forEach((btn) => {
      btn.addEventListener("click", () => selectTrend(Number(btn.dataset.trend)));
      btn.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          selectTrend((state.trendIndex + 1) % DATA.trend.directions.length);
          $(`#trendTab${state.trendIndex}`).focus();
        }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          selectTrend((state.trendIndex - 1 + DATA.trend.directions.length) % DATA.trend.directions.length);
          $(`#trendTab${state.trendIndex}`).focus();
        }
      });
    });
  }

  function renderTrendDetail() {
    const box = $("#trendDetail");
    if (!box || !DATA.trend) return;
    const t = DATA.trend.directions[state.trendIndex];
    box.innerHTML = `
      <p class="trend-detail__kicker">DIRECTION ${String(state.trendIndex + 1).padStart(2, "0")} / ${String(DATA.trend.directions.length).padStart(2, "0")} · ${esc(DATA.trend.period)}</p>
      <h4>${esc(t.name)}</h4>
      <p class="trend-detail__thesis">${esc(t.thesis)}</p>
      <div class="trend-markets">
        ${t.ratings.map((level, i) => `
          <div class="trend-market ${levelClass[level]}">
            <span>${esc(trendRegions[i])}</span>
            <b>${esc(level)}</b>
          </div>`).join("")}
      </div>
      <h5>PROJECT KEY POINTS</h5>
      <ul class="trend-keys">${t.keyPoints.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      <h5>IMPLEMENTATION PATH · 12 MONTHS</h5>
      <ol class="trend-path">
        ${t.path.map((p) => `<li><b>${esc(p.phase)}</b><p>${esc(p.action)}</p></li>`).join("")}
      </ol>
      <p class="trend-local"><b>本地化提醒 · </b>${esc(t.local)}</p>`;
    $$(".trend-tab").forEach((btn) => {
      const on = Number(btn.dataset.trend) === state.trendIndex;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-selected", String(on));
    });
  }

  function selectTrend(i) {
    if (!DATA.trend) return;
    state.trendIndex = (i + DATA.trend.directions.length) % DATA.trend.directions.length;
    renderTrendDetail();
  }

  function bindTrends() {
    if (!DATA.trend) return;
    fillCadence();
    renderTrendTabs();
    renderTrendDetail();
  }

  /* ------------------------------------------------------------ asia */
  function renderAsia() {
    const body = $("#asiaBody");
    if (!body) return;
    body.innerHTML = DATA.asia.rows.map((row, r) => `
      <tr>
        <td><span title="${esc(row.cat)}">${esc(row.short)}<br><span class="mono" style="font-size:9px;color:var(--muted)">${esc(row.cat.split(" ")[0])}</span></span></td>
        ${row.cells.map((cell, c) => `
          <td data-r="${r}" data-c="${c}" class="${levelClass[cell.level]} ${r === Math.floor(state.asiaIndex / 5) && c === state.asiaIndex % 5 ? "is-on" : ""}"
              tabindex="0" role="button"
              aria-label="${esc(row.cat)}，${esc(DATA.asia.regions[c])}，${esc(cell.level)}">
            <span class="heat-cell">
              <span class="heat-level">${esc(cell.level)}</span>
              <span class="heat-why">${esc(cell.reason)}</span>
            </span>
          </td>`).join("")}
      </tr>`).join("");

    $$("#asiaBody td[data-r]").forEach((td) => {
      td.addEventListener("click", () => selectAsia(Number(td.dataset.r) * 5 + Number(td.dataset.c)));
      td.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectAsia(Number(td.dataset.r) * 5 + Number(td.dataset.c));
        }
      });
    });
    updateAsiaDetail();
  }

  function asiaMove(row, region) {
    const moves = {
      "D": "以“AI 利用ガバナンス”/合规体检 + 审计日志、水印工具切入，先做 2 个金融或制造标杆，再扩到公共部门。",
      "A": "先用开源/PLG 做漏斗，企业版卖合规与私有化；与本地 SIer 分成，不要直接打大企业。",
      "C": "选 1 个行业 + 1 个 SIer 做标杆，按结果/用量计费；先做接口层，不要先做通用行业平台。",
      "B": "不做通用 memory/MCP 中间件；只做“数据不出境”的本地记忆/连接层，作为治理产品的模块。",
      "E": "只做与本地药企/院所/机器人厂商的联合项目，不建区域团队。"
    };
    const regionTail = {
      "中国大陆": "境内主体 + 已备案模型 + 私有化交付，与阿里云/腾讯云/华为云之一绑定。",
      "日本": "走 NTT Data/富士通/日立/NEC 等 SIer，先拿 2–3 个 PoC。",
      "韩国": "绑定 Naver Cloud/KT Cloud/三星 SDS/LG CNS；治理需求 2027 年执法临近前加码。",
      "新加坡+东南亚": "新加坡做区域总部与合规母版，一国一策复制，设 12 个月硬退出门槛。",
      "印度": "只做 GCC 与 GSI（TCS/Infosys/Wipro/HCL），不做本土中小企业地推。"
    };
    return `建议动作：${moves[row.cat[0]]} ${regionTail[region]}`;
  }

  function updateAsiaDetail() {
    const i = state.asiaIndex;
    const r = Math.floor(i / 5), c = i % 5;
    const row = DATA.asia.rows[r], cell = row.cells[c], region = DATA.asia.regions[c];
    const title = $("#asiaDetailTitle"), lvl = $("#asiaLevel"), note = $("#asiaLevelNote"),
      reason = $("#asiaReason"), move = $("#asiaMove");
    if (title) title.textContent = `${row.cat} · ${region}`;
    if (lvl) lvl.textContent = cell.level;
    if (note) note.textContent = levelNote[cell.level] || "";
    if (reason) reason.textContent = cell.reason;
    if (move) move.textContent = asiaMove(row, region);
    $$("#asiaBody td[data-r]").forEach((td) => {
      td.classList.toggle("is-on", Number(td.dataset.r) * 5 + Number(td.dataset.c) === i);
    });
  }

  function selectAsia(i) {
    state.asiaIndex = (i + 25) % 25;
    updateAsiaDetail();
  }

  function bindAsia() {
    const prev = $("#asiaPrev"), next = $("#asiaNext");
    if (prev) prev.addEventListener("click", () => selectAsia(state.asiaIndex - 1));
    if (next) next.addEventListener("click", () => selectAsia(state.asiaIndex + 1));
    // default: D 治理 × 日本 (row 3, col 1)
    state.asiaIndex = 3 * 5 + 1;
    renderAsia();
  }

  /* ------------------------------------------------------------ chrome */
  function bindMenu() {
    const btn = $("#menuBtn"), nav = $("#mobileNav");
    if (!btn || !nav) return;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      nav.hidden = open;
      document.body.classList.toggle("menu-open", !open);
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      document.body.classList.remove("menu-open");
    }));
  }

  function bindNavSpy() {
    const sections = ["capital", "code", "cross", "asia", "action"]
      .map((id) => document.getElementById(id)).filter(Boolean);
    const links = $$("[data-nav]");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.dataset.nav === e.target.id));
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((s) => obs.observe(s));
  }

  function bindReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    const tape = $(".tape");
    if (tape) setTimeout(() => tape.classList.add("is-in"), 120);
  }

  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const t0 = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function bindStats() {
    const stats = $(".stats");
    if (!stats) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".stat__num", stats).forEach(countUp);
        obs.disconnect();
      });
    }, { threshold: 0.4 });
    obs.observe(stats);
  }

  function init() {
    if (!DATA) return;
    renderTape();
    bindDeals();
    bindRepos();
    bindTrends();
    bindAsia();
    bindMenu();
    bindNavSpy();
    bindReveal();
    bindStats();
    renderDeals();
    renderDirChart();
    renderRepos();

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(() => renderDealChart(filteredDeals()), 180);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

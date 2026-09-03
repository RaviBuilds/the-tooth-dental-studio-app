/* Settled-state QA for Section 02 ("The Proof Behind the Reputation"). */
import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const root = process.cwd();
const shotsDir = path.join(root, ".qa-tmp", "shots");
fs.mkdirSync(shotsDir, { recursive: true });

const VIEWPORTS = [
  { w: 1920, h: 1080 },
  { w: 1440, h: 900 },
  { w: 1280, h: 800 },
  { w: 1024, h: 768 },
  { w: 768, h: 1024 },
  { w: 480, h: 853 },
  { w: 430, h: 932 },
  { w: 390, h: 844 },
  { w: 375, h: 812 },
  { w: 360, h: 800 },
];

const only = process.argv[2] ? process.argv[2].split(",").map(Number) : null;
const targets = only ? VIEWPORTS.filter((v) => only.includes(v.w)) : VIEWPORTS;

const browser = await chromium.launch();
const report = [];

for (const vp of targets) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: 1,
    isMobile: vp.w < 768,
    hasTouch: vp.w < 768,
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);

  const lcp = await page.evaluate(() => new Promise((res) => {
    let v = 0;
    try {
      new PerformanceObserver((l) => { for (const e of l.getEntries()) v = e.startTime; })
        .observe({ type: "largest-contentful-paint", buffered: true });
    } catch { /* not supported */ }
    setTimeout(() => res(Math.round(v)), 400);
  }));

  // User-like scroll down to Section 02 in steps (IOs fire naturally).
  const passed = await page.evaluate(async () => {
    const section = document.querySelector(".proof");
    if (!section) return null;
    const vh = window.innerHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    for (let y = 0; y <= top; y += vh * 0.55) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, top);
    return { top, pageH: document.documentElement.scrollHeight };
  });
  if (!passed) { report.push({ vw: vp.w, error: "no .proof section" }); await ctx.close(); continue; }

  // Wait until every revealable has is-revealed, then let transitions finish.
  await page.waitForFunction(
    () => {
      const els = [...document.querySelectorAll(".proof-reveal, .proof-line-reveal")];
      return els.length > 0 && els.every((e) => e.classList.contains("is-revealed"));
    },
    { timeout: 12000 },
  ).catch(() => {});
  await page.waitForTimeout(1800);
  // MARKER_METRICS
  const metrics = await page.evaluate(() => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const section = document.querySelector(".proof");
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) };
    };

    const revealables = [...document.querySelectorAll(".proof-reveal, .proof-line-reveal")];
    const pending = [];
    for (const el of revealables) {
      const c = cs(el);
      const settled = parseFloat(c.opacity) >= 0.99 && (c.transform === "none" || /^matrix\(1, 0, 0, 1, 0, 0\)$/.test(c.transform));
      if (!settled) pending.push({ cls: el.className.slice(0, 40), opacity: c.opacity, transform: c.transform });
    }

    const lines = [...document.querySelectorAll(".proof-line-reveal")].map((el) => {
      const c = cs(el);
      const r = el.getBoundingClientRect();
      return { text: el.textContent.trim().slice(0, 24), opacity: c.opacity, transform: c.transform, visiblePx: Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)), h: Math.round(r.height) };
    });

    const qa = cs(document.querySelector(".proof-quote.is-active"));
    const railItems = [...document.querySelectorAll(".proof-rail-item")].map((b) => {
      const c = cs(b);
      const r = b.getBoundingClientRect();
      return { name: b.textContent.trim().slice(0, 18), opacity: c.opacity, visible: r.width > 0 && r.height > 0 };
    });

    const video = document.querySelector(".proof-video");
    const vs = video ? {
      hasSrc: !!video.getAttribute("src"),
      poster: !!video.getAttribute("poster"),
      readyState: video.readyState,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      paused: video.paused,
      currentTime: Number(video.currentTime.toFixed(2)),
      error: video.error ? video.error.code : null,
      opacity: cs(video).opacity,
    } : null;

    const geo = {
      open: rect(document.querySelector(".proof-open")),
      title: rect(document.querySelector(".proof-title")),
      media: rect(document.querySelector(".proof-media")),
      frame: rect(document.querySelector(".proof-frame")),
      stage: rect(document.querySelector(".proof-stage")),
      rating: rect(document.querySelector(".proof-gcard")),
      signals: rect(document.querySelector(".proof-signals")),
    };
    const gh = document.querySelector(".proof-reputation-ghost");
    const gc = document.querySelector(".proof-gcard");
    const gv = document.querySelector(".proof-gcard-voice-name");
    const reputation = gc ? {
      card: rect(gc),
      ghost: gh ? rect(gh) : null,
      ghostOpacity: gh ? parseFloat(cs(gh).opacity) : null,
      ghostFont: gh ? cs(gh).fontSize : null,
      ghostBehind: gh && gc ? (() => {
        const g = gh.getBoundingClientRect(); const c = gc.getBoundingClientRect();
        const gx = Math.max(0, Math.min(g.right, c.right) - Math.max(g.left, c.left));
const gy = Math.max(0, Math.min(g.bottom, c.bottom) - Math.max(g.top, c.top));
return Math.round(gx * gy);
      })() : null,
      voice: gv ? gv.textContent.trim() : null,
      score: document.querySelector(".proof-gcard-score")?.textContent.trim(),
      count: document.querySelector(".proof-gcard-count")?.textContent.trim(),
      bridge: document.querySelector(".proof-gcard-bridge")?.textContent.trim().slice(0,40),
    } : null;
    const overflowX = document.documentElement.scrollWidth - vw;
    // Enumerate elements that poke past the right/left viewport edge, so the
    // overflow culprit is identified rather than guessed.
    const overflowCulprits = [];
    if (overflowX > 2) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 2 || r.left < -2) {
          const c = getComputedStyle(el);
          if (c.position === "fixed") continue;
          overflowCulprits.push({
            sel: `${el.tagName.toLowerCase()}.${String(el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className).trim().split(/\s+/).slice(0, 3).join(".")}`,
            right: Math.round(r.right),
            left: Math.round(r.left),
            w: Math.round(r.width),
            pos: c.position,
          });
          if (overflowCulprits.length >= 12) break;
        }
      }
    }

    const hero = document.querySelector(".hero-stage");
    const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;
    const boundary = hero ? {
      heroBottomDoc: Math.round(docTop(hero) + hero.getBoundingClientRect().height),
      proofTopDoc: Math.round(docTop(section)),
      gapPx: Math.round(docTop(section) - (docTop(hero) + hero.getBoundingClientRect().height)),
    } : null;

    return { vh, vw, proofReady: section.dataset.proofReady === "true", pending, lines, activeQuote: qa ? { opacity: qa.opacity, visibility: qa.visibility } : null, railItems, video: vs, geo, reputation, overflowX, overflowCulprits, boundary };
  });
  // MARKER_SHOTS
  // Screenshot 1 — the chapter boundary: hero bottom + section open in one frame
  await page.evaluate((vh) => {
    const s = document.querySelector(".proof");
    window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - vh * 0.62);
  }, vp.h);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(shotsDir, `${vp.w}-boundary.png`) });

  // Screenshot 2 — section open (headline)
  await page.evaluate((vh) => {
    const s = document.querySelector(".proof-open");
    window.scrollTo(0, s.getBoundingClientRect().top + window.scrollY - vh * 0.08);
  }, vp.h);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(shotsDir, `${vp.w}-open.png`) });

  // Screenshot 3 — the bridge (video + voice); give lazy video time to paint
  await page.evaluate((vh) => {
    const m = document.querySelector(".proof-media");
    window.scrollTo(0, m.getBoundingClientRect().top + window.scrollY - vh * 0.12);
  }, vp.h);
  await page.waitForTimeout(2500);
  metrics.videoAfterSettle = await page.evaluate(() => {
    const v = document.querySelector(".proof-video");
    return v ? { hasSrc: !!v.getAttribute("src"), readyState: v.readyState, videoWidth: v.videoWidth, paused: v.paused, currentTime: Number(v.currentTime.toFixed(2)), error: v.error ? v.error.code : null, safeStart: v.currentTime >= 6.5 } : null;
  });
  await page.screenshot({ path: path.join(shotsDir, `${vp.w}-bridge.png`) });

  // Screenshot 4 — rating + signals
  await page.evaluate((vh) => {
    const r = document.querySelector(".proof-gcard");
    window.scrollTo(0, r.getBoundingClientRect().top + window.scrollY - vh * 0.15);
  }, vp.h);
  await page.waitForTimeout(2800);
  await page.screenshot({ path: path.join(shotsDir, `${vp.w}-ground.png`) });

  const secH = await page.evaluate(() => Math.round(document.querySelector(".proof").getBoundingClientRect().height));
  metrics.sectionHeight = secH;

  report.push({ vw: vp.w, vh: vp.h, lcp, consoleErrors, ...metrics });
  await ctx.close();
}

await browser.close();
fs.writeFileSync(path.join(root, ".qa-tmp", "report.json"), JSON.stringify(report, null, 2));

for (const r of report) {
  const pend = r.pending ? r.pending.length : "n/a";
  const v = r.videoAfterSettle || {};
  const hl = (r.lines || []).map((l) => `o=${l.opacity}`).join(",");
  console.log(`${r.vw}px | ready:${r.proofReady} | pending:${pend} | headline:[${hl}] | quote:${r.activeQuote ? r.activeQuote.opacity : "n/a"} | video: src=${v.hasSrc} rs=${v.readyState} w=${v.videoWidth} playing=${v.paused === false} t=${v.currentTime} err=${v.error} safeStart=${v.safeStart === true ? "ok" : "FAIL"} | ovX:${r.overflowX} | gap:${r.boundary ? r.boundary.gapPx : "?"} | LCP:${r.lcp}ms | errs:${(r.consoleErrors || []).length}`);
console.log(`  rep: ghost=${r.reputation ? r.reputation.ghostOpacity : "?"} score=${r.reputation ? r.reputation.score : "?"} voice=${r.reputation ? r.reputation.voice : "?"} overlap=${r.reputation ? r.reputation.ghostBehind : "?"}`);
}
console.log("done -> .qa-tmp/report.json + .qa-tmp/shots/");


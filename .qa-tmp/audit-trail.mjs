import { chromium } from "playwright";

const browser = await chromium.launch();
const errors = [];
const out = [];

for (const [name, w, h] of [["1920", 1920, 1080], ["768", 768, 1024], ["390", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${name}: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const s = document.querySelector(".proof-signals");
    if (s) s.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await page.waitForTimeout(3400);
  const m = await page.evaluate(() => {
    const thread = document.querySelector(".proof-signal-thread-path");
    const echo = document.querySelector(".proof-signal-thread-echo");
    const svg = document.querySelector(".proof-signal-thread");
    const canvas = document.querySelector(".proof-signal-canvas");
    const signals = [...document.querySelectorAll(".proof-signal")];
    const cR = canvas ? canvas.getBoundingClientRect() : null;
    // distance from each node centre to the thread's y at the same x (desktop only)
    let maxDrift = null;
    if (thread && cR && window.innerWidth >= 1024 && svg.getBoundingClientRect().height > 0) {
      const svgR = svg.getBoundingClientRect();
      const path = thread;
      const total = path.getTotalLength();
      maxDrift = 0;
      for (const s of signals) {
        const n = s.querySelector(".proof-signal-node");
        if (!n) continue;
        const nR = n.getBoundingClientRect();
        const nx = nR.left + nR.width / 2 - svgR.left;
        const ny = nR.top + nR.height / 2 - svgR.top;
        // sample the path for nearest point to the node centre
        let best = Infinity;
        for (let i = 0; i <= 400; i++) {
          const p = path.getPointAtLength((total * i) / 400);
          // map viewBox (1200x100) to svg box
          const px = svgR.left + (p.x / 1200) * svgR.width;
          const py = svgR.top + (p.y / 100) * svgR.height;
          const dx = svgR.left + nx - px, dy = svgR.top + ny - py;
          const dist = Math.hypot(dx, dy);
          if (dist < best) best = dist;
        }
        maxDrift = Math.max(maxDrift, best);
      }
    }
    return {
      thread: !!thread,
      threadDrawn: thread ? getComputedStyle(thread).strokeDashoffset : null,
      echoOpacity: echo ? getComputedStyle(echo).opacity : null,
      signals: signals.length,
      revealed: signals.filter((s) => s.classList.contains("is-revealed")).length,
      canvasH: cR ? Math.round(cR.height) : 0,
      nodeDriftPx: maxDrift === null ? "n/a (mobile)" : Math.round(maxDrift * 10) / 10,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
  out.push({ name, ...m });
  const el = await page.$(".proof-signals");
  if (el) await el.screenshot({ path: `.qa-tmp/shots/trail-${name}.png` });
  await page.close();
}

await browser.close();
for (const r of out) console.log(JSON.stringify(r));
console.log("console-errors:", errors.length ? errors.join(" | ") : "none");

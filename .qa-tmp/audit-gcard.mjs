import { chromium } from "playwright";

const VIEWPORTS = [
  { w: 1920, h: 1080, name: "1920" },
  { w: 768, h: 1024, name: "768" },
  { w: 390, h: 844, name: "390" },
];

const results = [];
const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });

  const card = page.locator(".proof-gcard").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3500);

  const audit = await page.evaluate(() => {
    const cs = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const s = getComputedStyle(el);
      return s;
    };
    const cardEl = document.querySelector(".proof-gcard");
    const r = cardEl ? cardEl.getBoundingClientRect() : null;
    const star = document.querySelector(".proof-gcard-star");
    const avatar = document.querySelector(".proof-gcard-avatar");
    const quote = document.querySelector(".proof-gcard-quote");
    const ghost = document.querySelector(".proof-reputation-ghost");
    return {
      card: cardEl
        ? {
            bg: getComputedStyle(cardEl).backgroundColor,
            border: getComputedStyle(cardEl).borderColor,
            radius: getComputedStyle(cardEl).borderRadius,
            shadow: getComputedStyle(cardEl).boxShadow.slice(0, 60),
            font: getComputedStyle(cardEl).fontFamily.split(",")[0],
            w: Math.round(r.width),
            visible: r.width > 0 && r.height > 0,
          }
        : null,
      score: (() => { const s = cs(".proof-gcard-score"); return s ? { color: s.color, size: s.fontSize } : null; })(),
      count: (() => { const s = cs(".proof-gcard-count"); return s ? s.color : null; })(),
      starFill: star ? getComputedStyle(star).fill : null,
      starCount: document.querySelectorAll(".proof-gcard-rating .proof-gcard-star").length,
      reviewStars: document.querySelectorAll(".proof-gcard-review .proof-gcard-star").length,
      avatarBg: avatar ? getComputedStyle(avatar).backgroundColor : null,
      avatarText: avatar ? avatar.textContent.trim() : null,
      reviewer: document.querySelector(".proof-gcard-voice-name")?.textContent.trim() ?? null,
      quoteText: quote ? quote.textContent.slice(0, 40) : null,
      ghostOpacity: ghost ? getComputedStyle(ghost).opacity : null,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      glogo: !!document.querySelector(".proof-gcard-glogo"),
    };
  });

  await card.screenshot({ path: `.qa-tmp/shots/gcard-${vp.name}.png` });
  results.push({ vw: vp.name, ...audit, consoleErrors: errors.length });
  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 1));

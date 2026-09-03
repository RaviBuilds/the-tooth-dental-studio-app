import { chromium } from "playwright";

const VIEWPORTS = [
  { w: 1920, h: 1080, name: "1920" },
  { w: 768, h: 1024, name: "768" },
  { w: 390, h: 844, name: "390" },
];
const results = [];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Scroll the reputation ground into view and wait for reveal + first swap cycle
  await page.locator(".proof-gcard").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2600);

  const audit = await page.evaluate(() => {
    const gs = (el, p) => (el ? getComputedStyle(el)[p] : null);
    const card = document.querySelector(".proof-gcard");
    if (!card) return { found: false };
    const gmark = card.querySelector(".proof-gcard-gmark");
    const progress = card.querySelector(".proof-gcard-progress");
    const review = card.querySelector(".proof-gcard-review");
    const stars = card.querySelectorAll(".proof-gcard-stars .proof-gcard-star");
    const quote = card.querySelector(".proof-gcard-quote");
    const anim = progress ? getComputedStyle(progress).animationName + " / " + getComputedStyle(progress).animationDuration : "NONE";
    // does the keyframes rule exist in any stylesheet?
    let kf = false;
    for (const ss of document.styleSheets) {
      try { for (const r of ss.cssRules) if (r.type === 7 && r.name === "proof-progress") kf = true; } catch {}
    }
    return {
      found: true,
      revealed: card.classList.contains("is-revealed"),
      frame: gs(card, "borderRadius") + " / border " + gs(card, "borderTopColor"),
      gmarkOpacity: gmark ? gs(gmark, "opacity") : "MISSING",
      progressAnim: anim,
      keyframesExist: kf,
      swapAnim: review ? getComputedStyle(review).animationName : "MISSING",
      starCount: stars.length,
      voiceName: card.querySelector(".proof-gcard-voice-name")?.textContent || "",
      quoteStart: (quote?.textContent || "").slice(0, 42),
      cardWidth: Math.round(card.getBoundingClientRect().width),
      docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  audit.vw = vp.w;
  audit.errors = errors.length;
  results.push(audit);
  await page.screenshot({ path: `.qa-tmp/shots/creative-${vp.name}.png`, clip: await page.locator(".proof-reputation").boundingBox().then(b => b || undefined).catch(() => undefined) }).catch(async () => { await page.screenshot({ path: `.qa-tmp/shots/creative-${vp.name}.png` }); });
  await page.close();
}
await browser.close();
console.table(results.map(r => ({ vw: r.vw, found: r.found, revealed: r.revealed, gmark: r.gmarkOpacity, anim: r.progressAnim, kf: r.keyframesExist, swap: r.swapAnim, stars: r.starCount, ovX: r.docOverflowX, errs: r.errors })));
for (const r of results) console.log(`vw=${r.vw} voice=${r.voiceName} quote="${r.quoteStart}…" card=${r.cardWidth}px frame=${r.frame}`);

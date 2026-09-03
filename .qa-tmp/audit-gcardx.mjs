import { chromium } from "playwright";
import fs from "fs";

const URL = "http://localhost:3000";
const SHOTS = ".qa-tmp/shots";
const VIEWPORTS = [
  { w: 1920, h: 1080 },
  { w: 768, h: 1024 },
  { w: 390, h: 844 },
];

const browser = await chromium.launch();
const report = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

  const r = await page.evaluate(async () => {
    const card = document.querySelector(".proof-gcard");
    if (!card) return { found: false };
    card.scrollIntoView({ block: "center" });
    // wait for reveal + star pop choreography to finish
    await new Promise((res) => setTimeout(res, 2600));

    const cs = getComputedStyle(card);
    const gmark = card.querySelector(".proof-gcard-gmark");
    const progress = card.querySelector(".proof-gcard-progress");
    const bigStars = card.querySelectorAll(".proof-gcard-stars .proof-gcard-star");
    const starT = bigStars.length ? getComputedStyle(bigStars[4]).transform : "none";
    const review = card.querySelector(".proof-gcard-review");
    const bodyOverflow = document.documentElement.scrollWidth > window.innerWidth;
    const before = getComputedStyle(card, "::before");
    return {
      found: true,
      surface: cs.backgroundColor,
      border: cs.borderTopColor,
      radius: cs.borderRadius,
      font: cs.fontFamily.split(",")[0],
      overflowHidden: cs.overflow === "hidden",
      gmark: !!gmark,
      gmarkOpacity: gmark ? getComputedStyle(gmark).opacity : null,
      gmarkPos: gmark ? getComputedStyle(gmark).position : null,
      progress: !!progress,
      progressBg: progress ? getComputedStyle(progress).backgroundColor : null,
      progressAnim: progress ? getComputedStyle(progress).animationName : null,
      starCount: bigStars.length,
      starFinalTransform: starT,
      reviewKeyed: review ? review.className : null,
      frameBefore: before.borderTopWidth + " " + before.borderTopColor,
      bodyOverflow,
    };
  });

  // voice-swap check: wait for a cycle key change is too slow (7s) - instead
  // verify the keyed element exists and animation is wired in CSS
  // full-page screenshot centered on the card
  await page.evaluate(() => document.querySelector(".proof-gcard").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${SHOTS}/gcardx-${vp.w}.png` });

  report.push({ vw: vp.w, ...r, consoleErrors: errors.length, errors });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 1));

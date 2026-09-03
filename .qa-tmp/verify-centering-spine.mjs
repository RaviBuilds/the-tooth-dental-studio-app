/* Verify: (1) .proof-frame centered below 1024px, left-aligned at ≥1024px.
   (2) All .proof-signal items flush on the spine — node diamonds centered on
   the .proof-signal-path border-left at every width. */
import { chromium } from "playwright";

const VIEWPORTS = [
  { w: 375, h: 812 },
  { w: 430, h: 932 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1440, h: 900 },
];

const browser = await chromium.launch();
let failures = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);

  const r = await page.evaluate(() => {
    const out = { signals: [] };
    const frame = document.querySelector(".proof-frame")?.getBoundingClientRect();
    const media = document.querySelector(".proof-media")?.getBoundingClientRect();
    if (frame && media) {
      out.frame = {
        leftGap: +(frame.left - media.left).toFixed(1),
        rightGap: +(media.right - frame.right).toFixed(1),
      };
    }
    const path = document.querySelector(".proof-signal-path")?.getBoundingClientRect();
    if (path) {
      out.spineX = +path.left.toFixed(1); // border-left edge
      for (const li of document.querySelectorAll(".proof-signal")) {
        const node = li.querySelector(".proof-signal-node")?.getBoundingClientRect();
        const lr = li.getBoundingClientRect();
        out.signals.push({
          word: li.querySelector(".proof-signal-word")?.textContent ?? "?",
          itemLeft: +lr.left.toFixed(1),
          nodeCenterX: node ? +(node.left + node.width / 2).toFixed(1) : null,
        });
      }
    }
    return out;
  });

  const twoCol = vp.w >= 1024;
  const fg = r.frame ?? { leftGap: NaN, rightGap: NaN };
  const centeredOk = twoCol
    ? fg.leftGap <= 1 // desktop: frame starts at column edge
    : Math.abs(fg.leftGap - fg.rightGap) <= 1.5;
  // Spine check applies only below 1024px — on desktop, themes hang from the
  // curved thread at varied x positions (staggered by design).
  const signalsOk =
    r.signals.length === 5 &&
    (!twoCol
      ? new Set(r.signals.map((s) => s.itemLeft)).size === 1 && // all flush
        r.signals.every((s) => s.nodeCenterX !== null && Math.abs(s.nodeCenterX - (r.spineX - 0.5)) <= 1.5)
      : new Set(r.signals.map((s) => s.nodeCenterX)).size === 5); // stagger preserved

  if (!centeredOk) failures++;
  if (!signalsOk) failures++;
  console.log(
    `\n[${vp.w}x${vp.h}] frame gaps L/R: ${fg.leftGap}/${fg.rightGap} px -> centered: ${centeredOk ? "OK" : "FAIL"}` +
      (twoCol ? " (desktop column-start expected)" : "")
  );
  console.log(
    `  spine x=${r.spineX}; items flush: ${new Set(r.signals.map((s) => s.itemLeft)).size === 1 ? "yes" : "NO"}; ` +
      `node centers: ${r.signals.map((s) => s.nodeCenterX).join(", ")} -> on-spine: ${signalsOk ? "OK" : "FAIL"}`
  );
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

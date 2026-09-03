/* Verify backing plane (.proof-media-plane) symmetry vs .proof-frame:
   <1024px -> left/right peek equal; ≥1024px -> desktop insets unchanged
   (left -7% / right 11% => plane peeks left, not right). */
import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const root = process.cwd();
const shotsDir = path.join(root, ".qa-tmp", "shots");
fs.mkdirSync(shotsDir, { recursive: true });

const VIEWPORTS = [
  { w: 480, h: 853 },
  { w: 768, h: 1024, shot: "plane-768" },
  { w: 900, h: 900, shot: "plane-900" },
  { w: 1024, h: 768 },
  { w: 1440, h: 900 },
];

const browser = await chromium.launch();
let failures = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1000);

  const r = await page.evaluate(() => {
    const frame = document.querySelector(".proof-frame")?.getBoundingClientRect();
    const plane = document.querySelector(".proof-media-plane")?.getBoundingClientRect();
    if (!frame || !plane) return null;
    return {
      leftPeek: +(frame.left - plane.left).toFixed(1),
      rightPeek: +(plane.right - frame.right).toFixed(1),
      planeVisible: plane.left < frame.right && plane.right > frame.left,
    };
  });
  if (!r || !r.planeVisible) { failures++; console.log(`[${vp.w}] plane missing/invisible: FAIL`); await ctx.close(); continue; }

  const twoCol = vp.w >= 1024;
  // Below 1024px: peeks symmetric within 2px (tilt adds ~1px variance).
  // Desktop: verify the design insets are intact (left -7% / right 11% of the
  // media box) — the mobile change simply must not apply there.
  let ok;
  if (twoCol) {
    const insets = await page.evaluate(() => {
      const plane = document.querySelector(".proof-media-plane");
      const media = document.querySelector(".proof-media");
      const cs = getComputedStyle(plane);
      const w = media.getBoundingClientRect().width;
      return { leftPct: +(parseFloat(cs.left) / w * 100).toFixed(1), rightPct: +(parseFloat(cs.right) / w * 100).toFixed(1) };
    });
    ok = Math.abs(insets.leftPct + 7) <= 0.5 && Math.abs(insets.rightPct - 11) <= 0.5;
    if (!ok) console.log(`  desktop insets changed unexpectedly: ${insets.leftPct}% / ${insets.rightPct}%`);
  } else {
    ok = Math.abs(r.leftPeek - r.rightPeek) <= 2;
  }
  if (!ok) failures++;

  console.log(`[${vp.w}x${vp.h}] plane peek L/R: ${r.leftPeek}/${r.rightPeek} px -> ${ok ? (twoCol ? "OK (desktop left-shift by design)" : "OK (symmetric)") : "FAIL"}`);

  if (vp.shot) {
    const m = await page.$(".proof-media");
    await m.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await m.screenshot({ path: path.join(shotsDir, `${vp.shot}.png`) });
    console.log(`  screenshot -> .qa-tmp/shots/${vp.shot}.png`);
  }
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

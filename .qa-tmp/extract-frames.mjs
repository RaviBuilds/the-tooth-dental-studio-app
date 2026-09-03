import { chromium } from "playwright";
import { pathToFileURL } from "url";
import path from "path";
import fs from "fs";

const root = process.cwd();
const videoRel = "public/videos/dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad.mp4";
const t = 7; // calm, composed treatment frame inside the real studio (verified visually)
const outPath = path.join(root, "public/videos/dr-mohammed-imran-ali-dental-treatment-tooth-dental-studio-hyderabad-poster.jpg");

const hostHtml = `<!doctype html><video id="v" src="./${path.basename(videoRel)}" muted playsinline preload="auto" crossorigin="anonymous"></video>`;
const hostPath = path.join(root, path.dirname(videoRel), "__frame_host.html");
fs.writeFileSync(hostPath, hostHtml);

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 560, height: 1000 } });
await page.goto(pathToFileURL(hostPath).href, { waitUntil: "load" });
await page.waitForFunction(
  () => { const v = document.getElementById("v"); return v && v.readyState >= 2 && v.videoWidth > 0; },
  null, { timeout: 30000 },
);

const data = await page.evaluate(async (t) => {
  const v = document.getElementById("v");
  v.pause();
  v.currentTime = t;
  await new Promise((res) => v.addEventListener("seeked", res, { once: true }));
  await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
  // 720px-wide web poster, keeps the full 9:16 portrait frame
  const w = 720;
  const h = Math.round((v.videoHeight / v.videoWidth) * w);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(v, 0, 0, w, h);
  return c.toDataURL("image/jpeg", 0.82);
}, t);
fs.writeFileSync(outPath, Buffer.from(data.split(",")[1], "base64"));

await browser.close();
fs.unlinkSync(hostPath);
console.log(`poster written: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);


import { chromium } from "playwright";

const url = process.env.PDF_URL || "http://localhost:3000/?print=1";
const outputPath = process.env.PDF_OUTPUT || "gidon-greenblatt-cv.pdf";

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector('[data-typing-done="true"]', { timeout: 15000 });
await page.waitForTimeout(300);
await page.emulateMedia({ media: "print" });

await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: {
    top: "0mm",
    right: "0mm",
    bottom: "0mm",
    left: "0mm",
  },
});

await browser.close();

console.log(`Saved PDF to ${outputPath}`);

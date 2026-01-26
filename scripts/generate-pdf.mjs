import { chromium } from "playwright";

const url = process.env.PDF_URL || "http://localhost:3000/print";
const outputPath = process.env.PDF_OUTPUT || "gidon-greenblatt-cv.pdf";

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(url, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });

await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: {
    top: "12mm",
    right: "12mm",
    bottom: "12mm",
    left: "12mm",
  },
});

await browser.close();

console.log(`Saved PDF to ${outputPath}`);

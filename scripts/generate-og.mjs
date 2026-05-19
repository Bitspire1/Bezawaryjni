import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const svgPath = resolve(root, "public", "favicon.svg");
const outPath = resolve(root, "public", "images", "og-image.png");

const W = 1200;
const H = 630;

const svgBuffer = readFileSync(svgPath);

const logoSize = 380;
const logoPng = await sharp(svgBuffer)
    .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

const taglineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="80">
  <text x="${W / 2}" y="56" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="600"
        fill="#facc15" letter-spacing="2">
    Serwis Samochodowy &amp; Warsztat Mechaniczny · Kobylnica / Słupsk
  </text>
</svg>`;

const taglineBuffer = Buffer.from(taglineSvg);

await sharp({
    create: {
        width: W,
        height: H,
        channels: 4,
        background: { r: 11, g: 11, b: 11, alpha: 1 },
    },
})
    .composite([
        {
            input: logoPng,
            top: Math.round((H - logoSize) / 2) - 30,
            left: Math.round((W - logoSize) / 2),
        },
        {
            input: taglineBuffer,
            top: Math.round((H - logoSize) / 2) + logoSize - 10,
            left: 0,
        },
    ])
    .png()
    .toFile(outPath);

console.log(`✅ OG image saved to ${outPath}`);

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const files = [
  { input: "public/images/beautyglow.jpg", output: "public/images/beautyglow.jpg" },
  { input: "public/images/travelhub.jpg", output: "public/images/travelhub.jpg" },
];

for (const file of files) {
  const buf = readFileSync(file.input);
  const optimized = await sharp(buf)
    .resize(840, 525, { fit: "cover" })
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();

  writeFileSync(file.output, optimized);
  console.log(`[v0] ${file.output}: ${(buf.length / 1024).toFixed(0)}KB -> ${(optimized.length / 1024).toFixed(0)}KB`);
}

console.log("[v0] Done optimizing images");

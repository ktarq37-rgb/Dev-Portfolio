import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "..", "public", "images");

const files = ["beautyglow.jpg", "travelhub.jpg"];

for (const file of files) {
  const filePath = path.join(imagesDir, file);
  const tempPath = path.join(imagesDir, `temp-${file}`);
  
  try {
    await sharp(filePath)
      .resize(840, 525, { fit: "cover" })
      .jpeg({ quality: 80, progressive: true })
      .toFile(tempPath);

    // Replace original with optimized
    const fs = await import("fs/promises");
    await fs.rename(tempPath, filePath);
    
    const stats = await fs.stat(filePath);
    console.log(`Optimized ${file}: ${(stats.size / 1024).toFixed(0)}KB`);
  } catch (e) {
    console.error(`Error processing ${file}:`, e.message);
  }
}

console.log("Done!");

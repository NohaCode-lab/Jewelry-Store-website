const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '../src/assets');
const optDir = path.join(__dirname, '../src/assets/optimized');

if (!fs.existsSync(optDir)) {
  fs.mkdirSync(optDir, { recursive: true });
}

async function processDirectory(currentDir, relativePath = '') {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'optimized') continue; // skip output dir

    const fullPath = path.join(currentDir, entry.name);
    const relSub = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      const targetSub = path.join(optDir, relSub);
      if (!fs.existsSync(targetSub)) {
        fs.mkdirSync(targetSub, { recursive: true });
      }
      await processDirectory(fullPath, relSub);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      const parsed = path.parse(entry.name);
      const outputFilename = `${parsed.name}.webp`;
      const targetPath = path.join(optDir, relativePath, outputFilename);

      const stats = fs.statSync(fullPath);
      const inputBuffer = fs.readFileSync(fullPath);
      
      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      const outputBuffer = await image
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85, effort: 6 })
        .toBuffer();

      fs.writeFileSync(targetPath, outputBuffer);

      const optStats = fs.statSync(targetPath);
      const optMeta = await sharp(outputBuffer).metadata();

      console.log(`Converted: ${relSub}`);
      console.log(`  Original: ${(stats.size / 1024).toFixed(1)} KB (${metadata.width}x${metadata.height})`);
      console.log(`  WebP:     ${(optStats.size / 1024).toFixed(1)} KB (${optMeta.width}x${optMeta.height})`);
      console.log(`  Saved:    ${((1 - optStats.size / stats.size) * 100).toFixed(1)}%\n`);
    }
  }
}

processDirectory(srcDir)
  .then(() => console.log('WebP generation complete!'))
  .catch((err) => console.error('Error generating WebP assets:', err));

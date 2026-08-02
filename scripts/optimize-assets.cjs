const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../src/assets');

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      const stats = fs.statSync(fullPath);
      
      // If file is larger than 100KB, optimize it
      if (stats.size > 100 * 1024) {
        console.log(`Optimizing: ${entry.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
        
        const inputBuffer = fs.readFileSync(fullPath);
        const outputBuffer = await sharp(inputBuffer)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 82, progressive: true })
          .toBuffer();

        fs.writeFileSync(fullPath, outputBuffer);

        const newStats = fs.statSync(fullPath);
        console.log(`  -> New size: ${(newStats.size / 1024).toFixed(2)} KB`);
      }
    }
  }
}

processDirectory(assetsDir)
  .then(() => console.log('Image optimization complete!'))
  .catch((err) => console.error('Error optimizing images:', err));

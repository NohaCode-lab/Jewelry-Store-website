const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateFavicons() {
  const svgPath = path.join(__dirname, '../public/favicon.svg');
  const pngPath = path.join(__dirname, '../public/favicon.png');
  const applePath = path.join(__dirname, '../public/apple-touch-icon.png');
  const icoPath = path.join(__dirname, '../public/favicon.ico');

  // Convert SVG emblem to 32x32 PNG for favicon
  await sharp(svgPath)
    .resize(32, 32)
    .png()
    .toFile(pngPath);

  // Convert SVG emblem to 180x180 PNG for Apple Touch Icon
  await sharp(svgPath)
    .resize(180, 180)
    .png()
    .toFile(applePath);

  // Also write 32x32 PNG as favicon.ico
  await sharp(svgPath)
    .resize(32, 32)
    .png()
    .toFile(icoPath);

  console.log('Successfully generated favicon.png, apple-touch-icon.png, and favicon.ico in public/!');
}

generateFavicons().catch(console.error);

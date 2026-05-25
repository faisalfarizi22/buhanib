const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const inputPath = 'public/icon-layanan.png';
const outputDir = 'public/asset';

const config = [
  { name: 'insights', row: 0, col: 0 },
  { name: 'lab',      row: 0, col: 1 },
  { name: 'journey',  row: 0, col: 2 },
  { name: 'play',     row: 0, col: 3 },
  { name: 'academy',  row: 1, col: 0 },
  { name: 'impact',   row: 1, col: 1 },
  { name: 'works',    row: 1, col: 2 },
  { name: 'coach',    row: 1, col: 3 }
];

// Detect if a pixel is navy-blue text (dark blue used for labels)
function isNavyBlue(r, g, b) {
  // Navy blue range: low R, low G, moderate-high B with specific ratio
  return r < 50 && g < 70 && b > 80 && b < 180;
}

async function sliceIcons() {
  const mainImage = await Jimp.read(inputPath);
  const totalW = mainImage.bitmap.width;
  const totalH = mainImage.bitmap.height;
  
  const cellW = Math.floor(totalW / 4);
  const cellH = Math.floor(totalH / 2);
  
  for (const item of config) {
    const startX = item.col * cellW;
    const startY = item.row * cellH;
    
    // Scan each row from top. Detect the first row that has multiple navy-blue pixels
    // = that's the start of the text label
    let textStartY = startY + cellH; // default: end of cell
    
    for (let y = startY + Math.floor(cellH * 0.5); y < startY + cellH; y++) {
      let navyCount = 0;
      for (let x = startX; x < startX + cellW; x++) {
        const idx = (y * totalW + x) * 4;
        const r = mainImage.bitmap.data[idx];
        const g = mainImage.bitmap.data[idx + 1];
        const b = mainImage.bitmap.data[idx + 2];
        if (isNavyBlue(r, g, b)) navyCount++;
      }
      // If more than 4 navy pixels in a row → text line detected
      if (navyCount > 4) {
        textStartY = y - 8; // 8px breathing room above text
        break;
      }
    }
    
    const activeH = textStartY - startY;
    console.log(`[${item.name}] text detected at y=${textStartY}, scanning ${activeH}px height`);
    
    // Now find bounding box of gold icon pixels
    let minX = startX + cellW;
    let minY = startY + activeH;
    let maxX = startX;
    let maxY = startY;
    let found = false;
    
    mainImage.scan(startX, startY, cellW, activeH, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Non-white, non-transparent pixel (the gold icon color)
      if (r < 242 || g < 242 || b < 242) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    });
    
    if (!found) {
      console.log(`  → No icon found for ${item.name}`);
      continue;
    }
    
    const padding = 10;
    const cropX = Math.max(startX, minX - padding);
    const cropY = Math.max(startY, minY - padding);
    const cropW = Math.min(cellW - (cropX - startX), (maxX - minX) + padding * 2);
    const cropH = Math.min(activeH - (cropY - startY), (maxY - minY) + padding * 2);
    
    const iconImage = mainImage.clone().crop({ x: cropX, y: cropY, w: cropW, h: cropH });
    
    // Remove white/near-white background → transparent
    iconImage.scan(0, 0, iconImage.bitmap.width, iconImage.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      if (r > 240 && g > 240 && b > 240) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    
    const outPath = path.join(outputDir, `${item.name}.png`);
    await iconImage.write(outPath);
    console.log(`  ✓ Saved ${item.name}: ${cropW}x${cropH}px\n`);
  }
}

sliceIcons()
  .then(() => console.log('All 8 icons exported — clean transparent backgrounds!'))
  .catch(err => console.error('Error:', err));

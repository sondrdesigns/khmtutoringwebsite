const fs = require('fs');
const path = require('path');

const srcAssets = path.join(__dirname, '..', 'src', 'assets');
const publicImages = path.join(__dirname, '..', 'public', 'images');
const publicTutors = path.join(publicImages, 'tutors');

// Create directories if they don't exist
if (!fs.existsSync(publicImages)) {
  fs.mkdirSync(publicImages, { recursive: true });
}
if (!fs.existsSync(publicTutors)) {
  fs.mkdirSync(publicTutors, { recursive: true });
}

// Map of source files to destination files
const assetMappings = {
  'khm-tutoring-logo.png': 'images/khm-tutoring-logo.png',
  'khm-tutoring-hero-IMG_5743-scaled.jpeg': 'images/khm-tutoring-hero.jpeg',
  'khm-tutoring-tutor-kody-kim.png': 'images/tutors/kody-kim.png',
  'khm-tutoring-tutor-andrew-holzman.jpg': 'images/tutors/andrew-holzman.jpg',
  'khm-tutoring-tutor-noah-agena.png': 'images/tutors/noah-agena.png',
  'khm-tutoring-tutor-peter-greenhill.png': 'images/tutors/peter-greenhill.png',
  'khm-tutoring-tutor-blythe-yangson.png': 'images/tutors/blythe-yangson.png',
  'khm-tutoring-tutor-keenan-kim.png': 'images/tutors/keenan-kim.png',
  'khm-tutoring-tutor-colton-inamine.png': 'images/tutors/colton-inamine.png',
  'khm-tutoring-tutor-david-jones.png': 'images/tutors/david-jones.png',
  'khm-tutoring-tutor-alec-wong.png': 'images/tutors/alec-wong.png',
  'khm-tutoring-tutor-aizen-chung.png': 'images/tutors/aizen-chung.png',
  'khm-tutoring-tutor-shwe-win.png': 'images/tutors/shwe-win.png',
};

console.log('Setting up assets for Next.js...\n');

let copied = 0;
let skipped = 0;

for (const [srcFile, destPath] of Object.entries(assetMappings)) {
  const srcPath = path.join(srcAssets, srcFile);
  const fullDestPath = path.join(__dirname, '..', 'public', destPath);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, fullDestPath);
    console.log(`✓ Copied: ${srcFile} -> ${destPath}`);
    copied++;
  } else {
    console.log(`✗ Not found: ${srcFile}`);
    skipped++;
  }
}

console.log(`\nDone! Copied ${copied} files, skipped ${skipped} missing files.`);

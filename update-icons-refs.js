const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Replace all instances of icon references with the new format
const replaceIcons = html => {
  // Match both src/img/icons.svg and %ICONS% patterns
  return html.replace(
    /<use href="(?:src\/img\/icons\.svg|%ICONS%)#([^"]+)"><\/use>/g,
    '<use class="js-icon" data-icon="$1"></use>'
  );
};

html = replaceIcons(html);

fs.writeFileSync(htmlPath, html, 'utf-8');

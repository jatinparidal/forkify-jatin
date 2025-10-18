const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Replace all instances of src/img/icons.svg with icons.svg
html = html.replace(/src\/img\/icons\.svg/g, 'icons.svg');

fs.writeFileSync(htmlPath, html, 'utf-8');

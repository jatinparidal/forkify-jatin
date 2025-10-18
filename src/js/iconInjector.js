import icons from './src/js/views/icons.js';

// Get the HTML content
const html = document.documentElement.outerHTML;

// Replace all instances of %ICONS% with the actual icons URL
document.documentElement.innerHTML = html.replace(/%ICONS%/g, icons);

const icons = require('../../img/icons.svg');

// Export a function to get the correct path
export function getIconPath(iconName) {
  return `${icons}#${iconName}`;
}

// Function to update all icon paths in the DOM
export function updateIconPaths() {
  document.querySelectorAll('use[href*="icons.svg#"]').forEach(icon => {
    const href = icon.getAttribute('href');
    const iconId = href.split('#')[1];
    icon.setAttribute('href', getIconPath(iconId));
  });
}

// Initial icons object export
export default icons;

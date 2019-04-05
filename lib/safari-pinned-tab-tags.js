'use strict';

module.exports = safariPinnedTabTags;

const hasTarget = require('./has-target');

function safariPinnedTabTags(manifest, config) {
  const links = [];

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (hasTarget(icon, 'safari-pinned-tab')) {
        let color = '';
        if (icon.safariPinnedTabColor) {
          color = ` color="${icon.safariPinnedTabColor}"`;
        }

        links.push(`<link rel="mask-icon" href="${icon.src}"${color}>`);
      }
    }
  }

  return links;
}

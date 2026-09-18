/* env node */
/* eslint-disable no-console, import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const colormap = require('colormap');
const hexRgb = require('hex-rgb').default;

const FILE_COLORS = path.join(__dirname, '../src/chart-colors.json');

// https://www.learnui.design/tools/data-color-picker.html
const COLORMAP_RECHARTS = [
  '#4f92d5',
  '#838ee5',
  '#ba84e4',
  '#ea76d0',
  '#ff6cad',
  '#ff7180',
  '#ff874e',
  '#ffa600',
]
  .map(hexRgb)
  .map(({ red, green, blue }, index) => ({
    index,
    rgb: [red, green, blue],
  }));

const COLORMAP = COLORMAP_RECHARTS;

console.info('Generate colormap for', COLORMAP);

const colors = colormap({
  colormap: COLORMAP,
  nshades: COLORMAP.length + 1,
  format: 'rgbaString',
  alpha: 1,
});

fs.writeFile(FILE_COLORS, JSON.stringify(colors, null, 2), (err) => {
  if (err) {
    return console.error(err.message);
  }

  return console.log('Done');
});

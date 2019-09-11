/* env node */
/* eslint-disable no-console, import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const colormap = require('colormap');
const hexRgb = require('hex-rgb');

const FILE_COLORS = path.join(__dirname, '../src/components/chart/chart.colors.json');

const COLORMAP_RECHARTS = [
  '#8884d8',
  '#83a6ed',
  '#8dd1e1',
  '#82ca9d',
  '#a4de6c',
  '#d0ed57',
  '#ffc658',
].map(hexRgb).map(({ red, green, blue }, index) => ({
  index,
  rgb: [red, green, blue],
}));

const COLORMAP = COLORMAP_RECHARTS;

console.info('Generate colormap for', COLORMAP);

const colors = colormap({
  colormap: COLORMAP,
  nshades: COLORMAP.length + 1,
  format: 'rgbaString',
  alpha: 0.9,
});

fs.writeFile(FILE_COLORS, JSON.stringify(colors, null, 2), (err) => {
  if (err) {
    return console.error(err.message);
  }

  return console.log('Done');
});

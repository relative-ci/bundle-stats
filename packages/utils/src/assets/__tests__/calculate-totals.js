import { calculateTotals, calculateInitialTotals } from '../calculate-totals';

test('Calculate totals', () => {
  const actual = calculateTotals([
    {
      name: 'js/vendor.d249062c08abb6b31a03.min.js',
      size: 697975,
    },
    {
      name: 'js/vendor.d249062c08abb6b31a03.min.js.map',
      size: 1803921,
    },
    {
      name: 'js/app.14d1aceb439a1a303030.min.js',
      size: 300519,
    },
    {
      name: 'css/app.2f7387d779265a064174f6264c542d1a.css',
      size: 108464,
    },
    {
      name: 'img/logo.faf8ed88.svg',
      size: 2288,
    },
    {
      name: 'img/logo--d.3ad3ed88.svg',
      size: 2288,
    },
    {
      name: 'img/bg.8c360345.jpg',
      size: 24300,
    },
    {
      name: 'stats.json',
      size: 0,
    },
  ]);

  const expected = {
    totalSizeByTypeALL: {
      value: 1135834,
    },
    totalSizeByTypeJS: {
      value: 998494,
    },
    totalSizeByTypeCSS: {
      value: 108464,
    },
    totalSizeByTypeFONT: {
      value: 0,
    },
    totalSizeByTypeHTML: {
      value: 0,
    },
    totalSizeByTypeIMG: {
      value: 28876,
    },
    totalSizeByTypeMEDIA: {
      value: 0,
    },
    totalSizeByTypeOTHER: {
      value: 0,
    },
  };

  expect(actual).toEqual(expected);
});

test('Calculate initial totals', () => {
  const actual = calculateInitialTotals([
    {
      name: 'js/vendor.js',
      size: 100,
    },
    {
      name: 'js/vendor.js.map',
      size: 1000,
    },
    {
      name: 'js/app.js',
      size: 50,
    },
    {
      name: 'css/app.css',
      size: 10,
    },
    {
      name: 'css/app.css.map',
      size: 100,
    },
    {
      name: 'img/logo.svg',
      size: 10,
    },
    {
      name: 'stats.json',
      size: 0,
    },
  ], [
    {
      name: 'vendor',
      initial: true,
      files: [
        'js/vendor.js',
        'js/vendor.js.map',
      ],
    },
    {
      name: 'app',
      initial: true,
      files: [
        'js/app.js',
        'js/app.js.map',
        'css/app.css',
        'css/app.css.map',
      ],
    },
    {
      name: 'chunk-a',
      initial: false,
      files: [
        'js/chunk-a.js',
        'js/chunk-a.js.map',
        'js/chunk-a.css',
        'js/chunk-a.css.map',
      ],
    },
  ]);

  const expected = {
    totalInitialSizeJS: {
      value: 150,
    },
    totalInitialSizeCSS: {
      value: 10,
    },
  };

  expect(actual).toEqual(expected);
});

import { calculateTotals } from '../calculate-totals';

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

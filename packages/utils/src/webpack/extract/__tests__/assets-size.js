import { extractAssetsSize } from '../assets-size';

describe('Webpack/extracts/extractAssetsSize', () => {
  test('should return empty', () => {
    const actual = extractAssetsSize(null, { metrics: { assets: {} } });
    expect(actual).toEqual({
      metrics: {
        totalSizeByTypeALL: {
          value: 0,
        },
        totalInitialSizeJS: {
          value: 0,
        },
        totalInitialSizeCSS: {
          value: 0,
        },
        sizes: {
          totalSizeByTypeCSS: {
            value: 0,
          },
          totalSizeByTypeFONT: {
            value: 0,
          },
          totalSizeByTypeHTML: {
            value: 0,
          },
          totalSizeByTypeIMG: {
            value: 0,
          },
          totalSizeByTypeJS: {
            value: 0,
          },
          totalSizeByTypeMEDIA: {
            value: 0,
          },
          totalSizeByTypeOTHER: {
            value: 0,
          },
        },
      },
    });
  });

  test('should return size metrics', () => {
    const actual = extractAssetsSize(null, {
      metrics: {
        assets: {
          'js/vendor.min.js': {
            name: 'js/vendor.d249062c08abb6b31a03.min.js',
            value: 697975,
            isInitial: true,
          },
          'js/app.min.js': {
            name: 'js/app.14d1aceb439a1a303030.min.js',
            value: 300519,
          },
          'css/app.css': {
            name: 'css/app.2f7387d779265a064174f6264c542d1a.css',
            value: 108464,
            isInitial: true,
          },
          'img/logo.svg': {
            name: 'img/logo.faf8ed88.svg',
            value: 2288,
          },
          'img/logo--d.svg': {
            name: 'img/logo--d.3ad3ed88.svg',
            value: 2288,
          },
          'img/bg.jpg': {
            name: 'img/bg.8c360345.jpg',
            value: 24300,
          },
          'stats.json': {
            name: 'stats.json',
            value: 0,
          },
        },
      },
    });

    const expected = {
      metrics: {
        totalSizeByTypeALL: {
          value: 1135834,
        },
        totalInitialSizeJS: {
          value: 697975,
        },
        totalInitialSizeCSS: {
          value: 108464,
        },
        sizes: {
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
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});

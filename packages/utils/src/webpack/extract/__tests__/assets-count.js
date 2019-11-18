import { extractAssetsCount } from '../assets-count';

describe('Webpack/extract/extractAssetsCount', () => {
  test('should return empty', () => {
    const actual = extractAssetsCount({ assets: {} });
    expect(actual).toEqual({ stats: { assetCount: { value: 0 } } });
  });

  test('should return size metrics', () => {
    const actual = extractAssetsCount({
      assets: {
        'js/vendor.min.js': {
          name: 'js/vendor.d249062c08abb6b31a03.min.js',
          value: 697975,
          isInitial: true,
          isChunk: true,
        },
        'js/app.min.js': {
          name: 'js/app.14d1aceb439a1a303030.min.js',
          value: 300519,
          isChunk: true,
        },
        'css/app.css': {
          name: 'css/app.2f7387d779265a064174f6264c542d1a.css',
          value: 108464,
          isInitial: true,
          isChunk: true,
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
    });

    expect(actual).toEqual({ stats: { assetCount: { value: 7 } } });
  });
});

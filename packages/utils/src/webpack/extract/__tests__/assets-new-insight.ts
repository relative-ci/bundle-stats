import { extractAssetsNewInsight } from '../assets-new-insight';

describe('Webpack/extracts/extractAssetsNewInsight', () => {
  test('should return null when there is no baseline', () => {
    const actual = extractAssetsNewInsight(null, {
      metrics: {
        assets: {
          './main.js': {
            size: 100,
          },
        },
      },
    });

    expect(actual).toEqual(null);
  });

  test('should return null when there are no new assets', () => {
    const actual = extractAssetsNewInsight(
      null,
      {
        metrics: {
          assets: {
            './main.js': {
              size: 100,
            },
          },
        },
      },
      {
        metrics: {
          webpack: {
            assets: {
              './main.js': {
                size: 100,
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual(null);
  });

  test('should return insights when there is a new assets', () => {
    const actual = extractAssetsNewInsight(
      null,
      {
        metrics: {
          assets: {
            './main.js': {
              size: 100,
            },
            './main.css': {
              size: 100,
            },
          },
        },
      },
      {
        metrics: {
          webpack: {
            assets: {
              './main.js': {
                size: 100,
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual({
      insights: {
        newAssets: {
          type: 'warning',
          data: {
            text: 'Bundle introduced one new asset',
            assets: ['./main.css'],
          },
        },
      },
    });
  });

  test('should return insights when there are new packages', () => {
    const actual = extractAssetsNewInsight(
      null,
      {
        metrics: {
          assets: {
            './main.js': {
              size: 100,
            },
            './main.css': {
              size: 100,
            },
            './logo.png': {
              size: 100,
            },
          },
        },
      },
      {
        metrics: {
          webpack: {
            assets: {
              './main.js': {
                size: 100,
              },
            },
          },
        },
      } as any,
    );

    expect(actual).toEqual({
      insights: {
        newAssets: {
          type: 'warning',
          data: {
            text: 'Bundle introduced 2 new assets',
            assets: ['./main.css', './logo.png'],
          },
        },
      },
    });
  });
});

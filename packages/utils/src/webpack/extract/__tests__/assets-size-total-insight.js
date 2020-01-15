import { extractAssetsSizeTotalInsight } from '../assets-size-total-insight';

describe('Webpack/extracts/extractAssetsSizeTotalInsight', () => {
  test('should return insight', () => {
    const actual = extractAssetsSizeTotalInsight(
      null,
      { metrics: { totalSizeByTypeALL: { value: 10000 } } },
    );

    expect(actual).toEqual({
      insights: {
        assetsSizeTotal: {
          data: {
            md: 'Bundle size increased with *+9.77KB* (*+100%*).',
            text: 'Bundle size increased with +9.77KB (+100%).',
          },
          type: 'INFO',
        },
      },
    });
  });

  test('should return insight with baseline', () => {
    const actual = extractAssetsSizeTotalInsight(
      null,
      { metrics: { totalSizeByTypeALL: { value: 10000 } } },
      { metrics: { webpack: { totalSizeByTypeALL: { value: 20000 } } } },
    );

    expect(actual).toEqual({
      insights: {
        assetsSizeTotal: {
          data: {
            md: 'Bundle size decreased with *-9.77KB* (*-50%*).',
            text: 'Bundle size decreased with -9.77KB (-50%).',
          },
          type: 'INFO',
        },
      },
    });
  });
});

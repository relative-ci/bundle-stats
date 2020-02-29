import { extractCategoryScores } from '../category-scores';

describe('lighthouse / extract / extractCategoryScores', () => {
  test('should extract category scores', () => {
    const actual = extractCategoryScores({
      categories: {
        performance: {
          score: 0.83,
        },
        accessibility: {
          score: 0.8,
        },
        'best-practices': {
          score: 0.93,
        },
        seo: {
          score: 0.83,
        },
        pwa: {
          score: 0.67,
        },
      },
    });

    expect(actual).toEqual({
      metrics: {
        performanceScore: {
          value: 83,
        },
        accessibilityScore: {
          value: 80,
        },
        bestPracticesScore: {
          value: 93,
        },
        seoScore: {
          value: 83,
        },
        pwaScore: {
          value: 67,
        },
      },
    });
  });
});

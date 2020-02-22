import { extractScoreCategoryScores } from '../score-category-scores';

describe('lighthouse / extract / extractScoreCategoryScores', () => {
  test('should extract category scores', () => {
    const actual = extractScoreCategoryScores({}, {
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

    expect(actual).toEqual({
      metrics: {
        score: {
          value: 81.2,
        },
      },
    });
  });
});

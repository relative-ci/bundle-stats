import { extractAudits } from '../audits';

describe('lighthouse / extract / extractAudits', () => {
  test('should extract audit values', () => {
    const actual = extractAudits({
      audits: {
        'speed-index': {
          numericValue: 3448.8160000000003,
        },
        'first-meaningful-paint': {
          numericValue: 3448.8160000000003,
        },
        'time-to-first-byte': {
          numericValue: 25.922,
        },
        'first-cpu-idle': {
          numericValue: 3748.8160000000003,
        },
        'total-byte-weight': {
          numericValue: 444148,
        },
        'dom-size': {
          numericValue: 320,
        },
      },
    });

    expect(actual).toEqual({
      metrics: {
        speedIndex: {
          value: 3448.8160000000003,
        },
        firstMeaningfulPaint: {
          value: 3448.8160000000003,
        },
        timeToFirstByte: {
          value: 25.922,
        },
        firstInteractive: {
          value: 3748.8160000000003,
        },
        totalByteWeight: {
          value: 444148,
        },
        domSize: {
          value: 320,
        },
      },
    });
  });
});

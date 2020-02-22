import { filter } from '../filter';

describe('lightouse / filter', () => {
  test('should filter lighthouse stats', () => {
    const actual = filter({
      userAgent: 'Mozilla/5.0',
      environment: { },
      lighthouseVersion: '5.1.0',
      fetchTime: '2019-08-21T07:38:35.619Z',
      requestedUrl: 'http://localhost:5000/',
      categories: {
        performance: {
          title: 'Performance',
          auditRefs: [],
          id: 'performance',
          score: 0.83,
        },
        accessibility: {
          title: 'Accessibility',
          auditRefs: [],
          id: 'accessibility',
          score: 0.8,
        },
        'best-practices': {
          title: 'Best Practices',
          auditRefs: [],
          id: 'best-practices',
          score: 0.93,
        },
        seo: {
          title: 'SEO',
          auditRefs: [],
          id: 'seo',
          score: 0.83,
        },
        pwa: {
          title: 'Progressive Web App',
          auditRefs: [],
          id: 'pwa',
          score: 0.67,
        },
      },
      audits: {
        'speed-index': {
          title: 'Speed Index',
          score: 0.89,
          scoreDisplayMode: 'numeric',
          numericValue: 3448.8160000000003,
          displayValue: '3.4 s',
        },
        'first-meaningful-paint': {
          id: 'first-meaningful-paint',
          score: 0.64,
          scoreDisplayMode: 'numeric',
          numericValue: 3448.8160000000003,
          displayValue: '3.4 s',
        },
        'time-to-first-byte': {
          id: 'time-to-first-byte',
          score: 1,
          scoreDisplayMode: 'binary',
          numericValue: 25.922,
          displayValue: 'Root document took 30 ms',
          details: {
            type: 'opportunity',
            overallSavingsMs: -574.078,
            headings: [],
            items: [],
          },
        },
        'first-cpu-idle': {
          id: 'first-cpu-idle',
          score: 0.88,
          scoreDisplayMode: 'numeric',
          numericValue: 3748.8160000000003,
          displayValue: '3.7 s',
        },
        'total-byte-weight': {
          id: 'total-byte-weight',
          score: 1,
          scoreDisplayMode: 'numeric',
          numericValue: 444148,
          displayValue: 'Total size was 434 KB',
        },
        'dom-size': {
          id: 'dom-size',
          score: 1,
          scoreDisplayMode: 'numeric',
          numericValue: 320,
          displayValue: '320 elements',
          details: {},
        },
      },
    });

    expect(actual).toEqual({
      lighthouseVersion: '5.1.0',
      fetchTime: '2019-08-21T07:38:35.619Z',
      requestedUrl: 'http://localhost:5000/',
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
      audits: {
        'speed-index': {
          score: 0.89,
          numericValue: 3448.8160000000003,
        },
        'first-meaningful-paint': {
          score: 0.64,
          numericValue: 3448.8160000000003,
        },
        'time-to-first-byte': {
          score: 1,
          numericValue: 25.922,
        },
        'first-cpu-idle': {
          score: 0.88,
          numericValue: 3748.8160000000003,
        },
        'total-byte-weight': {
          score: 1,
          numericValue: 444148,
        },
        'dom-size': {
          score: 1,
          numericValue: 320,
        },
      },
    });
  });
});

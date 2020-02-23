import { extract } from '../extract';

describe('browsertime / extract', () => {
  test('should extract metrics', () => {
    const actual = extract({
      info: {
        browsertime: {
          version: '5.7.3',
        },
        timestamp: '2019-08-21T09:39:15+02:00',
        url: 'http://localhost:5000',
      },
      statistics: {
        timings: {
          firstPaint: {
            median: 184,
          },
          fullyLoaded: {
            median: 358,
          },
          pageTimings: {
            backEndTime: {
              median: 44,
            },
            domContentLoadedTime: {
              median: 269,
            },
            domInteractiveTime: {
              median: 268,
            },
            domainLookupTime: {
              median: 0,
            },
            frontEndTime: {
              median: 241,
            },
            pageDownloadTime: {
              median: 2,
            },
            pageLoadTime: {
              median: 288,
            },
            redirectionTime: {
              median: 0,
            },
            serverConnectionTime: {
              median: 0,
            },
            serverResponseTime: {
              median: 22,
            },
          },
          paintTiming: {
            'first-contentful-paint': {
              median: 184,
            },
          },
          rumSpeedIndex: {
            median: 184,
          },
        },
        visualMetrics: {
          FirstVisualChange: {},
          LastVisualChange: {},
          PerceptualSpeedIndex: {},
          SpeedIndex: {},
          VisualComplete85: {},
          VisualComplete95: {},
          VisualComplete99: {},
        },
      },
    });
    expect(actual).toEqual({
      metrics: {
        firstPaint: { value: 184 },
        fullyLoaded: { value: 358 },
        backEndTime: { value: 44 },
        domContentLoadedTime: { value: 269 },
        domInteractiveTime: { value: 268 },
        domainLookupTime: { value: 0 },
        frontEndTime: { value: 241 },
        pageDownloadTime: { value: 2 },
        pageLoadTime: { value: 288 },
        redirectionTime: { value: 0 },
        serverConnectionTime: { value: 0 },
        serverResponseTime: { value: 22 },
        firstContentfulPaint: { value: 184 },
        rumSpeedIndex: { value: 184 },
        firstVisualChange: { value: 0 },
        lastVisualChange: { value: 0 },
        perceptualSpeedIndex: { value: 0 },
        speedIndex: { value: 0 },
        visualComplete85: { value: 0 },
        visualComplete95: { value: 0 },
        visualComplete99: { value: 0 },
      },
    });
  });
});

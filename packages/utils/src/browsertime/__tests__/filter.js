import { filter } from '../filter';

describe('browsertime / filter', () => {
  test('should filter data', () => {
    const actual = filter([
      {
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
              max: 198,
              median: 184,
              min: 177,
            },
            fullyLoaded: {
              max: 378,
              median: 358,
              min: 317,
            },
            pageTimings: {
              backEndTime: {
                max: 44,
                median: 44,
                min: 32,
              },
              domContentLoadedTime: {
                max: 296,
                median: 269,
                min: 251,
              },
              domInteractiveTime: {
                max: 296,
                median: 268,
                min: 251,
              },
              domainLookupTime: {
                max: 0,
                median: 0,
                min: 0,
              },
              frontEndTime: {
                max: 265,
                median: 241,
                min: 241,
              },
              pageDownloadTime: {
                max: 3,
                median: 2,
                min: 2,
              },
              pageLoadTime: {
                max: 310,
                median: 288,
                min: 275,
              },
              redirectionTime: {
                max: 0,
                median: 0,
                min: 0,
              },
              serverConnectionTime: {
                max: 0,
                median: 0,
                min: 0,
              },
              serverResponseTime: {
                max: 28,
                median: 22,
                min: 22,
              },
            },
            paintTiming: {
              'first-contentful-paint': {
                max: 198,
                mdev: 5.0406,
                mean: 186,
                median: 184,
              },
            },
            rumSpeedIndex: {
              max: 198,
              mdev: 5.0406,
              mean: 186,
              median: 184,
            },
          },
          visualMetrics: {},
        },
      },
    ]);

    expect(actual).toEqual({
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
  });
});

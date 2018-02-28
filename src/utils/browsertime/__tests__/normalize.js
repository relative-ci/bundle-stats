/* env jest/global */
import fixtures from '../../../../fixtures/browsertime.json';
import normalize from '../normalize';

test('Browsertime normalize', () => {
  const actual = normalize([{
    res: fixtures,
  }]);

  const expected = [{
    label: 'Run #0',
    data: {
      'browsertime.firstPaint': {
        value: 317,
      },
      'browsertime.fullyLoaded': {
        value: 2695,
      },
      'browsertime.backEndTime': {
        value: 274,
      },
      'browsertime.domContentLoadedTime': {
        value: 811,
      },
      'browsertime.domInteractiveTime': {
        value: 811,
      },
      'browsertime.domainLookupTime': {
        value: 3,
      },
      'browsertime.frontEndTime': {
        value: 413,
      },
      'browsertime.pageDownloadTime': {
        value: 98,
      },
      'browsertime.pageLoadTime': {
        value: 819,
      },
      'browsertime.redirectionTime': {
        value: 2,
      },
      'browsertime.serverConnectionTime': {
        value: 108,
      },
      'browsertime.serverResponseTime': {
        value: 257,
      },
      'browsertime.firstContentfulPaint': {
        value: 317,
      },
      'browsertime.rumSpeedIndex': {
        value: 471,
      },
      'browsertime.firstVisualChange': {
        value: 1200,
      },
      'browsertime.lastVisualChange': {
        value: 2933,
      },
      'browsertime.perceptualSpeedIndex': {
        value: 1433,
      },
      'browsertime.speedIndex': {
        value: 1388,
      },
      'browsertime.visualComplete85': {
        value: 1800,
      },
      'browsertime.visualComplete95': {
        value: 1900,
      },
      'browsertime.visualComplete99': {
        value: 2800,
      },
    },
  }];

  expect(actual).toEqual(expected);
});

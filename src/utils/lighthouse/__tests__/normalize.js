/* env jest/global */
import fixtures from '../../../../fixtures/lighthouse.json';
import normalize from '../normalize';

test('Lighthouse normalize', () => {
  const actual = normalize([{
    res: fixtures,
  }]);

  const expected = [{
    label: 'Run #0',
    meta: {
      timestamp: '2017-11-13T10:35:15.168Z',
      url: 'http://localhost:8080/',
    },
    data: {
      'lighthouse.score': {
        value: 69,
      },
      'lighthouse.speedIndex': {
        value: 7316,
      },
      'lighthouse.firstMeaningfulPain': {
        value: 4204.9,
      },
      'lighthouse.timeToFirstByte': {
        value: 570.9429999997159,
      },
      'lighthouse.firstInteractive': {
        value: 5045.693,
      },
      'lighthouse.totalByteWeight': {
        value: 448879,
      },
      'lighthouse.domSize': {
        value: 347,
      },
    },
  }];

  expect(actual).toEqual(expected);
});

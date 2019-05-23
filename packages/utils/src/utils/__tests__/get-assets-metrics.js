import { getAssetsMetrics } from '../get-assets-metrics';

test('get assets metrics', () => {
  const actual = getAssetsMetrics([
    {
      name: 'js/main.bc2211.js',
      size: 100,
    },
    {
      name: 'css/app.22929a.css',
      size: 100,
    },
    {
      name: 'css/app.22929a.css.map',
      size: 100,
    },
  ]);

  const expected = {
    'js/main.js': {
      name: 'js/main.bc2211.js',
      value: 100,
    },
    'css/app.css': {
      name: 'css/app.22929a.css',
      value: 100,
    },
  };

  expect(actual).toEqual(expected);
});

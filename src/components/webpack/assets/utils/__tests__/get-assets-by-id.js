/* global test */
import getAssetsById from '../get-assets-by-id';
import fixtures from '../../../../../../fixtures/webpack-entries';

test('get assets by id', () => {
  const actual = getAssetsById(fixtures[0].data.assets);
  const expected = {
    'js/vendor.min.js': {
      name: 'js/vendor.d249062c08abb6b31a03.min.js',
      value: 697975,
    },
    'js/app.min.js': {
      name: 'js/app.14d1aceb439a1a303030.min.js',
      value: 300519,
    },
    'css/app.css': {
      name: 'css/app.2f7387d779265a064174f6264c542d1a.css',
      value: 108464,
    },
    'img/logo.svg': {
      name: 'img/logo.faf8ed88.svg',
      value: 2288,
    },
    'img/logo--d.svg': {
      name: 'img/logo--d.3ad3ed88.svg',
      value: 2288,
    },
    'img/bg.jpg': {
      name: 'img/bg.8c360345.jpg',
      value: 24300,
    },
    'stats.json': {
      name: 'stats.json',
      value: 0,
    },
  };

  expect(actual).toEqual(expected);
});

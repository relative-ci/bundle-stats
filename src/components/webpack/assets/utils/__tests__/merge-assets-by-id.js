/* env jest/globals */
import mergeAssetsById from '../merge-assets-by-id';

test('Merge assets by id', () => {
  const actual = mergeAssetsById([
    {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'd',
    },
    {
      1: 'aa',
      2: 'bb',
      3: 'cc',
      5: 'ee',
      7: 'gg',
    },
    {
      1: 'aaa',
      2: 'bbb',
      3: 'ccc',
      6: 'fff',
      7: 'ggg',
    },
  ]);

  const expected = {
    1: {
      entries: ['a', 'aa', 'aaa'],
    },
    2: {
      entries: ['b', 'bb', 'bbb'],
    },
    3: {
      entries: ['c', 'cc', 'ccc'],
    },
    4: {
      entries: ['d', null, null],
    },
    5: {
      entries: [null, 'ee', null],
    },
    6: {
      entries: [null, null, 'fff'],
    },
    7: {
      entries: [null, 'gg', 'ggg'],
    },
  };

  expect(actual).toEqual(expected);
});

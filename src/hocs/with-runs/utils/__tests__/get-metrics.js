/* env jest/globals */

import getMetrics from '../get-metrics';

test('Extract metrics', () => {
  const actual = getMetrics(
    {
      a: {
        b: {
          c: 1,
        },
      },
      b: 2,
    },
    {
      testA: 'a.b.c',
      testB: 'b',
      testC: obj => obj.b + obj.a.b.c,
    },
  );

  const expected = {
    testA: {
      value: 1,
    },
    testB: {
      value: 2,
    },
    testC: {
      value: 3,
    },
  };

  expect(actual).toEqual(expected);
});

/* env jest/globals */

import resolveMetricChanged from '../resolve-metric-changed';

test('Resolve metric changes', () => {
  const expected = resolveMetricChanged([
    {
      runs: [
        { value: 10 },
        { value: 20 },
        { value: 10 },
      ],
    },
    {
      runs: [
        { value: 10 },
        { value: 10 },
        { value: 10 },
      ],
    },
  ]);

  expect(expected).toEqual([
    {
      changed: true,
      runs: [
        { value: 10 },
        { value: 20 },
        { value: 10 },
      ],
    },
    {
      changed: false,
      runs: [
        { value: 10 },
        { value: 10 },
        { value: 10 },
      ],
    },
  ]);
});

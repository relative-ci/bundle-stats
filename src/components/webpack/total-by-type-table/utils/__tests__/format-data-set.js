/* env jest/globals */
import formatDataSet from '../format-data-set';

test('Process total by type', () => {
  const actual = formatDataSet({
    totalSize: {
      runs: [2056, 1781],
    },
    totalSizeByType_other: {
      runs: [null, 0],
    },
  });

  const expected = [
    {
      key: 'totalSize',
      runs: [
        {
          value: 2056,
        },
        {
          value: 1781,
        },
      ],
    },
    {
      key: 'totalSizeByType_other',
      runs: [
        {
          value: 0,
        },
        {
          value: 0,
        },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});

import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { addRowData } from '../add-row-data';

describe('report / addRowData', () => {
  test('should add data', () => {
    const rows = [
      {
        key: 'webpack.totalSizeByTypeALL',
        runs: [
          {
            value: 100,
          },
          {
            value: 110,
          },
        ],
      },
      {
        key: 'webpack.duplicatePackagesCount',
        runs: [
          {
            value: 10,
          },
          null,
        ],
      },
      {
        key: 'webpack.mdoulesCount',
        runs: [
          {
            value: 100,
          },
          {
            value: 100,
          },
        ],
      },
      {
        key: 'webpack.cacheInvalidation',
        runs: [
          null,
          {
            value: 10,
          },
        ],
      },
    ];

    const actual = rows.map((row) => addRowData(row as any));

    expect(actual).toMatchSnapshot();
  });

  test('should add data with metric type', () => {
    const rows = [
      {
        key: 'metric1',
        runs: [
          {
            value: 100,
          },
          {
            value: 110,
          },
        ],
      },
      {
        key: 'metric2',
        runs: [
          {
            value: 10,
          },
          null,
        ],
      },
      {
        key: 'metric3',
        runs: [
          null,
          {
            value: 10,
          },
        ],
      },
      {
        key: 'metric4',
        runs: [
          {
            value: 100,
          },
          {
            value: 100,
          },
        ],
      },
    ];

    const actual = rows.map((row) => addRowData(row, METRIC_TYPE_FILE_SIZE));

    expect(actual).toMatchSnapshot();
  });
});

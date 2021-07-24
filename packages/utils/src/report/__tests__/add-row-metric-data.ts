import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { getAddRowMetricData } from '../add-row-metric-data';

describe('report / addRowMetricData', () => {
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

    const addRowMetricData = getAddRowMetricData();
    const actual = rows.map(addRowMetricData);

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

    const addRowMetricData = getAddRowMetricData(METRIC_TYPE_FILE_SIZE);
    const actual = rows.map(addRowMetricData);

    expect(actual).toMatchSnapshot();
  });
});

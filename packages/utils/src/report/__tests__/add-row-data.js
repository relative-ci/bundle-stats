import { addRowData } from '../add-row-data';

describe('report / addRowData', () => {
  test('should add data', () => {
    const actual = addRowData([
      {
        key: 'metric1',
        type: 'METRIC_TYPE_DURATION',
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
        type: 'METRIC_TYPE_NUMBER',
        runs: [
          {
            value: 10,
          },
          null,
        ],
      },
      {
        key: 'metric4',
        type: 'METRIC_TYPE_SCORE',
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
        key: 'metric3',
        type: 'METRIC_TYPE_FILE_SIZE',
        runs: [
          null,
          {
            value: 10,
          },
        ],
      },
    ]);

    expect(actual).toMatchSnapshot();
  });
});

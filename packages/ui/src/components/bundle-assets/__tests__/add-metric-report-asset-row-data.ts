import { addMetricReportAssetRowData } from '../bundle-assets.utils';

describe('BundleAssets / addMetricReportAssetRowData', () => {
  test('should add data to a single run', () => {
    expect(
      addMetricReportAssetRowData({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toEqual({
      key: 'assets/main.js',
      label: 'assets/main.js',
      biggerIsBetter: false,
      changed: false,
      fileType: 'JS',
      isAsset: false,
      isChunk: true,
      isEntry: true,
      isInitial: true,
      isNotPredictive: false,
      runs: [
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: true,
        },
      ],
    });
  });

  test('should add data when baseline run is null', () => {
    expect(
      addMetricReportAssetRowData({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
          null,
        ],
      }),
    ).toEqual({
      key: 'assets/main.js',
      label: 'assets/main.js',
      biggerIsBetter: false,
      changed: false,
      fileType: 'JS',
      isAsset: false,
      isChunk: true,
      isEntry: true,
      isInitial: true,
      isNotPredictive: false,
      runs: [
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: true,
        },
        null,
      ],
    });
  });

  test('should add data when current run is null', () => {
    expect(
      addMetricReportAssetRowData({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: true,
        runs: [
          null,
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toEqual({
      key: 'assets/main.js',
      label: 'assets/main.js',
      biggerIsBetter: false,
      changed: true,
      fileType: 'JS',
      isAsset: false,
      isChunk: true,
      isEntry: true,
      isInitial: true,
      isNotPredictive: false,
      runs: [
        null,
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: true,
        },
      ],
    });
  });

  test('should add data when baseline is not null', () => {
    expect(
      addMetricReportAssetRowData({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toEqual({
      key: 'assets/main.js',
      label: 'assets/main.js',
      biggerIsBetter: false,
      changed: false,
      fileType: 'JS',
      isAsset: false,
      isChunk: true,
      isEntry: true,
      isInitial: true,
      isNotPredictive: false,
      runs: [
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: true,
        },
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: true,
        },
      ],
    });
  });

  test('should flag as changed when only meta changes', () => {
    expect(
      addMetricReportAssetRowData({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: false,
          },
          {
            name: 'assets/main.abc123.js',
            value: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toEqual({
      key: 'assets/main.js',
      label: 'assets/main.js',
      biggerIsBetter: false,
      changed: true,
      fileType: 'JS',
      isAsset: false,
      isChunk: true,
      isEntry: true,
      isInitial: 'removed',
      isNotPredictive: false,
      runs: [
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: false,
        },
        {
          name: 'assets/main.abc123.js',
          value: 1024 * 10,
          isEntry: true,
          isChunk: true,
          isInitial: true,
        },
      ],
    });
  });
});

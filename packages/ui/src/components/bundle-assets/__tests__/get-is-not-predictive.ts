import { getIsNotPredictive } from '../bundle-assets.utils';

describe('BundleAssets / getIsNotPredictive', () => {
  test('should return false by default', () => {
    expect(
      getIsNotPredictive({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toBeFalsy();

    expect(
      getIsNotPredictive({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
          null,
        ],
      }),
    ).toBeFalsy();

    expect(
      getIsNotPredictive({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toBeFalsy();

    expect(
      getIsNotPredictive({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.def456.js',
            size: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 11,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toBeFalsy();
  });

  test('should return true when not predictive', () => {
    expect(
      getIsNotPredictive({
        key: 'assets/main.js',
        label: 'assets/main.js',
        biggerIsBetter: false,
        changed: false,
        runs: [
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 10,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
          {
            name: 'assets/main.abc123.js',
            size: 1024 * 11,
            isEntry: true,
            isChunk: true,
            isInitial: true,
          },
        ],
      }),
    ).toBeTruthy();
  });
});

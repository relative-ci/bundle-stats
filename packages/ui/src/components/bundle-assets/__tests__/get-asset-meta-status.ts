import { getAssetMetaStatus } from '../bundle-assets.utils';

describe('BundleAssets / getAssetMetaStatus', () => {
  test('should return true when all runs meta values are truthy', () => {
    expect(getAssetMetaStatus([true])).toBeTruthy();
    expect(getAssetMetaStatus([true, true])).toBeTruthy();
  });

  test('should return false when all runs meta values are falsy', () => {
    expect(getAssetMetaStatus([false])).toBeFalsy();
    expect(getAssetMetaStatus([false, false])).toBeFalsy();
  });

  test('should return "added" when current is truthy and baseline is falsy', () => {
    expect(getAssetMetaStatus([true, false])).toEqual('added');
  });

  test('should return "removed" when current is false and baseline is truthy', () => {
    expect(getAssetMetaStatus([false, true])).toEqual('removed');
  });
});

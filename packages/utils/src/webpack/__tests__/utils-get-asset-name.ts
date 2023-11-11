import { getAssetName } from '../utils';

describe('Webpack/utils/getAssetName', () => {
  test('should return empty when missing', () => {
    expect(getAssetName()).toBe('');
    expect(getAssetName(null)).toBe('');
  });

  test('should remove the hex hash when the separator is "."', () => {
    expect(getAssetName('main.d2490.js')).toBe('main.js');
    expect(getAssetName('main.d249062c08abb6b31a03.js')).toBe('main.js');
    expect(getAssetName('main.d249062c08abb6b31a03.min.js')).toBe('main.min.js');
    expect(getAssetName('0.d249062c08abb6b31a03.js')).toBe('0.js');
    expect(getAssetName('assets/js/main.d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
    expect(getAssetName('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
  });

  test('should remove the hex hash when the separator is "-"', () => {
    expect(getAssetName('main-d2490.js')).toBe('main.js');
    expect(getAssetName('main-d249062c08abb6b31a03.js')).toBe('main.js');
    expect(getAssetName('main-d249062c08abb6b31a03.min.js')).toBe('main.min.js');
    expect(getAssetName('0-d249062c08abb6b31a03.js')).toBe('0.js');
    expect(getAssetName('assets/js/main-d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
    expect(getAssetName('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
  });

  test('should remove the hex hash when it has the minimum length', () => {
    expect(getAssetName('login-chunk.d2490.js')).toBe('login-chunk.js');
    expect(getAssetName('web-app/login-chunk.d2490.js')).toBe('web-app/login-chunk.js');
    expect(getAssetName('login-abcde.d2490.js')).toBe('login-abcde.js');
    expect(getAssetName('login-abcde-chunk.js')).toBe('login-abcde-chunk.js');
  });

  test('should remove the hex hash when it is provided as a slug', () => {
    expect(getAssetName('static/d2490/pages/app.js')).toBe('static/pages/app.js');
  });

  test('should not remove hex hash when it is provided as filename', () => {
    expect(getAssetName('static/chunks/d249062c08abb6b31a03.js')).toBe(
      'static/chunks/d249062c08abb6b31a03.js',
    );
  });
});

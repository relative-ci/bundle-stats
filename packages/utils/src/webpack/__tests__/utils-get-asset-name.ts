import { getAssetName } from '../utils';

describe('Webpack/utils/getAssetName', () => {
  test('should return empty when missing', () => {
    expect(getAssetName()).toBe('');
    expect(getAssetName(null)).toBe('');
  });

  describe('hex hash', () => {
    test('should remove the hash when the separator is "."', () => {
      expect(getAssetName('main.d2490.js')).toBe('main.js');
      expect(getAssetName('main.d249062c08abb6b31a03.js')).toBe('main.js');
      expect(getAssetName('main.d249062c08abb6b31a03.min.js')).toBe('main.min.js');
      expect(getAssetName('0.d249062c08abb6b31a03.js')).toBe('0.js');
      expect(getAssetName('assets/js/main.d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
      expect(getAssetName('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
    });

    test('should remove the hash when the separator is "-"', () => {
      expect(getAssetName('main-d2490.js')).toBe('main.js');
      expect(getAssetName('main-d249062c08abb6b31a03.js')).toBe('main.js');
      expect(getAssetName('main-d249062c08abb6b31a03.min.js')).toBe('main.min.js');
      expect(getAssetName('0-d249062c08abb6b31a03.js')).toBe('0.js');
      expect(getAssetName('assets/js/main-d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
      expect(getAssetName('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
    });

    test('should remove the hash when the separator is "_"', () => {
      expect(getAssetName('main_d2490.js')).toBe('main.js');
      expect(getAssetName('main_d249062c08abb6b31a03.js')).toBe('main.js');
      expect(getAssetName('main_d249062c08abb6b31a03.min.js')).toBe('main.min.js');
      expect(getAssetName('0_d249062c08abb6b31a03.js')).toBe('0.js');
      expect(getAssetName('assets/js/main_d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
      expect(getAssetName('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
    });

    test('should remove the hash when the separator is "~"', () => {
      expect(getAssetName('main~d2490.js')).toBe('main.js');
      expect(getAssetName('main~d249062c08abb6b31a03.js')).toBe('main.js');
      expect(getAssetName('main~d249062c08abb6b31a03.min.js')).toBe('main.min.js');
      expect(getAssetName('0~d249062c08abb6b31a03.js')).toBe('0.js');
      expect(getAssetName('assets/js/main~d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
      expect(getAssetName('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
    });

    test('should remove the hash when it has the minimum length', () => {
      expect(getAssetName('login-chunk.d2490.js')).toBe('login-chunk.js');
      expect(getAssetName('web-app/login-chunk.d2490.js')).toBe('web-app/login-chunk.js');
      expect(getAssetName('login-abcde.d2490.js')).toBe('login-abcde.js');
      expect(getAssetName('login-abcde-chunk.js')).toBe('login-abcde-chunk.js');
    });

    test('should remove the hash when it is provided as a slug inside a static folder', () => {
      expect(getAssetName('static/d2490/pages/app.js')).toBe('static/pages/app.js');
    });

    test('should remove base64 hash when matching next manifests', () => {
      expect(getAssetName('static/JyGdYu5ApqW15bVPkT0MK/_buildManifest.js')).toBe(
        'static/_buildManifest.js',
      );
      expect(getAssetName('static/gzzXRvk7zbHlZFnyz0PfQ/_ssgManifest.js')).toBe(
        'static/_ssgManifest.js',
      );
    });

    test('should not remove hash when it is provided as filename', () => {
      expect(getAssetName('static/chunks/d249062c08abb6b31a03.js')).toBe(
        'static/chunks/d249062c08abb6b31a03.js',
      );
    });
  });

  describe('base64url hash', () => {
    test('should remove the hash when the separator is "."', () => {
      expect(getAssetName('main.UqaNYmNV1BY.js')).toBe('main.js');
      expect(getAssetName('main.4KrPf_oT8x8.js')).toBe('main.js');
      expect(getAssetName('main.QK-2V8f34ak.js')).toBe('main.js');
      expect(getAssetName('main.UqaNYmNV1BY.min.js')).toBe('main.min.js');
      expect(getAssetName('0.UqaNYmNV1BY.js')).toBe('0.js');
      expect(getAssetName('assets/js/main.UqaNYmNV1BY.js')).toBe('assets/js/main.js');
      expect(getAssetName('UqaNYmNV1BY.js')).toBe('UqaNYmNV1BY.js');
    });

    test('should remove the hash when the separator is "~"', () => {
      expect(getAssetName('main~UqaNYmNV1BY.js')).toBe('main.js');
      expect(getAssetName('main~4KrPf_oT8x8.js')).toBe('main.js');
      expect(getAssetName('main~QK-2V8f34ak.js')).toBe('main.js');
      expect(getAssetName('main~UqaNYmNV1BY.min.js')).toBe('main.min.js');
      expect(getAssetName('0~UqaNYmNV1BY.js')).toBe('0.js');
      expect(getAssetName('assets/js/main~UqaNYmNV1BY.js')).toBe('assets/js/main.js');
      expect(getAssetName('UqaNYmNV1BY.js')).toBe('UqaNYmNV1BY.js');
    });
  });
});

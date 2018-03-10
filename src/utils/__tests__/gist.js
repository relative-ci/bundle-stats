import {
  getGistRawUrl,
  isGistUrl,
} from '../gist';

describe('gist', () => {
  describe('getGistRawUrl', () => {
    test('latest gist', () => {
      const actual = getGistRawUrl('https://gist.github.com/user_id/gist_id');
      const expected = 'https://gist.githubusercontent.com/user_id/gist_id/raw';

      expect(actual).toBe(expected);
    });

    test('with revision', () => {
      const actual = getGistRawUrl('https://gist.github.com/user_id/gist_id/revision_id');
      const expected = 'https://gist.githubusercontent.com/user_id/gist_id/raw/revision_id';

      expect(actual).toBe(expected);
    });
  });

  test('isGistUrl', () => {
    expect(isGistUrl('https://gist.github.com/user/gist_id')).toBe(true);
    expect(isGistUrl('https://github.com/user/gist_id')).toBe(false);
    expect(isGistUrl('https://gist.github.com/user/gist_id/revision')).toBe(true);
  });
});

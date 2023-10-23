import { decodeComponentStateQueryString, getComponentStateQueryString } from '../component-links';

describe('component links', () => {
  describe('decodeComponentStateQueryString', () => {
    test('should return empty component state when query string does not contain any state', () => {
      expect(decodeComponentStateQueryString('')).toEqual({});
      expect(decodeComponentStateQueryString('a=1')).toEqual({ a: '1' });
    });
    test('should decode component state from query string', () => {
      expect(
        decodeComponentStateQueryString(
          'ba=%7B%22search%22%3A%22%22%2C%22filters%22%3A%7B%22changed%22%3Atrue%7D%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%7B%22changed%22%3Afalse%7D%7D',
        ),
      ).toEqual({
        ba: {
          search: '',
          filters: {
            changed: true,
          },
        },
        bm: {
          search: 'query',
          filters: {
            changed: false,
          },
        },
      });
    });
  });
  describe('getComponentStateQueryString', () => {
    test('should return empty string when params are missing', () => {
      expect(getComponentStateQueryString()).toEqual('');
    });

    test('should encode params', () => {
      expect(
        getComponentStateQueryString({
          ba: {
            search: '',
            filters: {
              changed: true,
            },
          },
          bm: {
            search: 'query',
            filters: {
              changed: false,
            },
          },
        }),
      ).toEqual(
        'ba=%7B%22search%22%3A%22%22%2C%22filters%22%3A%7B%22changed%22%3Atrue%7D%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%7B%22changed%22%3Afalse%7D%7D',
      );
    });
  });
});

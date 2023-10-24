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
              'c.100': false,
              'c.200': false,
              'c.300': false,
              'c.400': false,
              'c.500': false,
              'c.600': false,
              'c.700': false,
              'c.800': false,
              'c.900': false,
            },
          },
        }),
      ).toEqual(
        'ba=%7B%22search%22%3A%22%22%2C%22filters%22%3A%7B%22changed%22%3Atrue%7D%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%7B%22changed%22%3Afalse%2C%22c.100%22%3Afalse%2C%22c.200%22%3Afalse%2C%22c.300%22%3Afalse%2C%22c.400%22%3Afalse%2C%22c.500%22%3Afalse%2C%22c.600%22%3Afalse%2C%22c.700%22%3Afalse%2C%22c.800%22%3Afalse%2C%22c.900%22%3Afalse%7D%7D',
      );
    });
  });
});

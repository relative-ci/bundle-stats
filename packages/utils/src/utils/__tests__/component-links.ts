import { getComponentStateData, getComponentStateQueryString } from '../component-links';

describe('component links', () => {
  describe('getComponentState', () => {
    test('should return empty component state when query string does not contain any state', () => {
      expect(getComponentStateData('')).toEqual({});
      expect(getComponentStateData('a=1')).toEqual({ a: '1' });
    });
    test('should decode component state from json ecoded query string (obsolete)', () => {
      expect(
        getComponentStateData(
          'ba=%7B%22search%22%3A%22%22%2C%22filters%22%3A%7B%22changed%22%3Atrue%7D%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%7B%22changed%22%3Afalse%7D%7D',
        ),
      ).toEqual({
        ba: {
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

    test('should decode component state from mixed encoder query string', () => {
      expect(
        getComponentStateData(
          'ba=%7B%22search%22%3A%22%22%2C%22filters%22%3A%22changed-1%22%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%22changed-0%22%7D',
        ),
      ).toEqual({
        ba: {
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
        'ba=%7B%22filters%22%3A%22changed-1%22%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%22changed-0_c.100-0_c.200-0_c.300-0_c.400-0_c.500-0_c.600-0_c.700-0_c.800-0_c.900-0%22%7D',
      );
    });
  });
});

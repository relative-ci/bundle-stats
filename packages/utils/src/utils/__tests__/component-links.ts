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
          'ba=%7B%22search%22%3A%22%22%2C%22filters%22%3A%22changed-1%22%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%22changed-0_c.123-0_c.234-1_c.chunks%252Fnamed%252Dfilter%255F1-1_c.chunks%252Fnamed%252Dfilter%255F2-0%22%7D',
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
            'c.123': false,
            'c.234': true,
            'c.chunks/named-filter_1': true,
            'c.chunks/named-filter_2': false,
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
              'c.123': false,
              'c.234': true,
              'c.chunks/named-filter_1': true,
              'c.chunks/named-filter_2': false,
            },
          },
        }),
      ).toEqual(
        'ba=%7B%22filters%22%3A%22changed-1%22%7D&bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%22changed-0_c.123-0_c.234-1_c.chunks%252Fnamed%252Dfilter%255F1-1_c.chunks%252Fnamed%252Dfilter%255F2-0%22%7D',
      );
    });
  });
});

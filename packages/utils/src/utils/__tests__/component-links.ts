import { getComponentStateQueryString } from '../component-links';

describe('component links', () => {
  describe('getComponentStateQueryString', () => {
    test('should return empty string when params are missing', () => {
      expect(getComponentStateQueryString()).toEqual('');
    });

    test('should encode params', () => {
      expect(
        getComponentStateQueryString({
          bm: {
            search: 'query',
            filters: {
              changed: false,
            },
          },
        }),
      ).toEqual(
        'bm=%7B%22search%22%3A%22query%22%2C%22filters%22%3A%7B%22changed%22%3Afalse%7D%7D',
      );
    });
  });
});

import { getMetricAdded, getMetricDeleted } from '../get-asset-metric-states';

describe('Get asset metric states', () => {
  describe('added', () => {
    it('should return false if both values are present', () => {
      const actual = getMetricAdded([
        {
          value: 100,
        },
        {
          value: 99,
        },
      ]);

      expect(actual).toBe(false);
    });

    it('should return false if current is null', () => {
      const actual = getMetricAdded([
        null,
        {
          value: 99,
        },
      ]);

      expect(actual).toBe(false);
    });

    it('should return true if baseline is null', () => {
      const actual = getMetricAdded([
        {
          value: 100,
        },
        null,
      ]);

      expect(actual).toBe(true);
    });

    it('should return true if baseline is null and value is falsy', () => {
      const actual = getMetricAdded([
        {
          value: 0,
        },
        null,
      ]);

      expect(actual).toBe(true);
    });
  });

  describe('deleted', () => {
    it('should return false if both values are present', () => {
      const actual = getMetricDeleted([
        {
          value: 100,
        },
        {
          value: 99,
        },
      ]);

      expect(actual).toBe(false);
    });

    it('should return true if current is null', () => {
      const actual = getMetricDeleted([
        null,
        {
          value: 99,
        },
      ]);

      expect(actual).toBe(true);
    });

    it('should return true if current is null and value falsy', () => {
      const actual = getMetricDeleted([
        null,
        {
          value: 0,
        },
      ]);

      expect(actual).toBe(true);
    });

    it('should return false if baseline is null', () => {
      const actual = getMetricDeleted([
        {
          value: 100,
        },
        null,
      ]);

      expect(actual).toBe(false);
    });
  });
});

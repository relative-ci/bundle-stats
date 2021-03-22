import { getGroupFiltersLabelSuffix } from '../filters.utils';

describe('UI / Filters / utils', () => {
  describe('getGroupFiltersLabelSuffix', () => {
    test('should return none', () => {
      const suffix = getGroupFiltersLabelSuffix([
        ['CSS', { label: 'CSS', defaultValue: false }],
        ['JS', { label: 'JS', defaultValue: false }],
        ['IMG', { label: 'IMG', defaultValue: false }],
        ['MEDIA', { label: 'Media', defaultValue: false }],
        ['FONTS', { label: 'Fonts', defaultValue: false }],
        ['HTML', { label: 'HTML', defaultValue: false }],
        ['OTHER', { label: 'Other', defaultValue: false }],
      ]);

      expect(suffix).toEqual('none');
    });

    test('should return all', () => {
      const suffix = getGroupFiltersLabelSuffix([
        ['CSS', { label: 'CSS', defaultValue: true }],
        ['JS', { label: 'JS', defaultValue: true }],
        ['IMG', { label: 'IMG', defaultValue: true }],
        ['MEDIA', { label: 'Media', defaultValue: true }],
        ['FONTS', { label: 'Fonts', defaultValue: true }],
        ['HTML', { label: 'HTML', defaultValue: true }],
        ['OTHER', { label: 'Other', defaultValue: true }],
      ]);

      expect(suffix).toEqual('all');
    });
    test('should return checked filters', () => {
      const suffix = getGroupFiltersLabelSuffix([
        ['CSS', { label: 'CSS', defaultValue: true }],
        ['JS', { label: 'JS', defaultValue: true }],
        ['IMG', { label: 'IMG', defaultValue: false }],
        ['MEDIA', { label: 'Media', defaultValue: false }],
        ['FONTS', { label: 'Fonts', defaultValue: false }],
        ['HTML', { label: 'HTML', defaultValue: false }],
        ['OTHER', { label: 'Other', defaultValue: false }],
      ]);

      expect(suffix).toEqual('CSS, JS');
    });

    test('should crop last filter if need it', () => {
      const suffix = getGroupFiltersLabelSuffix([
        ['CSS', { label: 'CSS', defaultValue: true }],
        ['JS', { label: 'JS', defaultValue: true }],
        ['IMG', { label: 'IMG', defaultValue: true }],
        ['MEDIA', { label: 'Meeeeeeedia', defaultValue: true }],
        ['FONTS', { label: 'Fonts', defaultValue: false }],
        ['HTML', { label: 'HTML', defaultValue: false }],
        ['OTHER', { label: 'Other', defaultValue: false }],
      ]);

      expect(suffix).toEqual('CSS, JS, IMG, Mee...');
    });

    test('should crop and add remaining filters count', () => {
      const suffix = getGroupFiltersLabelSuffix([
        ['CSS', { label: 'CSS', defaultValue: true }],
        ['JS', { label: 'JS', defaultValue: true }],
        ['IMG', { label: 'IMG', defaultValue: true }],
        ['MEDIA', { label: 'Media', defaultValue: true }],
        ['FONTS', { label: 'Fonts', defaultValue: true }],
        ['HTML', { label: 'HTML', defaultValue: true }],
        ['OTHER', { label: 'Other', defaultValue: false }],
      ]);

      expect(suffix).toEqual('CSS, JS, IMG, Media +2');
    });
  });
});

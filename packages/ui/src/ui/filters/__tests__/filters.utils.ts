import { getGroupFiltersLabelSuffix, getInitialValues } from '../filters.utils';

describe('UI / Filters / utils', () => {
  describe('getGroupFiltersLabelSuffix', () => {
    test('should return none', () => {
      const suffix = getGroupFiltersLabelSuffix([
        { key: 'CSS', label: 'CSS', defaultValue: false },
        { key: 'JS', label: 'JS', defaultValue: false },
        { key: 'IMG', label: 'IMG', defaultValue: false },
        { key: 'MEDIA', label: 'Media', defaultValue: false },
        { key: 'FONTS', label: 'Fonts', defaultValue: false },
        { key: 'HTML', label: 'HTML', defaultValue: false },
        { key: 'OTHER', label: 'Other', defaultValue: false },
      ]);

      expect(suffix).toEqual('none');
    });

    test('should return all', () => {
      const suffix = getGroupFiltersLabelSuffix([
        { key: 'CSS', label: 'CSS', defaultValue: true },
        { key: 'JS', label: 'JS', defaultValue: true },
        { key: 'IMG', label: 'IMG', defaultValue: true },
        { key: 'MEDIA', label: 'Media', defaultValue: true },
        { key: 'FONTS', label: 'Fonts', defaultValue: true },
        { key: 'HTML', label: 'HTML', defaultValue: true },
        { key: 'OTHER', label: 'Other', defaultValue: true },
      ]);

      expect(suffix).toEqual('all');
    });
    test('should return checked filters', () => {
      const suffix = getGroupFiltersLabelSuffix([
        { key: 'CSS', label: 'CSS', defaultValue: true },
        { key: 'JS', label: 'JS', defaultValue: true },
        { key: 'IMG', label: 'IMG', defaultValue: false },
        { key: 'MEDIA', label: 'Media', defaultValue: false },
        { key: 'FONTS', label: 'Fonts', defaultValue: false },
        { key: 'HTML', label: 'HTML', defaultValue: false },
        { key: 'OTHER', label: 'Other', defaultValue: false },
      ]);

      expect(suffix).toEqual('CSS, JS');
    });

    test('should crop last filter if need it', () => {
      const suffix = getGroupFiltersLabelSuffix([
        { key: 'CSS', label: 'CSS', defaultValue: true },
        { key: 'JS', label: 'JS', defaultValue: true },
        { key: 'IMG', label: 'IMG', defaultValue: true },
        { key: 'MEDIA', label: 'Meeeeeeedia', defaultValue: true },
        { key: 'FONTS', label: 'Fonts', defaultValue: false },
        { key: 'HTML', label: 'HTML', defaultValue: false },
        { key: 'OTHER', label: 'Other', defaultValue: false },
      ]);

      expect(suffix).toEqual('CSS, JS, IMG, Mee...');
    });

    test('should crop and add remaining filters count', () => {
      const suffix = getGroupFiltersLabelSuffix([
        { key: 'CSS', label: 'CSS', defaultValue: true },
        { key: 'JS', label: 'JS', defaultValue: true },
        { key: 'IMG', label: 'IMG', defaultValue: true },
        { key: 'MEDIA', label: 'Media', defaultValue: true },
        { key: 'FONTS', label: 'Fonts', defaultValue: true },
        { key: 'HTML', label: 'HTML', defaultValue: true },
        { key: 'OTHER', label: 'Other', defaultValue: false },
      ]);

      expect(suffix).toEqual('CSS, JS, IMG, Media +2');
    });
  });

  describe('getInitialValues', () => {
    test('should return initial values', () => {
      const initialValues = getInitialValues('', {
        changed: {
          label: 'Changed',
          defaultValue: false,
        },
        fileType: {
          label: 'File type',
          children: [
            { key: 'CSS', label: 'CSS', defaultValue: false },
            { key: 'JS', label: 'JS', defaultValue: true },
          ],
        },
      });

      expect(initialValues).toEqual({
        changed: false,
        'fileType.CSS': false,
        'fileType.JS': true,
      });
    });
  });
});

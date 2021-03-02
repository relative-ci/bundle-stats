import { FILE_TYPE_CSS, FILE_TYPE_JS, FILE_TYPE_OTHER } from '../../config';
import { getFileType } from '../file-types';

describe('utils/fileTypes', () => {
  describe('getFileType', () => {
    test('should return file type', () => {
      expect(getFileType('main.css')).toEqual(FILE_TYPE_CSS);
      expect(getFileType('main.js')).toEqual(FILE_TYPE_JS);
      expect(getFileType('sitemap.xml')).toEqual(FILE_TYPE_OTHER);
      expect(getFileType('assets/main.min.js')).toEqual(FILE_TYPE_JS);
    });
  });
});

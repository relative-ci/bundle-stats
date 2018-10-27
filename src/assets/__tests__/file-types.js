import {
  FILE_TYPE_CSS,
  FILE_TYPE_JS,
  FILE_TYPE_OTHER,
  getFileType,
} from '../file-types';

test('File types', () => {
  expect(getFileType('main.css')).toEqual(FILE_TYPE_CSS);
  expect(getFileType('main.js')).toEqual(FILE_TYPE_JS);
  expect(getFileType('sitemap.xml')).toEqual(FILE_TYPE_OTHER);
  expect(getFileType('assets/main.min.js')).toEqual(FILE_TYPE_JS);
});

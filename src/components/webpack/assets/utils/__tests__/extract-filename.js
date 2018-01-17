/* env jest/globals */

import extractFilename from '../extract-filename';

test('Extract filename', () => {
  expect(extractFilename('main.d2490.js')).toBe('main.js');
  expect(extractFilename('main.d249062c08abb6b31a03.js')).toBe('main.js');
  expect(extractFilename('main.d249062c08abb6b31a03.min.js')).toBe('main.min.js');
  expect(extractFilename('0.d249062c08abb6b31a03.js')).toBe('0.js');
  expect(extractFilename('assets/js/main.d249062c08abb6b31a03.js')).toBe('assets/js/main.js');
  expect(extractFilename('d249062c08abb6b31a03.js')).toBe('d249062c08abb6b31a03.js');
});

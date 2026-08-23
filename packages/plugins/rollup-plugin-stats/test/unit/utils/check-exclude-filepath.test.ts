import { describe, test, expect } from 'vitest';

import { checkExcludeFilepath } from '../../../src/utils/check-exclude-filepath';

describe('utils', () => {
  describe('checkExcludeFilepath', () => {
    const testCases: Array<{
      input: Parameters<typeof checkExcludeFilepath>;
      output: ReturnType<typeof checkExcludeFilepath>;
    }> = [
      {
        input: ['./assets/vendor.js'],
        output: false,
      },
      {
        input: ['./assets/vendor.js', 'vendor'],
        output: true,
      },
      {
        input: ['./assets/vendor.js', 'unknown'],
        output: false,
      },
      {
        input: ['./assets/vendor.js', /vendor/],
        output: true,
      },
      {
        input: ['./assets/vendor.js', () => true],
        output: true,
      },
      {
        input: ['./assets/vendor.js', ['main', /vendor/]],
        output: true,
      },
      {
        input: ['./assets/vendor.js', ['main', /unknown/, () => false]],
        output: false,
      },
    ];

    testCases.forEach(({ input, output }) => {
      test(`Should return "${output}" when called with: "${input.join('", "')}"`, () => {
        expect(checkExcludeFilepath(...input)).toEqual(output);
      });
    });
  });
});

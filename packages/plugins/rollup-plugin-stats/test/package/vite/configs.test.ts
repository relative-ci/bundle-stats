import { promisify } from 'node:util';
import { exec as execCallback } from 'node:child_process';
import { describe, expect, test } from 'vitest';

const exec = promisify(execCallback);

const testCases = [
  { type: 'cjs', run: 'npm run build-cjs' },
  { type: 'esm', run: 'npm run build-esm' },
  { type: 'ts', run: 'npm run build-ts' },
];

describe('package - vite configs', () => {
  testCases.forEach((testCase) => {
    test(`should build successfully with vite ${testCase.type} config`, async () => {
      const { stdout } = await exec(`cross-env NO_COLOR=true ${testCase.run}`);

      expect(stdout).toMatch('Stats saved to');
      expect(stdout).toMatch('built in');
    });
  });
});

import { describe, test, expect } from 'vitest';
import deepFreeze from 'deep-freeze-strict';

import extract from '../../src/extract';
import type { OutputBundle } from '../../src/types';
import * as rollupStats from './fixtures/rollup-stats';

const fixtures = rollupStats.stats as unknown as OutputBundle;

describe('extract', () => {
  test('should extract rollup stats', () => {
    expect(extract(deepFreeze(fixtures))).toMatchSnapshot();
  });

  test('should extract rollup stats with sources', () => {
    expect(extract(deepFreeze(fixtures), { source: true })).toMatchSnapshot();
  });

  test('should extract rollup stats with maps', () => {
    expect(extract(deepFreeze(fixtures), { map: true })).toMatchSnapshot();
  });

  test('should extract rollup stats with excluded assets', () => {
    expect(
      extract(deepFreeze(fixtures), { excludeAssets: /vendors/ })
    ).toMatchSnapshot();
  });

  test('should extract rollup stats with excluded modules', () => {
    expect(
      extract(deepFreeze(fixtures), { excludeModules: /utils.js/ })
    ).toMatchSnapshot();
  });
});

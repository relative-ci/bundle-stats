import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, test, expect, beforeEach } from 'vitest';
import { build as vite } from 'vite';
import { vol } from 'memfs';

import config, {
  relativeFileNameConfig,
  absoluteFileNameConfig,
} from './case-options';

describe('package - vite options', () => {
  beforeEach(() => {
    vol.reset();
  });

  test('should output stats JSON file', async () => {
    await vite(config);

    const actual = await fs.readFile(
      path.join(__dirname, config.build?.outDir, 'stats.json'),
      'utf8'
    );
    const stats = JSON.parse(actual);
    expect(stats['assets/index.js']).toMatchObject({
      fileName: 'assets/index.js',
    });
  });

  test('should output stats JSON file with custom relative filename', async () => {
    await vite(relativeFileNameConfig);

    const actual = await fs.readFile(
      path.join(
        __dirname,
        relativeFileNameConfig.build?.outDir,
        '../artifacts/stats-relative-path.json'
      ),
      'utf8'
    );
    const stats = JSON.parse(actual);

    expect(stats['assets/index.js']).toMatchObject({
      fileName: 'assets/index.js',
    });
  });

  test('should output stats JSON file with custom absolute filename', async () => {
    await vite(absoluteFileNameConfig);

    const actual = await fs.readFile('/tmp/custom-stats.json', 'utf8');
    const stats = JSON.parse(actual);

    expect(stats['assets/index.js']).toMatchObject({
      fileName: 'assets/index.js',
    });
  });
});

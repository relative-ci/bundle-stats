import { vol } from 'memfs';

import { writeBaseline } from '../baseline';

jest.mock('fs/promises');

const SOURCE_CURRENT = {
  assets: [
    {
      name: 'main.js',
      size: 12 * 1024,
    },
  ],
};

describe('writeBaseline', () => {
  beforeEach(() => {
    vol.reset();
  });

  test('should save baseline', async () => {
    const baselineFilepath = 'new-baseline-dir/baseline.json';
    await writeBaseline(SOURCE_CURRENT as any, baselineFilepath);

    const baselineFile = await vol.promises.readFile(baselineFilepath);
    expect(JSON.parse(baselineFile.toString())).toEqual(SOURCE_CURRENT);
  });
});

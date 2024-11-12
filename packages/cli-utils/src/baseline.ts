import path from 'path';
import fs from 'fs/promises';
import findCacheDir from 'find-cache-dir';

export const BASELINE_STATS_DIR =
  findCacheDir({ name: 'bundle-stats' }) || path.join(process.cwd(), './node_modules/.cache');
export const BASELINE_STATS_BASE = 'baseline.json';

/**
 * Get baseline absolute filepath
 */
export const getBaselinePath = (
  outputPath = process.cwd(),
  outputDir = '',
  filepath = '',
): string => {
  if (!filepath) {
    return path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);
  }

  if (path.isAbsolute(filepath)) {
    return filepath;
  }

  return path.join(outputPath, outputDir, filepath);
};

/**
 * Get baseline relative filepath
 */
export const getBaselineRelativePath = (
  outputPath = process.cwd(),
  outputDir = '',
  filepath = '',
): string => {
  const absoluteFilepath = getBaselinePath(outputPath, outputDir, filepath);
  return path.relative(outputPath, absoluteFilepath);
};

export async function readBaseline(baselineFilepath: string): Promise<object> {
  const file = await fs.readFile(baselineFilepath, 'utf-8');
  return JSON.parse(file);
}

export async function writeBaseline(data: JSON, baselineFilepath: string): Promise<void> {
  await fs.mkdir(path.dirname(baselineFilepath), { recursive: true });
  return fs.writeFile(baselineFilepath, JSON.stringify(data), {});
}

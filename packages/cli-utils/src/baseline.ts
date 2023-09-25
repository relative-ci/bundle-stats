import path from 'path';
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
  return path.relative(path.join(outputPath, outputDir), absoluteFilepath);
};

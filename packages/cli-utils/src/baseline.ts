import path from 'path';
import { readJSON, outputJSON } from 'fs-extra';
import findCacheDir from 'find-cache-dir';

export const BASELINE_STATS_DIR =
  findCacheDir({ name: 'bundle-stats' }) || path.join(process.cwd(), './node_modules/.cache');
export const BASELINE_STATS_BASE = 'baseline.json';

export function getBaselineStatsFilepath(
  absoluteOutputFilepath?: string,
  relativeTo?: string,
): string {
  const absoluteFilepath =
    absoluteOutputFilepath || path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);

  if (!relativeTo) {
    return absoluteFilepath;
  }

  return path.relative(relativeTo, absoluteFilepath);
}

export async function readBaseline(outputFilepath?: string, relativeTo?: string): Promise<object> {
  return readJSON(getBaselineStatsFilepath(outputFilepath, relativeTo));
}

export async function writeBaseline(data: JSON, outputFilepath?: string): Promise<void> {
  return outputJSON(getBaselineStatsFilepath(outputFilepath), data);
}

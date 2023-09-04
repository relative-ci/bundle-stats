import path from 'path';
import fs from 'fs/promises';
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
  const filepath = getBaselineStatsFilepath(outputFilepath, relativeTo);
  const file = await fs.readFile(filepath, 'utf8');
  return JSON.parse(file);
}

export async function writeBaseline(data: JSON, outputFilepath?: string): Promise<void> {
  const filepath = getBaselineStatsFilepath(outputFilepath);
  return fs.writeFile(filepath, JSON.stringify(data));
}

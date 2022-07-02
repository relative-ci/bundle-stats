import path from 'path';
import { readJSON, outputJSON } from 'fs-extra';
import findCacheDir from 'find-cache-dir';

const BASELINE_STATS_DIR = findCacheDir({ name: 'bundle-stats' }) || path.join(process.cwd(), './node_modules/.cache');
const BASELINE_STATS_BASE = 'baseline.json';

export function getBaselineStatsFilepath(from?: string): string {
  if (!from) {
    return path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);
  }

  return path.join(path.relative(from, BASELINE_STATS_DIR), BASELINE_STATS_BASE);
}

export async function readBaseline(from?: string): Promise<string> {
  return readJSON(getBaselineStatsFilepath(from));
}

export async function writeBaseline(data: JSON): Promise<void> {
  return outputJSON(getBaselineStatsFilepath(), data);
}

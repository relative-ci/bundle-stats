import path from 'path';
import { readJSON, outputJSON } from 'fs-extra';
import findCacheDir from 'find-cache-dir';

const BASELINE_STATS_DIR = findCacheDir({ name: 'bundle-stats' });
const BASELINE_STATS_BASE = 'baseline.json';

export const getBaselineStatesFilepath = (from) => {
  if (!from) {
    return path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);
  }

  return path.join(
    path.relative(from, BASELINE_STATS_DIR),
    BASELINE_STATS_BASE,
  );
};

export const readBaseline = (from) => readJSON(getBaselineStatesFilepath(from));
export const writeBaseline = (data) => outputJSON(getBaselineStatesFilepath(), data);

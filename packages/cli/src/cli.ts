import path from 'path';
import yargs from 'yargs';
// @ts-ignore
import updateNotifier from 'update-notifier';

import run from './run';
import info from '../package.json';

const DEFAULT_OUTPUT_DIR = './dist';
const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

export default async function cli(pkg: object) {
  // Show update notification
  const notifier = updateNotifier({ pkg, updateCheckInterval: WEEK_IN_MS });

  if (notifier.update) {
    notifier.notify();
  }

  // Generate demo report and skip processing
  const { demo } = yargs.options({ demo: { type: 'boolean', default: false } }).parseSync();

  if (demo) {
    await run({
      baseline: false,
      compare: false,
      html: true,
      json: true,
      outDir: DEFAULT_OUTPUT_DIR,
      artifactFilepaths: [
        path.resolve(__dirname, '../__fixtures__/webpack-stats.current.json'),
        path.resolve(__dirname, '../__fixtures__/webpack-stats.baseline.json'),
      ],
    });

    return;
  }

  console.info('CLI', info.version, info.name);

  const args = yargs
    .usage('Usage: $0 OPTIONS [STATS_FILE]...')
    .demandCommand(1, 'Webpack stats file path is required.')
    .option('out-dir', {
      description: 'Output directory',
      type: 'string',
      default: DEFAULT_OUTPUT_DIR,
    })
    .option('compare', {
      description: 'Use local saved stats for comparison',
      type: 'boolean',
      default: true,
    })
    .option('baseline', {
      description: 'Save current stats as baseline',
      type: 'boolean',
      default: false,
    })
    .option('baseline-filepath', {
      description: 'Baseline filepath, default: node_modules/.cache/bundle-stats/baseline.json',
      type: 'string',
      default: undefined,
    })
    .option('html', {
      description: 'Save HTML report',
      type: 'boolean',
      default: true,
    })
    .option('json', {
      description: 'Save JSON data',
      type: 'boolean',
      default: false,
    })
    .option('demo', {
      description: 'Generate demo reports',
      type: 'boolean',
      default: false,
    })
    .alias('d', 'out-dir')
    .alias('h', 'help')
    .alias('v', 'version')
    .help()
    .parseSync();

  await run({
    outDir: args.outDir,
    compare: args.compare,
    baseline: args.baseline,
    baselineFilepath: args.baselineFilepath,
    html: args.html,
    json: args.json,
    artifactFilepaths: args._ as Array<string>,
  });
}

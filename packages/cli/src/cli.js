import path from 'path';
import yargs from 'yargs';
import updateNotifier from 'update-notifier';

import run from './run';

const DEFAULT_OUTPUT_DIR = './dist';
const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;

export default async function cli(packageInfo) {
  // Show update notification
  const notifier = updateNotifier({ pkg: packageInfo, updateCheckInterval: WEEK_IN_MS });

  if (notifier.update) {
    notifier.notify();
  }

  // Generate demo report and skip processing
  const { demo } = yargs.parse();

  if (demo) {
    await run({
      html: true,
      json: true,
      outDir: DEFAULT_OUTPUT_DIR,
      artifactFilepaths: [
        path.resolve(__dirname, '../__fixtures__/webpack-stats-current.json'),
        path.resolve(__dirname, '../__fixtures__/webpack-stats-baseline.json'),
      ],
    });

    return;
  }

  const args = yargs
    .usage('Usage: $0 OPTIONS [STATS_FILE]...')
    .demandCommand(1, 'Webpack stats file path is required.')
    .option('out-dir', {
      description: 'Output directory',
      default: DEFAULT_OUTPUT_DIR,
    })

    .option('compare', {
      description: 'Use local saved stats for comparison',
      boolean: true,
      default: true,
    })
    .option('baseline', {
      description: 'Save current stats as baseline',
      boolean: true,
      default: false,
    })

    .option('html', {
      description: 'Save HTML report',
      boolean: true,
      default: true,
    })
    .option('json', {
      description: 'Save JSON data',
      boolean: true,
      default: false,
    })
    .option('demo', {
      description: 'Generate demo reports',
      default: false,
    })
    .alias('d', 'out-dir')
    .alias('h', 'help')
    .alias('v', 'version')
    .help().argv;

  const {
    compare,
    baseline,

    html,
    json,
    outDir,
    _: artifactFilepaths,
  } = args;

  await run({
    baseline,
    compare,
    html,
    json,
    outDir,
    artifactFilepaths,
  });
}

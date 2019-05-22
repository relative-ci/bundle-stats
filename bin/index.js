#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');

const run = require('./run');

const DEFAULT_OUTPUT_DIR = './dist';

const { demo } = yargs.parse();

if (demo) {
  run({
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
  .help()
  .argv;

const {
  html, json, outDir, _: artifactFilepaths,
} = args;

run({
  html, json, outDir, artifactFilepaths,
});

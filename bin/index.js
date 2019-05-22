#!/usr/bin/env node

const path = require('path');
const { readJSON, outputFile } = require('fs-extra');
const yargs = require('yargs');
const { extractDataFromWebpackStats } = require('@relative-ci/utils');

const {
  OUTPUT_TYPE_HTML, OUTPUT_TYPE_JSON, createReports,
} = require('../');

const DEFAULT_OUTPUT_DIR = './dist';

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
  .alias('d', 'out-dir')
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv;

const {
  html,
  json,
  outDir,
  _: artifactFilepaths,
} = args;

const outputTypes = [
  ...html ? [OUTPUT_TYPE_HTML] : [],
  ...json ? [OUTPUT_TYPE_JSON] : [],
];

Promise.all(artifactFilepaths.map(filepath => readJSON(filepath)))
  .then(sources => sources.map(extractDataFromWebpackStats))
  .then(artifacts => createReports(artifacts, outputTypes))
  .then(reports => Promise.all(reports.map(({ type, output }) => {
    const filepath = path.join(outDir, `report.${type}`);
    return outputFile(filepath, output);
  })))
  .catch((err) => {
    console.error(err);
  });

#!/usr/bin/env node

const process = require('process');
const path = require('path');
const { readJSON, writeFile } = require('fs-extra');
const yargs = require('yargs');

const { createReport } = require('../');

const DEFAULT_OUTPUT_FILEPATH = path.join(process.cwd(), 'webpack-bundle-stats.html');

const args = yargs
  .usage('Usage: webpack-bundle-stats [STATS_FILE]...')
  .demandCommand(1, 'Webpack stats file path is required.')
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv;

const artifactFilepaths = args._;

Promise.all(artifactFilepaths.map(filepath => readJSON(filepath)))
  .then(createReport)
  .then(output => writeFile(DEFAULT_OUTPUT_FILEPATH, output))
  .catch((err) => {
    console.error(err);
  });

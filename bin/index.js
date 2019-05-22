#!/usr/bin/env node

/* eslint-disable no-console */
const path = require('path');
const { readJSON, outputFile } = require('fs-extra');
const yargs = require('yargs');
const Listr = require('listr');

const {
  OUTPUT_TYPE_HTML, OUTPUT_TYPE_JSON, createJobs, createReports,
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

const tasks = new Listr([
  {
    title: 'Read Webpack stat files',
    task: ctx => Promise.all(
      artifactFilepaths.map(filepath => readJSON(filepath)),
    ).then((artifacts) => {
      ctx.artifacts = artifacts;
    }),
  },
  {
    title: 'Gather data',
    task: (ctx) => {
      ctx.initialData = createJobs(ctx.artifacts);
    },
  },
  {
    title: 'Generate reports',
    task: async (ctx) => {
      ctx.reports = await createReports(ctx.initialData, outputTypes);
    },
  },
  {
    title: 'Save reports',
    task: ctx => new Listr(
      ctx.reports.map(({ type, output }) => ({
        title: type,
        task: async () => {
          const filepath = path.join(outDir, `report.${type}`);
          await outputFile(filepath, output);
          ctx.output = [
            ...ctx.output ? ctx.output : [],
            filepath,
          ];
        },
      })),
      { concurrent: true },
    ),
  },
]);

tasks.run()
  .then(({ output }) => {
    console.log('\nReports saved:');
    output.map(reportPath => console.log(`- ${path.resolve(reportPath)}`));
  })
  .catch((err) => {
    console.error(err);
  });

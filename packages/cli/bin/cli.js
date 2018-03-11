#!/usr/bin/env node

const main = require('../dist').default;

const argv = require('yargs')
  .usage(
    '$0 <type> <source..>',
    'Generate a side by side report',
    (yargs) => {
      yargs.positional('type', {
        describe: 'Type of report: webpack.totals, webpack.assets, lighthouse, browsertime',
        type: 'string',
      }).positional('source', {
        describe: 'Filepath or url to the JSON file',
        type: 'string',
      });
    }
  )
  .option('output', {
    description: 'Print markdown / html',
    alias: 'o',
    default: 'console',
  })
  .help()
  .alias('h', 'help')
  .argv;

const sources = argv.source.map(source => require.resolve(source, {
  paths: [
    process.cwd()
  ]
}));

main(argv.type, sources);

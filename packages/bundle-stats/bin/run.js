/* eslint-disable no-console */
const path = require('path');
const { readJSON, outputFile } = require('fs-extra');
const Listr = require('listr');
const { createJobs } = require('@bundle-stats/utils');

const { createReports } = require('../'); // eslint-disable-line import/no-unresolved

module.exports = ({
  html, json, outDir, artifactFilepaths,
}) => {
  const tasks = new Listr([
    {
      title: 'Read Webpack stat files',
      task: ctx => Promise.all(
        artifactFilepaths.map(filepath => readJSON(filepath)),
      ).then((artifacts) => {
        ctx.artifacts = artifacts.map(stats => ({
          webpack: { stats },
        }));
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
        ctx.reports = await createReports(ctx.initialData, { html, json });
      },
    },
    {
      title: 'Save reports',
      task: ctx => new Listr(
        ctx.reports.map(({ filename, output }) => ({
          title: filename,
          task: async () => {
            const filepath = path.join(outDir, filename);
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
};

/* global module */
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable */
import currentData from 'Fixtures/job.current.json'; // eslint-disable-line
import baselineData from 'Fixtures/job.baseline.json'; // eslint-disable-line
/* eslint-enable */
import StandaloneApp from '.';

const JOBS = createJobs([
  { webpack: { stats: currentData.rawData.webpack.stats } },
  { webpack: { stats: baselineData.rawData.webpack.stats } },
  {
    webpack: {
      stats: {
        ...baselineData.rawData.webpack.stats,
        assets: baselineData.rawData.webpack.stats.assets.filter((asset) => asset.name.match(/.(css|js)$/)),
        modules: baselineData.rawData.webpack.stats.modules.slice(0, 100),
      },
    },
  },
]);
const [CURRENT_JOB, BASELINE_JOB] = JOBS;

const stories = storiesOf('StandaloneApp', module);

stories.addDecorator((storyFn) => (
  <div style={{ margin: '-1rem' }}>
    {storyFn()}
  </div>
));

stories.add('default', () => (
  <StandaloneApp jobs={[CURRENT_JOB, BASELINE_JOB]} />
));

stories.add('no warnings', () => (
  <StandaloneApp
    jobs={[
      {
        ...CURRENT_JOB,
        warnings: undefined,
      },
      BASELINE_JOB,
    ]}
  />
));

stories.add('no baseline', () => (
  <StandaloneApp jobs={[CURRENT_JOB]} />
));

stories.add('multiple baselines', () => (
  <StandaloneApp jobs={JOBS} />
));

stories.add('empty', () => (
  <StandaloneApp />
));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable */
import currentData from '../../../../fixtures/job.current.json';
import baselineData from '../../../../fixtures/job.baseline.json';
/* eslint-enable */
import { App } from '.';

const CURRENT_SOURCE = {
  webpack: {
    ...currentData.rawData.webpack,
    builtAt: currentData.createdAt,
    hash: currentData.commit,
  },
};

const BASELINE_SOURCE = {
  webpack: {
    ...baselineData.rawData.webpack,
    builtAt: baselineData.createdAt,
    hash: baselineData.commit,
  },
};

const JOBS = createJobs([CURRENT_SOURCE, BASELINE_SOURCE], {
  webpack: {
    budgets: [
      {
        metric: 'totalSizeByTypeALL',
        value: 1024 * 1024,
      },
    ],
  },
});
const NO_BASELINE_JOBS = createJobs([CURRENT_SOURCE]);

const MULTIPLE_JOBS = createJobs([
  CURRENT_SOURCE,
  BASELINE_SOURCE,
  {
    webpack: {
      ...baselineData.rawData.webpack,
      builtAt: baselineData.createdAt,
      hash: 'aaaa1111',
      assets: baselineData.rawData.webpack.assets.filter((asset) => asset.name.match(/.(css|js)$/)),
      modules: baselineData.rawData.webpack.modules.slice(0, 100),
    },
  },
]);

const [CURRENT_JOB, BASELINE_JOB] = JOBS;

const EMPTY_BASELINE = createJobs([CURRENT_SOURCE, { webpack: null }]);

const stories = storiesOf('App', module);

stories.addDecorator((storyFn) => <div style={{ margin: '-1rem' }}>{storyFn()}</div>);

stories.add('default', () => <App jobs={[CURRENT_JOB, BASELINE_JOB]} version="1.0" />);

stories.add('no insights', () => (
  <App
    jobs={[
      {
        ...CURRENT_JOB,
        insights: undefined,
      },
      BASELINE_JOB,
    ]}
  />
));

stories.add('no baseline', () => <App jobs={NO_BASELINE_JOBS} version="1.0" />);

stories.add('empty baseline', () => <App jobs={EMPTY_BASELINE} version="1.0" />);

stories.add('multiple baselines', () => <App jobs={MULTIPLE_JOBS} version="1.0" />);

stories.add('empty', () => <App verison="1.0" />);

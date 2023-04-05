import React from 'react';
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

export default {
  title: 'App',
  component: App,
  decorators: [
    (Story) => <div style={{ margin: '-1rem' }}><Story /></div>,
  ],
};

export const Default = () => <App jobs={[CURRENT_JOB, BASELINE_JOB]} version="1.0" />;

export const NoInsights = () => (
  <App
    jobs={[
      {
        ...CURRENT_JOB,
        insights: undefined,
      },
      BASELINE_JOB,
    ]}
  />
);

export const NoBaseline = () => <App jobs={NO_BASELINE_JOBS} version="1.0" />;

export const EmptyBaseline = () => <App jobs={EMPTY_BASELINE} version="1.0" />;

export const MultipleBaselines = () => <App jobs={MULTIPLE_JOBS} version="1.0" />;

export const Empty = () => <App verison="1.0" />;

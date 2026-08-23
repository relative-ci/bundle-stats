import { createJobs } from '@bundle-stats/utils';
import SvgIcons from '@bundle-stats/ui/assets/icons.svg?react';

/* eslint-disable import/no-extraneous-dependencies */
import currentData from 'Fixtures/job.current';
import baselineData from 'Fixtures/job.baseline';
/* eslint-enable import/no-extraneous-dependencies */
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

const JOBS = createJobs([CURRENT_SOURCE, BASELINE_SOURCE]);

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

const EMPTY_BASELINE = createJobs([{ webpack: currentData.rawData.webpack }, { webpack: null }]);

const meta = {
  title: 'App',
  component: App,
  decorators: [
    (Story) => (
      <div style={{ margin: '-1rem' }}>
        <Story />
        <SvgIcons />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    jobs: [CURRENT_JOB, BASELINE_JOB],
  },
};

export const NoInsights = {
  args: {
    jobs: [
      {
        ...CURRENT_JOB,
        insights: undefined,
      },
      BASELINE_JOB,
    ],
  },
};

export const NoBaseline = {
  args: {
    jobs: [CURRENT_JOB],
  },
};

export const EmptyBaseline = {
  args: {
    jobs: EMPTY_BASELINE,
  },
};

export const MultipleBaselines = {
  args: {
    jobs: MULTIPLE_JOBS,
  },
};

export const Empty = {};

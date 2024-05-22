import React from 'react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-unresolved, import/no-relative-packages */
import currentData from '../../../../fixtures/gladys/current.json';
import baselineData from '../../../../fixtures/gladys/baseline.json';
import { metaBaseline, metaCurrent } from '../../../../fixtures/meta';
/* eslint-enable import/no-unresolved, import/no-relative-packages */
import { App } from '.';

const CURRENT_SOURCE = {
  ...metaCurrent,
  webpack: currentData,
};

const BASELINE_SOURCE = {
  ...metaBaseline,
  webpack: baselineData,
};

const JOBS = createJobs([CURRENT_SOURCE, BASELINE_SOURCE]);

export default {
  title: 'App/Gladys',
  component: App,
  decorators: [
    (Story) => (
      <div style={{ margin: '-1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = () => <App jobs={JOBS} version="1.0" />;

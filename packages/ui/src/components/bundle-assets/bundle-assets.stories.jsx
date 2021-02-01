import React from 'react';
import { storiesOf } from '@storybook/react';
import { FILE_TYPE_JS, createJobs } from '@bundle-stats/utils';
import { merge, set } from 'lodash';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { ASSET_ENTRY_TYPE, ASSET_FILE_TYPE, ASSET_FILTERS } from '../../constants';
import { getWrapperDecorator } from '../../stories';
import { BundleAssets } from '.';

const JOBS = createJobs([{ webpack: currentStats }, { webpack: baselineStats }]);
const [currentJob, baselineJob] = JOBS;

const stories = storiesOf('Components/BundleAssets', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <BundleAssets jobs={[baselineJob]} />);

stories.add('multiple jobs', () => <BundleAssets jobs={JOBS} />);

stories.add('custom filters', () => (
  <BundleAssets
    jobs={JOBS}
    filters={{
      [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`]: true,
      [`${ASSET_FILE_TYPE}.${FILE_TYPE_JS}`]: true,
    }}
  />
));

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, null]);

stories.add('empty baseline', () => <BundleAssets jobs={JOBS_EMPTY_BASELINE} />);

stories.add('no assets', () => (
  <BundleAssets jobs={JOBS.map((job) => set(job, 'metrics.webpack.assets', {}))} />
));

stories.add('empty filtered data', () => (
  <BundleAssets
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.assets', { 'main.js': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.assets', { 'main.js': { value: 100 } }),
    ]}
  />
));

stories.add('not predictive', () => (
  <BundleAssets
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.assets', {
        'static/js/not-predictive.js': {
          name: 'static/js/not-predictive.93191a1.js',
          value: 2989,
        },
      }),
      set(merge({}, baselineJob), 'metrics.webpack.assets', {
        'static/js/not-predictive.js': {
          name: 'static/js/not-predictive.93191a1.js',
          value: 2988,
        },
      }),
    ]}
  />
));

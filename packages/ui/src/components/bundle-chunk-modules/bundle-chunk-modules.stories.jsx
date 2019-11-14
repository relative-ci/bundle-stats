import React from 'react';
import { get } from 'lodash';
import { storiesOf } from '@storybook/react';
import { createJobs, modulesWebpackTransform, getModulesReport } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleChunkModules } from '.';

const [currentJob, baselineJob] = createJobs([
  { webpack: { stats: currentStats } },
  { webpack: { stats: baselineStats } },
]);

const stories = storiesOf('Components/BundleChunkModules', module);
stories.addDecorator(getWrapperDecorator());

const RUNS_DEFAULT = [
  currentJob,
].map((job) => ({
  meta: job,
  ...modulesWebpackTransform(get(job, 'rawData.webpack.stats')),
}));

stories.add('default', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_DEFAULT}
    modules={getModulesReport(RUNS_DEFAULT)[1].modules}
  />
));

const RUNS_MULTIPLE = [
  currentJob,
  baselineJob,
].map((job) => ({
  meta: job,
  ...modulesWebpackTransform(get(job, 'rawData.webpack.stats')),
}));

stories.add('multiple jobs', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_MULTIPLE}
    modules={getModulesReport(RUNS_MULTIPLE)[1].modules}
  />
));

stories.add('empty modules', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_MULTIPLE}
    modules={[]}
  />
));

const RUNS_EMPTY_BASELINE = [
  currentJob,
  null,
].map((job) => ({
  meta: job,
  ...modulesWebpackTransform(get(job, 'rawData.webpack.stats')),
}));

stories.add('empty baseline', () => (
  <BundleChunkModules
    name="vendor"
    id="1"
    runs={RUNS_EMPTY_BASELINE}
    modules={getModulesReport(RUNS_EMPTY_BASELINE)[1].modules}
  />
));

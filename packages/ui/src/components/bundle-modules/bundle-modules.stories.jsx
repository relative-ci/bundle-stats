import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleModules } from '.';

const JOBS = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);

// eslint-disable-next-line no-unused-variables
const [CURRENT_JOB, BASELINE_JOB]= JOBS;

const stories = storiesOf('Components/BundleModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleModules jobs={[BASELINE_JOB]} />
));

stories.add('multiple jobs', () => (
  <BundleModules jobs={JOBS} />
));

// stories.add('empty modules', () => (
//   <BundleChunkModules jobs={JOBS.map((job) => merge({}, job, { metrics: { webpack: { modules: {} } } }))} />
// ));
//
// stories.add('empty filtered modules', () => (
//   <BundleChunkModules
//     runs={JOBS}
//     items={[
//       {
//         key: 'module-a',
//         label: 'module-a',
//         biggerIsBetter: false,
//         changed: false,
//         runs: [
//           {
//             name: 'module-a',
//             value: 25,
//             displayValue: '25B',
//             delta: 0,
//             deltaPercentage: 0,
//             displayDelta: '0B',
//             displayDeltaPercentage: '0%',
//           },
//           {
//             name: 'module-a',
//             value: 25,
//             displayValue: '25B',
//             delta: 0,
//             deltaPercentage: 0,
//             displayDelta: '0B',
//             displayDeltaPercentage: '0%',
//           },
//         ],
//       },
//     ]}
//   />
// ));

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, null]);

stories.add('empty baseline', () => (
  <BundleModules jobs={JOBS_EMPTY_BASELINE} />
));

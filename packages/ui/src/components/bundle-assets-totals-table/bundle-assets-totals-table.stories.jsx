import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsTable } from '.';

const JOBS = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);

const [currentJob] = JOBS;

const stories = storiesOf('Components/BundleAssetsTotalsTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <BundleAssetsTotalsTable jobs={[currentJob]} />);

stories.add('multiple jobs', () => <BundleAssetsTotalsTable jobs={JOBS} />);

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, null]);

stories.add('empty baseline', () => <BundleAssetsTotalsTable jobs={JOBS_EMPTY_BASELINE} />);

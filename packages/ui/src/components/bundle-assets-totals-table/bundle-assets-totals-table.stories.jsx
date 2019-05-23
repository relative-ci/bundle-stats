import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStats } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsTable } from '.';

const currentJob = {
  ...currentData,
  stats: createStats(baselineData.rawData, currentData.rawData),
};

const baselineJob = {
  ...baselineData,
  stats: createStats(null, baselineData.rawData),
};

const stories = storiesOf('Components/BundleAssetsTotalsTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleAssetsTotalsTable jobs={[currentJob]} />
));

stories.add('multiple jobs', () => (
  <BundleAssetsTotalsTable jobs={[currentJob, baselineJob]} />
));

stories.add('empty baseline', () => (
  <BundleAssetsTotalsTable jobs={[currentJob, null]} />
));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStats, createStatsSummary } from '@bundle-stats/utils';

import browsertime from '../../../../../fixtures/browsertime.json';
import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BrowsertimeTable } from '.';

const currentStats = createStats(baselineData.rawData, currentData.rawData);
const baselineStats = createStats(null, baselineData.rawData);

const currentJob = {
  ...currentData,
  stats: currentStats,
  summary: createStatsSummary(baselineStats, currentStats),
};

const baselineJob = {
  ...baselineData,
  stats: baselineStats,
  summary: createStatsSummary(null, baselineStats),
};

const stories = storiesOf('Components/BrowsertimeTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BrowsertimeTable
    jobs={[
      {
        ...currentJob,
        rawData: {
          browsertime,
        },
      },
      {
        ...baselineJob,
        rawData: {
          browsertime,
        },
      },
    ]}
  />
));

stories.add('no baseline', () => (
  <BrowsertimeTable
    jobs={[
      {
        ...currentJob,
        rawData: {
          browsertime,
        },
      },
      undefined,
    ]}
  />
));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStats, createStatsSummary } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { Summary } from '.';

const currentStats = createStats(baselineData.rawData, currentData.rawData);
const baselineStats = createStats(null, baselineData.rawData);

const currentJob = {
  ...currentData,
  stats: currentStats,
  summary: createStatsSummary(baselineStats, currentStats),
};

const stories = storiesOf('Components/Summary', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Summary data={currentJob.summary} showSummaryItemBaselineValue />
));

stories.add('loading', () => (
  <Summary loading />
));

stories.add('single run', () => (
  <Summary data={createStatsSummary(null, currentJob.stats)} showSummaryItemDelta={false} />
));

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { JobsHeader } from '.';

const stories = storiesOf('Components/JobsHeader', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <JobsHeader
    jobs={[
      {
        internalBuildNumber: 1,
        createdAt: '2019-01-02T00:00:00.000Z',
        commit: 'abc123',
        commitMessage: 'feature: Add header',
        branch: 'master',
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 1000000,
            baseline: 900000,
          },
        },
      },
    ]}
  />
));

stories.add('multiple jobs', () => (
  <JobsHeader
    jobs={[
      {
        internalBuildNumber: 1,
        createdAt: '2019-01-02T00:00:00.000Z',
        commit: 'abc123',
        commitMessage: 'feature: Add header logo',
        branch: 'master',
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 1000000,
            baseline: 900000,
          },
        },
      },
      {
        internalBuildNumber: 2,
        createdAt: '2019-01-01T00:00:00.000Z',
        commit: 'cba321',
        commitMessage: 'fix: Prevent error when data is empty',
        branch: 'master',
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 900000,
            baseline: 0,
          },
        },
      },
    ]}
  />
));

stories.add('loading', () => (
  <JobsHeader loading />
));

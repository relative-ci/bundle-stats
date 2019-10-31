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
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 1000000,
            baseline: 900000,
          },
        },
      },
      {
        internalBuildNumber: 2,
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

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
        meta: {
          webpack: {
            stats: {
              builtAt: '2019-01-01T00:00:00.000Z',
              hash: 'abcd1234',
            },
          },
        },
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
        meta: {
          webpack: {
            stats: {
              builtAt: '2019-01-01T00:00:00.000Z',
              hash: 'abcd1234',
            },
          },
        },
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 1000000,
            baseline: 900000,
          },
        },
      },
      {
        internalBuildNumber: 2,
        meta: {
          webpack: {
            stats: {
              builtAt: '2019-01-02T00:00:00.000Z',
              hash: 'efgh1234',
            },
          },
        },
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

stories.add('multiple equal jobs', () => (
  <JobsHeader
    jobs={[
      {
        internalBuildNumber: 1,
        meta: {
          webpack: {
            stats: {
              builtAt: '2019-01-01T00:00:00.000Z',
              hash: 'abcd1234',
            },
          },
        },
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 1000000,
            baseline: 1000000,
          },
        },
      },
      {
        internalBuildNumber: 2,
        meta: {
          webpack: {
            stats: {
              builtAt: '2019-01-02T00:00:00.000Z',
              hash: 'efgh1234',
            },
          },
        },
        summary: {
          'webpack.assets.totalSizeByTypeALL': {
            current: 1000000,
            baseline: 0,
          },
        },
      },
    ]}
  />
));

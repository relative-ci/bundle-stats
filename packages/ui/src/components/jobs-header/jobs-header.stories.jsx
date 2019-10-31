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
      },
    ]}
  />
));

stories.add('multiple jobs', () => (
  <JobsHeader
    jobs={[
      {
        internalBuildNumber: 1,
      },
      {
        internalBuildNumber: 2,
      },
    ]}
  />
));

stories.add('loading', () => (
  <JobsHeader loading />
));

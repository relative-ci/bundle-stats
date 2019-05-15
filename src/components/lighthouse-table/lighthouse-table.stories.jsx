import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import lighthouse from '../../../__mocks__/lighthouse.json';
import { getWrapperDecorator } from '../../stories';
import { LighthouseTable } from '.';

const stories = storiesOf('Components/LighthouseTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <LighthouseTable
    jobs={[
      {
        ...job,
        rawData: {
          lighthouse,
        },
      },
      {
        ...job.baseline,
        rawData: {
          lighthouse,
        },
      },
    ]}
  />
));

stories.add('no baseline', () => (
  <LighthouseTable
    jobs={[
      {
        ...job,
        rawData: {
          lighthouse,
        },
      },
    ]}
  />
));

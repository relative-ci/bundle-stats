import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import browsertime from '../../../__mocks__/browsertime.json';
import { getWrapperDecorator } from '../../stories';
import { BrowsertimeTable } from '.';

const stories = storiesOf('Components/BrowsertimeTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BrowsertimeTable
    jobs={[
      {
        ...job,
        rawData: {
          browsertime,
        },
      },
      {
        ...job.baseline,
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
        ...job,
        rawData: {
          browsertime,
        },
      },
      undefined,
    ]}
  />
));

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { JobMeta } from '.';

const stories = storiesOf('Components/JobMeta', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <JobMeta
    meta={[
      {
        title: '#123',
        content: [
          <p>July 3th </p>,
        ],
      },
      {
        title: '#122',
        content: [
          <p>July 4th</p>,
        ],
      },
    ]}
  />
));

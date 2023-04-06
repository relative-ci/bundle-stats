import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { JobMeta } from '.';

export default {
  title: 'Components/JobMeta',
  component: JobMeta,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
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
);

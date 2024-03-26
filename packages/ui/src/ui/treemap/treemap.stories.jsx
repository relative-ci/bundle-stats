import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Treemap } from '.';

const stories = storiesOf('UI/Treemap', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Treemap
    data={[
      {
        id: 'js',
        value: 900,
        data: {
          label: 'JavaScript',
        },
      },
      {
        id: 'css',
        value: 200,
        data: {
          label: 'CSS',
        },
      },
      {
        id: 'media',
        value: 400,
        data: {
          label: 'Media',
        },
      },
      {
        id: 'html',
        value: 50,
        data: {
          label: 'HTML',
        },
      },
    ]}
  />
));

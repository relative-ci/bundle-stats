import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { ModuleInfo } from '.';

const stories = storiesOf('Components/ModuleInfo', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <ModuleInfo
    item={{
      runs: [
        {
          key: './node_modules/lodash/fp/_baseConvert.js',
          name: './node_modules/lodash/fp/_baseConvert.js',
          chunkIds: ['2'],
        },
        {
          key: './node_modules/lodash/fp/_baseConvert.js',
          name: './node_modules/lodash/fp/_baseConvert.js',
          chunkIds: ['2'],
        },
      ],
    }}
    chunks={[
      {
        id: '2',
        name: 'vendors',
      },
    ]}
    chunkIds={['1', '2']}
    labels={['Job #2', 'Job #1']}
  />
));

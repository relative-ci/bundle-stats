import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Panel } from '../panel';
import { Panels } from '.';

const stories = storiesOf('UI/Panels', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Panels style={{ outline: '1px dotted hotpink' }}>
    <Panel style={{ padding: '24px' }}>
      Panel 1
    </Panel>
    <Panel style={{ padding: '24px' }}>
      Panel 2
    </Panel>
  </Panels>
));

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Panels } from '.';

const stories = storiesOf('UI/Panels', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Panels style={{ outline: '1px dotted hotpink' }}>
    <div style={{ padding: '24px' }}>
      Panel 1
    </div>
    <div style={{ padding: '24px' }}>
      Panel 2
    </div>
  </Panels>
));

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Footer } from '.';

const stories = storiesOf('Layout/Footer', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Footer />
));

stories.add('with custom content', () => (
  <Footer>
    Version 1.0
    <span style={{ margin: '1em' }}>
      Contact
    </span>
  </Footer>
));

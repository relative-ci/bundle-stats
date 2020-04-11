import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Toolbar } from '.';

const stories = storiesOf('UI/Toolbar', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Toolbar>
    <div>Content</div>
  </Toolbar>
));

stories.add('with actions', () => (
  <Toolbar
    renderActions={({ actionClassName }) => (
      <>
        <div className={actionClassName}>Action 1</div>
        <div className={actionClassName}>Action 2</div>
      </>
    )}
  >
    Content
  </Toolbar>
));

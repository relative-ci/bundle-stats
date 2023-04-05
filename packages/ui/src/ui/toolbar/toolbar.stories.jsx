import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Toolbar } from '.';

export default {
  title: 'UI/Toolbar',
  component: Toolbar,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <Toolbar>
    <div>Content</div>
  </Toolbar>
);

export const WithActions = () => (
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
);

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Logo } from '../../ui/logo';
import { Tabs } from '../../ui/tabs';
import { Header } from '.';

const stories = storiesOf('Layout/Header', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Header
    renderLeft={({ className }) => (
      <div className={className}>
        <Logo />
      </div>
    )}
    render={({ className }) => (
      <div className={className}>
        <Tabs>
          <span>Totals</span>
          <span>Assets</span>
          <span>Modules</span>
        </Tabs>
      </div>
    )}
    renderRight={({ className }) => (
      <div className={className}>
        <Logo kind="github" />
      </div>
    )}
  />
));

stories.add('menu on the right', () => (
  <Header
    renderLeft={({ className }) => (
      <div className={className}>
        <Logo />
      </div>
    )}
    renderRight={({ className }) => (
      <div className={className} style={{ flexBasis: '100%' }}>
        <Tabs>
          <span>Totals</span>
          <span>Assets</span>
          <span>Modules</span>
        </Tabs>
      </div>
    )}
  />
));

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Logo } from '../../ui/logo';
import { SubHeader } from '.';

const stories = storiesOf('Layout/SubHeader', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <SubHeader title="Webpack" />
));

stories.add('with subtitle', () => (
  <SubHeader
    title="Webpack"
    subtitle="Tools"
  />
));

stories.add('with icon', () => (
  <SubHeader
    title="Webpack"
    subtitle="Tools"
    icon={<Logo kind="webpack" style={{ width: '48px' }} />}
  />
));

stories.add('with children', () => (
  <SubHeader
    title="Webpack"
    subtitle="Tools"
    icon={<Logo kind="webpack" style={{ width: '72px' }} />}
  >
    <a href="#webpack">Visit webpack.js.org</a>
  </SubHeader>
));

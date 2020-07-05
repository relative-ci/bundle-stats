import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '../delta';
import { Metric } from '.';

const stories = storiesOf('Components/Metric', module);
stories.addDecorator(getWrapperDecorator({ maxWidth: '200px' }));

stories.add('default', () => <Metric value={100} formatter={(v) => `${v}ms`} />);

stories.add('modifier: formatted value', () => <Metric value="100KB" />);

stories.add('modifier: enhanced', () => (
  <Metric value={100} formatter={(v) => `${v}ms`} enhanced />
));

stories.add('modifier: delta', () => (
  <Metric value={100} formatter={(v) => `${v}ms`}>
    <Delta displayValue="+10%" deltaType="POSITIVE" />
  </Metric>
));

stories.add('modifier: inline', () => (
  <Metric value={100} formatter={(v) => `${v}ms`} inline>
    <Delta displayValue="+10%" deltaType="POSITIVE" />
  </Metric>
));

stories.add('modifier: anchored', () => (
  <Metric value={100} formatter={(v) => `${v}ms`} anchored>
    <Delta displayValue="+10%" deltaType="POSITIVE" />
  </Metric>
));

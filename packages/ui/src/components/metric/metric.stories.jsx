import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Metric } from '.';

const stories = storiesOf('Components/Metric', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Metric
    value={100}
    formatter={v => `${v}ms`}
  />
));

stories.add('modifier: formatted value', () => (
  <Metric value="100KB" />
));

stories.add('modifier: enhanced', () => (
  <Metric
    value={100}
    formatter={v => `${v}ms`}
    enhanced
  />
));

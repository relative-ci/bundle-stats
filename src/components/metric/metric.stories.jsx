import React from 'react';
import { storiesOf } from '@storybook/react';

import { Metric } from '.';

const stories = storiesOf('Metric', module);

stories.add('default', () => (
  <Metric
    value={100}
    formatter={v => v}
  >
    delta
  </Metric>
));

import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { Summary } from '.';

const stories = storiesOf('Components/Summary', module);

stories.add('default', () => (
  <Summary data={job.summary} />
));

stories.add('loading', () => (
  <Summary loading />
));

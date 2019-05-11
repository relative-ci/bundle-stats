/* global module */
import { storiesOf } from '@storybook/react';

import StandaloneApp from './';

const stories = storiesOf('StandaloneApp', module);

stories.add('default', () => (
  <StandaloneApp />
));

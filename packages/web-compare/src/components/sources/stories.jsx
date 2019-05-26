/* global module */
import { storiesOf } from '@storybook/react';

import Sources from '.';


const stories = storiesOf('Components/Sources', module);

stories.add('default', () => (
  <Sources />
));

const sources = [
  'https://source-a',
  'https://source-b',
];

stories.add('with sources', () => (
  <Sources initialSources={sources} />
));

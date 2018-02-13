/* global module */
import { storiesOf } from '@storybook/react';

import Sources from './';


const stories = storiesOf('Components/Sources', module);

stories.add('default', () => (
  <Sources />
));

const sources = [
  {
    url: 'https://source-a',
  },
  {
    url: 'https://source-b',
  },
];

stories.add('with sources', () => (
  <Sources initialSources={sources} />
));

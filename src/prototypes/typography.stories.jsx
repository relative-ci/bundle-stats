import React from 'react';
import { storiesOf } from '@storybook/react';

import { Container } from '../ui';
import { getWrapperDecorator } from '../stories';
import content from './typography.md';

const stories = storiesOf('Prototypes/Typography', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Container dangerouslySetInnerHTML={{ __html: content }} />
));

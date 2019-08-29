import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Alert } from '.';

const stories = storiesOf('UI/Alert', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Alert>
    Lorem ipsum
  </Alert>
));

stories.add('with kind success', () => (
  <Alert kind="success">
    Lorem ipsum
  </Alert>
));

stories.add('with kind info', () => (
  <Alert kind="info">
    Lorem ipsum
  </Alert>
));

stories.add('with kind warning', () => (
  <Alert kind="warning">
    Lorem ipsum
  </Alert>
));

stories.add('with kind danger', () => (
  <Alert kind="danger">
    Lorem ipsum
  </Alert>
));

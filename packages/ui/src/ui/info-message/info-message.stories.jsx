import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { InfoMessage } from '.';

const stories = storiesOf('UI/InfoMessage', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <InfoMessage>
    Lorem ipsum
  </InfoMessage>
));

stories.add('with kind success', () => (
  <InfoMessage kind="success">
    Lorem ipsum
  </InfoMessage>
));

stories.add('with kind info', () => (
  <InfoMessage kind="info">
    Lorem ipsum
  </InfoMessage>
));

stories.add('with kind warning', () => (
  <InfoMessage kind="warning">
    Lorem ipsum
  </InfoMessage>
));

stories.add('with kind danger', () => (
  <InfoMessage kind="danger">
    Lorem ipsum
  </InfoMessage>
));

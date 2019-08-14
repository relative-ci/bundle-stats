import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';

import { getWrapperDecorator } from '../../stories';
import {
  KIND_DEFAULT, KIND_LOGOTYPE, KINDS,
} from './logo.constants';
import { Logo } from '.';

const selectKind = (value = KIND_DEFAULT) => select('Kind', KINDS, value);

const stories = storiesOf('UI/Logo', module);
stories.addDecorator(getWrapperDecorator());
stories.addDecorator(withKnobs);

stories.add('default', () => (
  <Logo kind={selectKind()} />
));

/* eslint-disable jsx-a11y/anchor-has-content */
const LogoComponent = (props) => <a {...props} />;
/* eslint-enable jsx-a11y/anchor-has-content */

stories.add('with custom component', () => (
  <Logo
    as={LogoComponent}
    href="https://relative-ci.com"
    kind={selectKind()}
  />
));

stories.add('with custom kind', () => (
  <Logo kind={selectKind(KIND_LOGOTYPE)} />
));

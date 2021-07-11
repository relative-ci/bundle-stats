import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Input } from '.';

const stories = storiesOf('UI/Input', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Input placeholder="Search" />);
stories.add('with size', () => <Input size="small" placeholder="Search" />);

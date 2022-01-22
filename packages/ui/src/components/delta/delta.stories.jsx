import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '.';

const stories = storiesOf('Components/Delta', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Delta displayValue="20%" deltaType="POSITIVE" />);

stories.add('negative', () => <Delta displayValue="20%" deltaType="NEGATIVE" />);

stories.add('slightlyNegative', () => <Delta displayValue="1%" deltaType="LOW_NEGATIVE" />);

stories.add('slightlyPositive', () => <Delta displayValue="1%" deltaType="LOW_POSITIVE" />);

stories.add('empty', () => <Delta displayValue="0%" deltaType="NO_CHANGE" />);

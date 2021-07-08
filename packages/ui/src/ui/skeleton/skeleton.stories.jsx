import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Skeleton } from '.';

const stories = storiesOf('UI/Skeleton', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Skeleton />);

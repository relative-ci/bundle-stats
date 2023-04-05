import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Input } from '.';

export default {
  title: 'UI/Input',
  component: Input,
  decorators: [getWrapperDecorator()],
};

export const Default = () => <Input placeholder="Search" />;
export const WithSize = () => <Input size="small" placeholder="Search" />;

import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Loader } from '.';

export default {
  title: 'UI/Loader',
  component: Loader,
  decorators: [getWrapperDecorator()],
};

export const Default = () => <Loader />;
export const WithSize = () => <Loader size={Loader.SIZE_LARGE} />;

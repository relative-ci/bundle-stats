import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '.';

export default {
  title: 'Components/Delta',
  component: Delta,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <Delta
    displayValue="20%"
    deltaType="POSITIVE"
  />
);

export const Negative = () => (
  <Delta
    displayValue="20%"
    deltaType="NEGATIVE"
  />
);

export const SlightlyNegative = () => (
  <Delta
    displayValue="1%"
    deltaType="LOW_NEGATIVE"
  />
);

export const SlightlyPositive = () => (
  <Delta
    displayValue="1%"
    deltaType="LOW_POSITIVE"
  />
);

export const Empty = () => (
  <Delta
    displayValue="0%"
    deltaType="NO_CHANGE"
  />
);

export const Inverted = () => (
  <Delta
    displayValue="1%"
    deltaType="LOW_NEGATIVE"
    inverted
  />
);

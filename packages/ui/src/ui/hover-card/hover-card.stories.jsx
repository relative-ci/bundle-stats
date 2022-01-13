import React from 'react';

import { HoverCard } from '.';

export default {
  name: 'UI/HoverCard',
  component: HoverCard,
};

export const Default = () => (
  <HoverCard label="Open popover">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua
  </HoverCard>
);

import React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '../button';
import { ControlGroup } from '.';

export default {
  title: 'UI/ControlGroup',
  component: ControlGroup,
} as Meta;

export const Default = () => (
  <ControlGroup>
    <Button outline type="button">
      Option A
    </Button>
    <Button outline type="button">
      Option B
    </Button>
    <Button outline type="button">
      Option C
    </Button>
  </ControlGroup>
);

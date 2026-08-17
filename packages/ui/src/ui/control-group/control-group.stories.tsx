import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';
import { ControlGroup } from '.';

const meta = {
  title: 'UI/ControlGroup',
  component: ControlGroup,
  args: {
    children: (
      <>
        <Button outline type="button">
          Option A
        </Button>
        <Button outline type="button">
          Option B
        </Button>
        <Button outline type="button">
          Option C
        </Button>
      </>
    ),
  },
} satisfies Meta<typeof ControlGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

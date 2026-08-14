import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Alert } from '.';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  decorators: [getWrapperDecorator()],
  args: {
    children: 'Lorem ipsum',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithKindSuccess: Story = {
  args: {
    kind: 'success',
  },
};

export const WithKindInfo: Story = {
  args: {
    kind: 'info',
  },
};

export const WithKindWarning: Story = {
  args: {
    kind: 'warning',
  },
};

export const WithKindDanger: Story = {
  args: {
    kind: 'danger',
  },
};

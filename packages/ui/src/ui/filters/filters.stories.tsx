import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { getWrapperDecorator } from '../../stories';
import { Filters } from '.';

const meta = {
  title: 'UI/Filters',
  component: Filters,
  decorators: [getWrapperDecorator({ paddingLeft: '200px' })],
  args: {
    onChange: action('CHANGE'),
  },
} satisfies Meta<typeof Filters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: {
      changed: {
        label: 'Changed',
        defaultValue: true,
      },
      fileTypes: {
        label: 'File types',
        children: [
          {
            key: 'CSS',
            label: 'CSS',
            defaultValue: true,
          },
          {
            key: 'JS',
            label: 'JS',
            defaultValue: true,
          },
          {
            key: 'HTML',
            label: 'HTML',
            defaultValue: true,
          },
          {
            key: 'OTHER',
            label: 'Asset that is not CSS, JS or HTML',
            defaultValue: true,
          },
        ],
      },
    },
  },
};

export const Overflow: Story = {
  args: {
    filters: {
      changed: {
        label: 'Changed',
        defaultValue: true,
      },
      chunks: {
        label: 'Chunks',
        children: Array(22)
          .fill('')
          .map((_, currentIndex) => ({
            key: `chunk-${currentIndex}`,
            label: `Chunk ${currentIndex + 1}`,
            defaultValue: true,
          })),
      },
    },
  },
};

export const DisableOptions: Story = {
  args: {
    filters: {
      changed: {
        label: 'Changed',
        defaultValue: false,
        disabled: true,
      },
      entrypoint: {
        label: 'Entrypoint',
        defaultValue: false,
      },
      fileTypes: {
        label: 'File types',
        children: [
          {
            key: 'CSS',
            label: 'CSS',
            defaultValue: true,
          },
          {
            key: 'JS',
            label: 'JS',
            defaultValue: true,
            disabled: true,
          },
          {
            key: 'HTML',
            label: 'HTML',
            defaultValue: true,
          },
        ],
      },
    },
  },
};

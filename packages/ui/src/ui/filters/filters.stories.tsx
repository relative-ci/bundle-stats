import React from 'react';
import { Meta } from '@storybook/react';
import { action } from 'storybook/actions'; // eslint-disable-line

import { getWrapperDecorator } from '../../stories';
import { Filters } from '.';

export default {
  title: 'UI/Filters',
  component: Filters,
  decorators: [getWrapperDecorator({ paddingLeft: '200px' })],
} as Meta;

export const Default = () => (
  <Filters
    onChange={action('CHANGE')}
    filters={{
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
    }}
  />
);

export const Overflow = () => (
  <Filters
    onChange={action('CHANGE')}
    filters={{
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
    }}
  />
);

export const DisableOptions = () => (
  <Filters
    onChange={action('CHANGE')}
    filters={{
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
    }}
  />
);

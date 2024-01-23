import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

// eslint-disable-next-line import/no-relative-packages
import moduleItemsFixture from '../../../../../fixtures/module-items.json';
import { MetricsTreemap } from '.';

export default {
  title: 'Components/MetricsTreemap',
  component: MetricsTreemap,
} as Meta;

export const Default: StoryObj = {
  render: (props: React.ComponentProps<typeof MetricsTreemap>) => (
    <MetricsTreemap style={{ maxWidth: 'var(--max-width)' }} {...props} />
  ),
  args: {
    items: moduleItemsFixture,
    onItemClick: action('CLICK'),
  },
};

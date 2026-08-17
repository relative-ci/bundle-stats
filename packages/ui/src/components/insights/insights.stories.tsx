import type { Meta, StoryObj } from '@storybook/react';
import { InsightType } from '@bundle-stats/utils';

import { getWrapperDecorator } from '../../stories';
import { Insights } from '.';

const meta = {
  title: 'Components/Insights',
  component: Insights,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof Insights>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    insights: {
      duplicatePackages: {
        type: InsightType.ERROR,
        data: {
          packages: { 'package-a': ['package-a', 'package-a~1'] },
          text: 'Bundle introduced 1 and removed 2 duplicate packages',
        },
      },
      newPackages: {
        type: InsightType.WARNING,
        data: {
          text: 'Bundle introduced 2 new packages: package-c, package-d',
          packages: ['package-c', 'package-d'],
        },
      },
    },
  },
};

export const Info: Story = {
  args: {
    insights: {
      duplicatePackages: {
        type: InsightType.INFO,
        data: {
          packages: { 'package-a': ['package-a', 'package-a~1'] },
          text: 'Bundle removed 1 duplicate packages',
        },
      },
      newPackages: {
        type: InsightType.WARNING,
        data: {
          text: 'Bundle introduced 2 new packages: package-c, package-d',
          packages: ['package-c', 'package-d'],
        },
      },
    },
  },
};

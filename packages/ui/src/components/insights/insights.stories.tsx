import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Insights } from '.';

export default {
  title: 'Components/Insights',
  component: Insights,
  decorators: [getWrapperDecorator()],
};

const Template = (props: any) => <Insights {...props} />;

export const Default = Template.bind({});

Default.args = {
  insights: {
    duplicatePackages: {
      type: 'error',
      data: {
        packages: { 'package-a': ['package-a', 'package-a~1'] },
        text: 'Bundle introduced 1 and removed 2 duplicate packages',
      },
    },
    newPackages: {
      type: 'warning',
      data: {
        text: 'Bundle introduced 2 new packages: package-c, package-d',
        packages: ['package-c', 'package-d'],
      },
    },
  },
};

export const Info = Template.bind({});

Info.args = {
  insights: {
    duplicatePackages: {
      type: 'info',
      data: {
        packages: { 'package-a': ['package-a', 'package-a~1'] },
        text: 'Bundle removed 1 duplicate packages',
      },
    },
    newPackages: {
      type: 'warning',
      data: {
        text: 'Bundle introduced 2 new packages: package-c, package-d',
        packages: ['package-c', 'package-d'],
      },
    },
  },
};

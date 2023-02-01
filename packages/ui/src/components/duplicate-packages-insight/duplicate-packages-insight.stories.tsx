import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DuplicatePackagesInsight } from '.';

export default {
  title: 'Components/DuplicatePackagesInsight',
  component: DuplicatePackagesInsight,
};

const Template = (props: any) => <MemoryRouter><DuplicatePackagesInsight {...props} /></MemoryRouter>;

export const Default = Template.bind({});

Default.args = {
  type: 'INFO',
  data: {
    packages: {},
    text: 'Bundle does not contain duplicate packages',
  },
  summary: {
    current: 0,
    baseline: 0,
  },
};

export const NewDuplicates = Template.bind({});

NewDuplicates.args = {
  type: 'ERROR',
  data: {
    packages: {},
    text: 'Bundle introduced 2 duplicate packages',
  },
  summary: {
    current: 4,
    baseline: 2,
  },
};

export const NewDuplicatesAndRemovals = Template.bind({});

NewDuplicatesAndRemovals.args = {
  type: 'ERROR',
  data: {
    packages: {},
    text: 'Bundle introduced 2 and removed 1 duplicate packages',
  },
  summary: {
    current: 4,
    baseline: 3,
  },
};

export const NoChangeDuplicates = Template.bind({});

NoChangeDuplicates.args = {
  type: 'WARNING',
  data: {
    packages: {},
    text: 'Bundle contains 4 duplicate packages',
  },
  summary: {
    current: 4,
    baseline: 4,
  },
};

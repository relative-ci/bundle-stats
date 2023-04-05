import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { JobHeader } from '.';

export default {
  title: 'Components/JobHeader',
  component: JobHeader,
  decorators: [getWrapperDecorator()],
};

const JOB = {
  internalBuildNumber: 1,
  meta: {
    webpack: {
      builtAt: '2019-01-01T00:00:00.000Z',
      hash: 'abcd1234',
    },
  },
  summary: {
    webpack: {
      totalSizeByTypeALL: {
        current: 1000000,
        baseline: 900000,
      },
    },
  },
};

export const Default = () => <JobHeader job={JOB} />;

export const WithTag = () => <JobHeader job={JOB} tag="current" />;

export const WithCustomContent = () => (
  <JobHeader job={JOB}>
    <p>Lorem ipsum dolor sit amed</p>
  </JobHeader>
);

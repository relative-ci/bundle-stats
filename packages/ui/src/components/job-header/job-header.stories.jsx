import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { JobHeader } from '.';

const stories = storiesOf('Components/JobHeader', module);
stories.addDecorator(getWrapperDecorator());

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

stories.add('default', () => <JobHeader job={JOB} />);

stories.add('with tag', () => <JobHeader job={JOB} tag="current" />);

stories.add('with custom content', () => (
  <JobHeader job={JOB}>
    <p>Lorem ipsum dolor sit amed</p>
  </JobHeader>
));

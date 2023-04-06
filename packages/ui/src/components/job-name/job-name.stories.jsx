import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { JobName } from '.';

export default {
  title: 'Components/JobName',
  component: JobName,
  decorators: [getWrapperDecorator({ padding: '64px' })],
};

export const Default = () => <JobName title="View job details" internalBuildNumber={10} />;

export const CustomComponent = () => (
  <JobName
    title="View job details"
    internalBuildNumber={10}
    as={(props) => <strong {...props} />}
  />
);

export const Render = () => (
  <JobName title="View job details">
    <a href="https://relative-ci.com/test">#10</a>
  </JobName>
);

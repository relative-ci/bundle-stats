import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { JobName } from '.';

const stories = storiesOf('Components/JobName', module);
stories.addDecorator(getWrapperDecorator({ padding: '64px' }));

stories.add('default', () => (
  <JobName
    title="View job details"
    internalBuildNumber={10}
  />
));

stories.add('custom component', () => (
  <JobName
    title="View job details"
    internalBuildNumber={10}
    as={(props) => <strong {...props} />}
  />
));

stories.add('render', () => (
  <JobName
    title="View job details"
    internalBuildNumber={10}
    render={({ internalBuildNumber }) => `#${internalBuildNumber}`}
  />
));

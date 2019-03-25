import React from 'react';
import { storiesOf } from '@storybook/react';

import { JobName } from '.';

const stories = storiesOf('JobName', module);

stories.addDecorator(storyFn => (
  <div style={{ padding: '100px' }}>
    {storyFn()}
  </div>
));

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
    as={props => <strong {...props} />}
  />
));

stories.add('render', () => (
  <JobName
    title="View job details"
    internalBuildNumber={10}
    render={({ internalBuildNumber }) => `#${internalBuildNumber}`}
  />
));

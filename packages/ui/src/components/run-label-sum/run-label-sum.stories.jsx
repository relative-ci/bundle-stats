import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { RunLabelSum } from './run-label-sum';

const stories = storiesOf('Components/RunLabelSum', module);
stories.addDecorator(getWrapperDecorator({ padding: '64px' }));

stories.add('default', () => (
  <RunLabelSum
    runIndex={0}
    runCount={1}
    rows={[
      { key: 'File a', runs: [{ value: 100 }] },
      { key: 'File a', runs: [{ value: 200 }] },
    ]}
  />
));

stories.add('multiple runs - current', () => (
  <RunLabelSum
    runIndex={0}
    runCount={2}
    rows={[
      { key: 'File a', runs: [{ value: 100 }, { value: 50 }] },
      { key: 'File a', runs: [{ value: 200 }, { value: 100 }] },
    ]}
  />
));

stories.add('multiple runs - baseline', () => (
  <RunLabelSum
    runIndex={1}
    runCount={2}
    rows={[
      { key: 'File a', runs: [{ value: 100 }, { value: 50 }] },
      { key: 'File a', runs: [{ value: 200 }, { value: 100 }] },
    ]}
  />
));

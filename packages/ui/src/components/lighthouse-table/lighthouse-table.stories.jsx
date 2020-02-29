import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import lighthouse from '../../../__mocks__/lighthouse.json';
import { getWrapperDecorator } from '../../stories';
import { LighthouseTable } from '.';

const stories = storiesOf('Components/LighthouseTable', module);
stories.addDecorator(getWrapperDecorator());

const JOBS = createJobs([{ lighthouse }, { lighthouse }]);

stories.add('default', () => <LighthouseTable jobs={JOBS} />);

stories.add('no baseline', () => <LighthouseTable jobs={[JOBS[1]]} />);

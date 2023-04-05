import React from 'react';
import { createJobs } from '@bundle-stats/utils';

import lighthouse from '../../../__mocks__/lighthouse.json';
import { getWrapperDecorator } from '../../stories';
import { LighthouseTable } from '.';

export default {
  title: 'Components/LighthouseTable',
  component: LighthouseTable,
  decorators: [getWrapperDecorator()],
};

const JOBS = createJobs([{ lighthouse }, { lighthouse }]);

export const Default = () => <LighthouseTable jobs={JOBS} />;

export const NoBaseline = () => <LighthouseTable jobs={[JOBS[1]]} />;

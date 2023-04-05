import React from 'react';
import { createJobs } from '@bundle-stats/utils';
import * as browsertime from '@bundle-stats/utils/lib-esm/browsertime';

// eslint-disable-next-line import/no-relative-packages
import browsertimeSourceFixtures from '../../../../../fixtures/browsertime.json';
import { getWrapperDecorator } from '../../stories';
import { BrowsertimeTable } from '.';

const browsertimeFixtures = browsertime.filter(browsertimeSourceFixtures);

const JOBS = createJobs([
  { browsertime: browsertimeFixtures },
  { browsertime: browsertimeFixtures },
]);

export default {
  title: 'Components/BrowsertimeTable',
  component: BrowsertimeTable,
  decorators: [getWrapperDecorator()],
};

export const Default = () => <BrowsertimeTable jobs={JOBS} />;
export const NoBaseline = () => <BrowsertimeTable jobs={[JOBS[1]]} />;

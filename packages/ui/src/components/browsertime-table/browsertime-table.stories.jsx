import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';
import * as browsertime from '@bundle-stats/utils/lib-esm/src/browsertime';

import browsertimeSourceFixtures from '../../../../../fixtures/browsertime.json';
import { getWrapperDecorator } from '../../stories';
import { BrowsertimeTable } from '.';

const browsertimeFixtures = browsertime.filter(browsertimeSourceFixtures);

const JOBS = createJobs([
  { browsertime: browsertimeFixtures },
  { browsertime: browsertimeFixtures },
]);

const stories = storiesOf('Components/BrowsertimeTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <BrowsertimeTable jobs={JOBS} />);
stories.add('no baseline', () => <BrowsertimeTable jobs={[JOBS[1]]} />);

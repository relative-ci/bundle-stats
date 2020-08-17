import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';
import { get } from 'lodash';

import baselineData from '../../__mocks__/webpack-stats.baseline.json';
import currentData from '../../__mocks__/webpack-stats.current.json';
import { Container, Logo, Tabs } from '../ui';
import { Box, Header, Footer, Stack } from '../layout';
import { JobsHeader } from '../components/jobs-header';
import { BundleAssets } from '../components/bundle-assets';
import { BundleAssetsTotalsTable } from '../components/bundle-assets-totals-table';
import { BundleAssetsTotalsChartBars } from '../components/bundle-assets-totals-chart-bars';
import { BundleModules } from '../components/bundle-modules';
import { BundlePackages } from '../components/bundle-packages';
import { Summary } from '../components/summary';
import { DuplicatePackagesWarning } from '../components/duplicate-packages-warning';
import { getWrapperDecorator } from '../stories';
import css from './bundle-page.module.css';

const stories = storiesOf('Prototypes/BundlePage', module);
stories.addDecorator(getWrapperDecorator());

const JOBS = createJobs([{ webpack: currentData }, { webpack: baselineData }]);
const [currentJob] = JOBS;

const TABS = ['Totals', 'Assets', 'Modules', 'Packages'];

const Page = ({ children, activeTab }) => (
  <>
    <Header
      className={css.header}
      renderLeft={(sideProps) => (
        <div {...sideProps}>
          <Logo kind="logo" className={css.headerLogo} />
          <Logo kind="logotype" className={css.headerLogotype} />
        </div>
      )}
    />
    <Stack className={css.main} space="large">
      <Container className={css.jobsHeader}>
        <JobsHeader jobs={JOBS} />
      </Container>
      <Stack className={css.mainTop} space="medium">
        <Container>
          <Summary data={currentJob.summary} showSummaryItemBaselineValue />
        </Container>
        {get(currentJob, 'insights.webpack.duplicatePackages') && (
          <Container>
            <DuplicatePackagesWarning
              duplicatePackages={get(currentJob, 'insights.webpack.duplicatePackages.data')}
            />
          </Container>
        )}
      </Stack>
      <Container className={css.tabsContainer}>
        <Tabs className={css.tabs}>
          {TABS.map((tab) => (
            <span key={tab} isTabActive={activeTab === tab}>
              {tab}
            </span>
          ))}
        </Tabs>
      </Container>
      <Stack className={css.mainBottom} space="medium">
        {children}
      </Stack>
    </Stack>
    <Footer className={css.footer} />
  </>
);

Page.propTypes = {
  activeTab: PropTypes.oneOf(TABS).isRequired,
  children: PropTypes.node.isRequired,
};

stories.add('totals', () => (
  <Page activeTab="Totals">
    <Container>
      <BundleAssetsTotalsChartBars jobs={JOBS} />
    </Container>
    <Container>
      <Box>
        <BundleAssetsTotalsTable jobs={JOBS} />
      </Box>
    </Container>
  </Page>
));

stories.add('assets', () => (
  <Page activeTab="Assets">
    <Container>
      <Box>
        <BundleAssets jobs={JOBS} />
      </Box>
    </Container>
  </Page>
));

stories.add('modules', () => (
  <Page activeTab="Modules">
    <Container>
      <BundleModules jobs={JOBS} />
    </Container>
  </Page>
));

stories.add('packages', () => (
  <Page activeTab="Packages">
    <Container>
      <Box>
        <BundlePackages jobs={JOBS} />
      </Box>
    </Container>
  </Page>
));

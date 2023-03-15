import React, { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { HashRouter, NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { COMPONENT } from '@bundle-stats/utils';

import {
  METRICS_WEBPACK_ASSETS,
  METRICS_WEBPACK_GENERAL,
  METRICS_WEBPACK_MODULES,
  METRICS_WEBPACK_PACKAGES,
  URLS,
} from '../constants';
import { Box } from '../layout/box';
import { Container } from '../ui/container';
import { Summary } from '../components/summary';
import { BundleAssets } from '../components/bundle-assets';
import { BundleAssetsTotalsChartBars } from '../components/bundle-assets-totals-chart-bars';
import { Tabs } from '../ui/tabs';
import { Footer } from '../layout/footer';
import { Stack } from '../layout/stack';
import { BundleAssetsTotalsTable } from '../components/bundle-assets-totals-table';
import { BundleModules } from '../components/bundle-modules';
import { BundlePackages } from '../components/bundle-packages';
import { Insights } from '../components/insights';
import { TotalSizeTypeTitle } from '../components/total-size-type-title';
import { QueryStateProvider, useComponentQueryState } from '../query-state';
import I18N from '../i18n';
import { Header } from './header';
import css from './app.module.css';
import { MetricsTableTitle } from '../components';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ({ jobs, version, ...props }) => (
  <div className={css.root}>
    <Header className={css.header} jobs={jobs} />
    <main className={css.main} {...props} />
    <Footer version={version} />
  </div>
);

Layout.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  version: PropTypes.string,
};

Layout.defaultProps = {
  jobs: null,
  version: null,
};

const JobsContext = React.createContext({ jobs: [] });
const JobsProvider = ({ jobs, ...restProps }) => {
  const value = useMemo(() => ({ jobs }), [jobs]);
  return <JobsContext.Provider value={value} {...restProps} />;
};

JobsProvider.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};

const OverviewContent = () => {
  const { jobs } = useContext(JobsContext);

  const insightsByName = useMemo(() => {
    const webpackInsights = jobs?.[0]?.insights?.webpack;

    if (!webpackInsights) {
      return null
    }

    const res = {
      ...(webpackInsights.duplicatePackagesV3 && { duplicatePackages: webpackInsights.duplicatePackagesV3 }),
      ...(webpackInsights.newPackages && { newPackages: webpackInsights.newPackages }),
    };

    if (isEmpty(res)) {
      return null;
    }

    return res;
  }, [jobs]);


  return (
    <Stack space="medium">
      {insightsByName && (
        <Container>
          <Stack space="xsmall">
            <MetricsTableTitle title="Insights" />
            <Box padding="small" outline>
              <Insights insights={insightsByName} />
            </Box>
          </Stack>
        </Container>
      )}
      <Container>
        <Stack space="small">
          <TotalSizeTypeTitle />
          <BundleAssetsTotalsChartBars jobs={jobs} />
          <BundleAssetsTotalsTable jobs={jobs} outline />
        </Stack>
      </Container>
    </Stack>
  );
};

const AssetsContent = () => {
  const [bundleStatsState, bundleStatsSetState] = useComponentQueryState(COMPONENT.BUNDLE_ASSETS);
  const { jobs } = useContext(JobsContext);

  return (
    <Container>
      <Stack space="medium">
        <Summary
          keys={METRICS_WEBPACK_ASSETS}
          data={jobs?.[0]?.summary}
          showSummaryItemDelta={jobs?.length !== 1}
          showSummaryItemBaseline={jobs?.length !== 1}
        />
        <Box outline>
          <BundleAssets jobs={jobs} setState={bundleStatsSetState} {...bundleStatsState} />
        </Box>
      </Stack>
    </Container>
  );
};

const ModulesContent = () => {
  const [bundleModulesState, bundleModulesSetState] = useComponentQueryState(
    COMPONENT.BUNDLE_MODULES,
  );
  const { jobs } = useContext(JobsContext);

  return (
    <Container>
      <Stack space="medium">
        <Summary
          keys={METRICS_WEBPACK_MODULES}
          data={jobs?.[0]?.summary}
          showSummaryItemDelta={jobs?.length !== 1}
          showSummaryItemBaseline={jobs?.length !== 1}
        />
        <Box outline>
          <BundleModules jobs={jobs} setState={bundleModulesSetState} {...bundleModulesState} />
        </Box>
      </Stack>
    </Container>
  );
};

const PackagesContent = () => {
  const [bundlePackagesState, bundlePackagesSetState] = useComponentQueryState(
    COMPONENT.BUNDLE_PACKAGES,
  );
  const { jobs } = useContext(JobsContext);

  return (
    <Container>
      <Stack space="medium">
        <Summary
          keys={METRICS_WEBPACK_PACKAGES}
          data={jobs?.[0]?.summary}
          showSummaryItemDelta={jobs?.length !== 1}
          showSummaryItemBaseline={jobs?.length !== 1}
        />
        <Box outline>
          <BundlePackages jobs={jobs} {...bundlePackagesState} setState={bundlePackagesSetState} />
        </Box>
      </Stack>
    </Container>
  );
};

const AppComponent = ({ version, jobs }) => {
  if (jobs?.length === 0) {
    return (
      <Layout version={version}>
        <Container>
          <div className={css.empty}>{I18N.NO_DATA}</div>
        </Container>
      </Layout>
    );
  }

  return (
    <JobsProvider jobs={jobs}>
      <Layout jobs={jobs} version={version}>
        <Container className={css.summaryContainer}>
          <Summary
            size="large"
            keys={METRICS_WEBPACK_GENERAL}
            data={jobs[0].summary}
            showSummaryItemDelta={jobs.length !== 1}
            showSummaryItemBaseline={jobs?.length !== 1}
          />
        </Container>

        <Container className={css.tabsContainer}>
          <Tabs className={css.tabs}>
            <Tabs.Item as={NavLink} exact to={URLS.OVERVIEW} activeClassName={css.tabActive}>
              {I18N.OVERVIEW}
            </Tabs.Item>
            <Tabs.Item as={NavLink} exact to={URLS.ASSETS} activeClassName={css.tabActive}>
              {I18N.ASSETS}
            </Tabs.Item>
            <Tabs.Item as={NavLink} exact to={URLS.MODULES} activeClassName={css.tabActive}>
              {I18N.MODULES}
            </Tabs.Item>
            <Tabs.Item as={NavLink} exact to={URLS.PACKAGES} activeClassName={css.tabActive}>
              {I18N.PACKAGES}
            </Tabs.Item>
          </Tabs>
        </Container>

        <div className={css.tabsContent}>
          <Switch>
            <Route exact path={URLS.ASSETS} component={AssetsContent} />
            <Route exact path={URLS.MODULES} component={ModulesContent} />
            <Route exact path={URLS.PACKAGES} component={PackagesContent} />
            <Route exact path={URLS.OVERVIEW} component={OverviewContent} />
          </Switch>
        </div>
      </Layout>
    </JobsProvider>
  );
};

AppComponent.defaultProps = {
  jobs: [],
  version: null,
};

AppComponent.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      insights: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      summary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  ),
  version: PropTypes.string,
};

export const App = (props) => (
  <HashRouter>
    <ScrollToTop />
    <QueryStateProvider>
      <AppComponent {...props} />
    </QueryStateProvider>
  </HashRouter>
);

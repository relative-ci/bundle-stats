import React, { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { HashRouter, NavLink, Route, Switch, useLocation } from 'react-router-dom';
import { COMPONENT } from '@bundle-stats/utils';

import { URLS } from '../constants';
import { BundleAssets } from '../components/bundle-assets';
import { BundleAssetsTotals } from '../components/bundle-assets-totals';
import { BundleModules } from '../components/bundle-modules';
import { BundlePackages } from '../components/bundle-packages';
import { Insights } from '../components/insights';
import { MetricsTableTitle } from '../components';
import { Summary } from '../components/summary';
import { Box } from '../layout/box';
import { Footer } from '../layout/footer';
import { Stack } from '../layout/stack';
import { Container } from '../ui/container';
import { Tabs } from '../ui/tabs';
import { QueryStateProvider, useComponentQueryState } from '../query-state';
import I18N from '../i18n';
import { Header } from './header';
import css from './app.module.css';

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
      return null;
    }

    const res = {
      ...(webpackInsights.duplicatePackagesV3 && {
        duplicatePackages: webpackInsights.duplicatePackagesV3,
      }),
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
        <BundleAssetsTotals jobs={jobs} />
      </Container>
    </Stack>
  );
};

const AssetsRoute = () => {
  const [queryState, setQueryState] = useComponentQueryState(COMPONENT.BUNDLE_ASSETS);
  const { jobs } = useContext(JobsContext);

  return (
    <Container>
      <BundleAssets jobs={jobs} setState={setQueryState} {...queryState} />
    </Container>
  );
};

const ModulesRoute = () => {
  const [queryState, setQueryState] = useComponentQueryState(COMPONENT.BUNDLE_MODULES);
  const { jobs } = useContext(JobsContext);

  return (
    <Container>
      <BundleModules jobs={jobs} setState={setQueryState} {...queryState} />
    </Container>
  );
};

const PackagesRoute = () => {
  const [queryState, setQueryState] = useComponentQueryState(COMPONENT.BUNDLE_PACKAGES);
  const { jobs } = useContext(JobsContext);

  return (
    <Container>
      <BundlePackages jobs={jobs} setState={setQueryState} {...queryState} />
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
            <Route exact path={URLS.ASSETS} component={AssetsRoute} />
            <Route exact path={URLS.MODULES} component={ModulesRoute} />
            <Route exact path={URLS.PACKAGES} component={PackagesRoute} />
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

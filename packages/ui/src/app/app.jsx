import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
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
import { DuplicatePackagesWarning } from '../components/duplicate-packages-warning';
import { BudgetInsights } from '../components/budget-insights';
import { Summary } from '../components/summary';
import { BundleAssets } from '../components/bundle-assets';
import { BundleAssetsTotalsChartBars } from '../components/bundle-assets-totals-chart-bars';
import { Tabs } from '../ui/tabs';
import { Footer } from '../layout/footer';
import { Stack } from '../layout/stack';
import { BundleAssetsTotalsTable } from '../components/bundle-assets-totals-table';
import { BundleModules } from '../components/bundle-modules';
import { BundlePackages } from '../components/bundle-packages';
import { TotalSizeTypeTitle } from '../components/total-size-type-title';
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
  jobs: PropTypes.arrayOf(PropTypes.object),
  version: PropTypes.string,
};

Layout.defaultProps = {
  jobs: null,
  version: null,
};

const AppComponent = ({ version, jobs }) => {
  const [bundleStatsState, bundleStatsSetState] = useComponentQueryState(COMPONENT.BUNDLE_ASSETS);
  const [bundlePackagesState, bundlePackagesSetState] = useComponentQueryState(
    COMPONENT.BUNDLE_PACKAGES,
  );
  const [bundleModulesState, bundleModulesSetState] = useComponentQueryState(
    COMPONENT.BUNDLE_MODULES,
  );

  if (jobs.length === 0) {
    return (
      <Layout version={version}>
        <Container>
          <div className={css.empty}>{I18N.NO_DATA}</div>
        </Container>
      </Layout>
    );
  }

  const { summary, insights } = useMemo(() => jobs[0], jobs);

  const { duplicatePackagesCount } = summary.webpack;
  const duplicatePackagesInsights = Boolean(
    duplicatePackagesCount.current || duplicatePackagesCount.baseline,
  );

  return (
    <Layout jobs={jobs} version={version}>
      <Container className={css.summaryContainer}>
        <Summary
          size="large"
          keys={METRICS_WEBPACK_GENERAL}
          data={summary}
          budgets={insights?.webpack?.budgets}
          showSummaryItemDelta={jobs.length !== 1}
        />
      </Container>

      <Container className={css.tabsContainer}>
        <Tabs className={css.tabs}>
          <NavLink exact to={URLS.OVERVIEW} activeClassName={css.tabActive}>
            {I18N.OVERVIEW}
          </NavLink>
          <NavLink exact to={URLS.ASSETS} activeClassName={css.tabActive}>
            {I18N.ASSETS}
          </NavLink>
          <NavLink exact to={URLS.MODULES} activeClassName={css.tabActive}>
            {I18N.MODULES}
          </NavLink>
          <NavLink exact to={URLS.PACKAGES} activeClassName={css.tabActive}>
            {I18N.PACKAGES}
          </NavLink>
        </Tabs>
      </Container>

      <div className={css.tabsContent}>
        <Switch>
          <Route
            exact
            path={URLS.ASSETS}
            render={({ location }) => (
              <Container>
                <Stack space="medium">
                  <Summary
                    keys={METRICS_WEBPACK_ASSETS}
                    data={summary}
                    budgets={insights?.webpack?.budgets}
                    showSummaryItemDelta={jobs.length !== 1}
                  />
                  <Box outline>
                    <BundleAssets
                      jobs={jobs}
                      setState={bundleStatsSetState}
                      {...bundleStatsState}
                      key={`${location.pathname}_${location.search}`}
                    />
                  </Box>
                </Stack>
              </Container>
            )}
          />
          <Route
            exact
            path={URLS.MODULES}
            render={() => (
              <Container>
                <Stack space="medium">
                  <Summary
                    keys={METRICS_WEBPACK_MODULES}
                    data={summary}
                    budgets={insights?.webpack?.budgets}
                    showSummaryItemDelta={jobs.length !== 1}
                  />
                  <Box outline>
                    <BundleModules
                      jobs={jobs}
                      setState={bundleModulesSetState}
                      {...bundleModulesState}
                    />
                  </Box>
                </Stack>
              </Container>
            )}
          />
          <Route
            exact
            path={URLS.PACKAGES}
            render={({ location }) => (
              <Container>
                <Stack space="medium">
                  <Summary
                    keys={METRICS_WEBPACK_PACKAGES}
                    data={summary}
                    budgets={insights?.webpack?.budgets}
                    showSummaryItemDelta={jobs.length !== 1}
                  />
                  <Box outline>
                    <BundlePackages
                      jobs={jobs}
                      {...bundlePackagesState}
                      setState={bundlePackagesSetState}
                      key={`${location.pathname}_${location.search}`}
                    />
                  </Box>
                </Stack>
              </Container>
            )}
          />
          <Route
            exact
            path={URLS.OVERVIEW}
            render={() => (
              <Stack space="large">
                {duplicatePackagesInsights && (
                  <Container>
                    <DuplicatePackagesWarning
                      duplicatePackagesCount={duplicatePackagesCount}
                      showDelta={jobs.length > 1}
                    />
                  </Container>
                )}
                {insights?.webpack?.budgets && (
                  <Container>
                    <BudgetInsights source="webpack" budgets={insights.webpack.budgets} />
                  </Container>
                )}
                <Container>
                  <Stack space="small">
                    <TotalSizeTypeTitle />
                    <BundleAssetsTotalsChartBars jobs={jobs} />
                    <Box outline>
                      <BundleAssetsTotalsTable jobs={jobs} />
                    </Box>
                  </Stack>
                </Container>
              </Stack>
            )}
          />
        </Switch>
      </div>
    </Layout>
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

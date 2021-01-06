import PropTypes from 'prop-types';
import {
  HashRouter, Switch, Route, NavLink,
} from 'react-router-dom';
import cx from 'classnames';
import { SECTIONS } from '@bundle-stats/ui/lib-esm/constants';
import { Box } from '@bundle-stats/ui/lib-esm/layout/box';
import { Container } from '@bundle-stats/ui/lib-esm/ui/container';
import { DuplicatePackagesWarning } from '@bundle-stats/ui/lib-esm/components/duplicate-packages-warning';
import { Summary } from '@bundle-stats/ui/lib-esm/components/summary';
import { BundleAssets } from '@bundle-stats/ui/lib-esm/components/bundle-assets';
import { BundleAssetsTotalsChartBars } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-chart-bars';
import { Tabs } from '@bundle-stats/ui/lib-esm/ui/tabs';
import { Footer } from '@bundle-stats/ui/lib-esm/layout/footer';
import { Stack } from '@bundle-stats/ui/lib-esm/layout/stack';
import { BundleAssetsTotalsTable } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-table';
import { BundleModules } from '@bundle-stats/ui/lib-esm/components/bundle-modules';
import { BundlePackages } from '@bundle-stats/ui/lib-esm/components/bundle-packages';

import I18N from '../i18n';
import { Header } from './header';
import { SECTION_URLS, URLS } from './app.constants';
import css from './app.module.css';

const Layout = ({ jobs, ...props }) => (
  <div className={css.root}>
    <Header className={css.header} jobs={jobs} />
    <main className={css.main} {...props} />
    <Footer source="bundle-stats">
      <p className={css.footerInfo}>
        <a href={`https://github.com/relative-ci/bundle-stats/releases/tag/v${__VERSION__}`}>
          {`${I18N.VERSION}: ${__VERSION__}`}
        </a>
      </p>
    </Footer>
  </div>
);

Layout.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
};

Layout.defaultProps = {
  jobs: null,
};

const SummaryItemWrapper = ({ keyProps, className, ...props }) => {
  const { section } = keyProps;
  const href = SECTION_URLS[section];
  return <Link to={href} className={cx(className, css.summaryItemLink)} {...props} />;
};

SummaryItemWrapper.propTypes = {
  keyProps: PropTypes.shape({
    section: PropTypes.oneOf(Object.values(SECTIONS)),
  }).isRequired,
  className: PropTypes.string,
};

SummaryItemWrapper.defaultProps = {
  className: '',
};

export const App = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <Layout>
        <Container>
          <div className={css.empty}>{I18N.NO_DATA}</div>
        </Container>
      </Layout>
    );
  }

  const insights = jobs && jobs[0] && jobs[0].insights;
  const duplicatePackagesInsights = insights?.webpack?.duplicatePackages;

  return (
    <HashRouter>
      <Layout jobs={jobs}>
        <Container className={css.summaryContainer}>
          <Summary
            data={jobs[0].summary}
            showSummaryItemDelta={jobs.length !== 1}
            showSummaryItemBaselineValue={jobs.length !== 1}
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
              component={() => (
                <Container>
                  <Box outline>
                    <BundleAssets jobs={jobs} />
                  </Box>
                </Container>
              )}
            />
            <Route
              exact
              path={URLS.MODULES}
              component={() => (
                <Container>
                  <BundleModules jobs={jobs} />
                </Container>
              )}
            />
            <Route
              exact
              path={URLS.PACKAGES}
              component={() => (
                <Container>
                  <Box outline>
                    <BundlePackages jobs={jobs} />
                  </Box>
                </Container>
              )}
            />
            <Route
              exact
              path={URLS.OVERVIEW}
              component={() => (
                <Stack space="large">
                  {duplicatePackagesInsights && (
                    <Container>
                      <DuplicatePackagesWarning
                        duplicatePackages={duplicatePackagesInsights.data}
                      />
                    </Container>
                  )}

                  <Container>
                    <BundleAssetsTotalsChartBars jobs={jobs} />
                  </Container>

                  <Container>
                    <h2>Totals</h2>
                    <Box outline>
                      <BundleAssetsTotalsTable jobs={jobs} />
                    </Box>
                  </Container>
                </Stack>
              )}
            />
          </Switch>
        </div>
      </Layout>
    </HashRouter>
  );
};

App.defaultProps = {
  jobs: [],
};

App.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      insights: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      summary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  ),
};

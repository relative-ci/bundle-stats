import PropTypes from 'prop-types';
import {
  HashRouter, Switch, Route, NavLink,
} from 'react-router-dom';
import { Box } from '@bundle-stats/ui/lib-esm/layout/box';
import { Container } from '@bundle-stats/ui/lib-esm/ui/container';
import { JobsHeader } from '@bundle-stats/ui/lib-esm/components/jobs-header';
import { DuplicatePackagesWarning } from '@bundle-stats/ui/lib-esm/components/duplicate-packages-warning';
import { Summary } from '@bundle-stats/ui/lib-esm/components/summary';
import { BundleAssets } from '@bundle-stats/ui/lib-esm/components/bundle-assets';
import { BundleAssetsTotalsChartBars } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-chart-bars';
import { Logo } from '@bundle-stats/ui/lib-esm/ui/logo';
import { Tabs } from '@bundle-stats/ui/lib-esm/ui/tabs';
import { Footer } from '@bundle-stats/ui/lib-esm/layout/footer';
import { Stack } from '@bundle-stats/ui/lib-esm/layout/stack';
import { BundleAssetsTotalsTable } from '@bundle-stats/ui/lib-esm/components/bundle-assets-totals-table';
import { BundleModules } from '@bundle-stats/ui/lib-esm/components/bundle-modules';
import { BundlePackages } from '@bundle-stats/ui/lib-esm/components/bundle-packages';

import I18N from '../i18n';
import { URLS } from './constants';
import css from './styles.module.css';

const StandaloneAppLayout = (props) => (
  <div className={css.root}>
    <Stack className={css.main} space="large" {...props} />
    <Footer source="bundle-stats">
      <p className={css.footerInfo}>
        <a href={`https://github.com/relative-ci/bundle-stats/releases/tag/v${__VERSION__}`}>
          {`${I18N.VERSION}: ${__VERSION__}`}
        </a>
      </p>
    </Footer>
  </div>
);

const StandaloneApp = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <StandaloneAppLayout>
        <Container>
          <div className={css.empty}>{I18N.NO_DATA}</div>
        </Container>
      </StandaloneAppLayout>
    );
  }

  const insights = jobs && jobs[0] && jobs[0].insights;
  const duplicatePackagesInsights = insights?.webpack?.duplicatePackages;

  return (
    <HashRouter>
      <StandaloneAppLayout>
        <header className={css.header}>
          <a className={css.headerBranding} href="https://github.com/relative-ci/bundle-stats">
            <Logo className={css.headerBrandingLogo}>BundleStats</Logo>
          </a>
          <JobsHeader className={css.headerJobs} jobs={jobs} />
          <div className={css.headerTools}>
            <Logo
              className={css.headerToolsGithub}
              kind="github"
              as="a"
              href="https://github.com/relative-ci/bundle-stats"
              target="_blank"
              rel="noopener noreferrer nofollow"
            />
          </div>
        </header>

        <Container>
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
                    <DuplicatePackagesWarning duplicatePackages={duplicatePackagesInsights.data} />
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
      </StandaloneAppLayout>
    </HashRouter>
  );
};

StandaloneApp.defaultProps = {
  jobs: [],
};

StandaloneApp.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      insights: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      summary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  ),
};

export default StandaloneApp;

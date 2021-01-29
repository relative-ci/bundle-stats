import React from 'react';
import PropTypes from 'prop-types';
import { Link, HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import cx from 'classnames';
import { get } from 'lodash';

import { ASSETS_SIZES_FILE_TYPE_MAP, COMPONENT, SECTIONS } from '../constants';
import { Box } from '../layout/box';
import { Container } from '../ui/container';
import { DuplicatePackagesWarning } from '../components/duplicate-packages-warning';
import { Summary } from '../components/summary';
import { BundleAssets } from '../components/bundle-assets';
import { BundleAssetsTotalsChartBars } from '../components/bundle-assets-totals-chart-bars';
import { Tabs } from '../ui/tabs';
import { Footer } from '../layout/footer';
import { Stack } from '../layout/stack';
import { BundleAssetsTotalsTable } from '../components/bundle-assets-totals-table';
import { BundleModules } from '../components/bundle-modules';
import { BundlePackages } from '../components/bundle-packages';

import I18N from '../i18n';
import { Header } from './header';
import { SECTION_URLS, URLS } from './app.constants';
import css from './app.module.css';
import {getBundleAssetsFileTypeComponentLink} from '../component-links';

const Layout = ({ jobs, footer, ...props }) => (
  <div className={css.root}>
    <Header className={css.header} jobs={jobs} />
    <main className={css.main} {...props} />
    <Footer source="bundle-stats">{footer}</Footer>
  </div>
);

Layout.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
  footer: PropTypes.node,
};

Layout.defaultProps = {
  jobs: null,
  footer: null,
};

const SummaryItemWrapper = ({ keyProps, className, ...props }) => {
  const { link } = keyProps;

  if (!link) {
    return null;
  }

  const location = {
    pathname: SECTION_URLS[link.section],
    state: link.params,
  };

  return (
    <Link
      className={cx(className, css.summaryItemLink)}
      to={location}
      title={link.title}
      {...props}
    />
  );
};

SummaryItemWrapper.propTypes = {
  keyProps: PropTypes.shape({
    link: PropTypes.shape({
      section: PropTypes.oneOf(Object.values(SECTIONS)),
      title: PropTypes.string,
      params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  }).isRequired,
  className: PropTypes.string,
};

SummaryItemWrapper.defaultProps = {
  className: '',
};

export const App = ({ footer, jobs }) => {
  if (jobs.length === 0) {
    return (
      <Layout footer={footer}>
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
      <Layout jobs={jobs} footer={footer}>
        <Container className={css.summaryContainer}>
          <Summary
            data={jobs[0].summary}
            showSummaryItemDelta={jobs.length !== 1}
            showSummaryItemBaselineValue={jobs.length !== 1}
            SummaryItemWrapper={SummaryItemWrapper}
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
              component={({ location }) => (
                <Container>
                  <Box outline>
                    <BundleAssets
                      jobs={jobs}
                      filters={get(location, ['state', COMPONENT.BUNDLE_ASSETS, 'filters'])}
                    />
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
              component={({ location }) => (
                <Container>
                  <Box outline>
                    <BundlePackages
                      jobs={jobs}
                      filters={get(location, ['state', COMPONENT.BUNDLE_PACKAGES, 'filters'])}
                    />
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
                      <BundleAssetsTotalsTable
                        jobs={jobs}
                        renderRowHeader={(item) => {
                          const fileType = ASSETS_SIZES_FILE_TYPE_MAP[item.key];
                          const componentLinkData = getBundleAssetsFileTypeComponentLink(
                            fileType,
                            item.label
                          );
                          const newLocation = {
                            pathname: SECTION_URLS[componentLinkData.section],
                            state: componentLinkData.params
                          };
                          return (
                            <Link to={newLocation} title={componentLinkData.title}>
                              {item.label}
                            </Link>
                          );
                        }}
                      />
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
  footer: null,
};

App.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
      insights: PropTypes.object, // eslint-disable-line react/forbid-prop-types
      summary: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    }),
  ),
  footer: PropTypes.node,
};

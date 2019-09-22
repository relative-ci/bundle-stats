import Router from 'preact-router';
import Match from 'preact-router/match';
import PropTypes from 'prop-types';
import { isEmpty, last } from 'lodash';
import { Container, Summary, Tabs } from '@bundle-stats/ui';
import { createStatsSummary } from '@bundle-stats/utils';

import Helmet from '../../components/helmet';
import Sources from '../../components/sources';
import * as URLS from '../../utils/urls';
import Totals from './totals';
import Assets from './assets';
import Modules from './modules';
import Packages from './packages';
import config from './config.json';
import locale from './locale.json';
import enhance from './container';
import css from './styles.css';

const getSummaryData = (jobs) => {
  if (jobs.length <= 2) {
    return jobs[0].summary;
  }

  return createStatsSummary(last(jobs).stats, jobs[0].stats);
};

const Webpack = (props) => {
  const {
    sources,
    addSource,
    removeSource,
    runs,
    jobs,
  } = props;

  return (
    <div>
      <Helmet
        title={locale.title}
        description={locale.description}
      />

      <Sources
        sources={sources}
        runs={runs}
        exampleUrls={config.exampleUrls}
        exampleText={locale.loadExample}
        addPlaceholder={locale.addPlaceholder}
        addSource={addSource}
        removeSource={removeSource}
      />

      {!isEmpty(jobs) && (
        <div>
          <Container>
            <Summary data={getSummaryData(jobs)} />
          </Container>
          <Container className={css.tabs}>
            <Match>
              {({ path }) => (
                <Tabs>
                  <a
                    href={URLS.getWebpackUrl(URLS.WEBPACK_TOTALS_SLUG)}
                    isTabActive={path === URLS.getWebpackPath(URLS.WEBPACK_TOTALS_SLUG)}
                  >
                    {locale.totals}
                  </a>
                  <a
                    href={URLS.getWebpackUrl(URLS.WEBPACK_ASSETS_SLUG)}
                    isTabActive={path === URLS.getWebpackPath(URLS.WEBPACK_ASSETS_SLUG)}
                  >
                    {locale.assets}
                  </a>
                  <a
                    href={URLS.getWebpackUrl(URLS.WEBPACK_MODULES_SLUG)}
                    isTabActive={path === URLS.getWebpackPath(URLS.WEBPACK_MODULES_SLUG)}
                  >
                    {locale.modules}
                  </a>
                  <a
                    href={URLS.getWebpackUrl(URLS.WEBPACK_PACKAGES_SLUG)}
                    isTabActive={path === URLS.getWebpackPath(URLS.WEBPACK_PACKAGES_SLUG)}
                  >
                    {locale.packages}
                  </a>
                </Tabs>
              )}
            </Match>
          </Container>
          <Router>
            <Totals jobs={jobs} path={URLS.getWebpackPath(URLS.WEBPACK_TOTALS_SLUG)} />
            <Assets jobs={jobs} path={URLS.getWebpackPath(URLS.WEBPACK_ASSETS_SLUG)} />
            <Modules jobs={jobs} path={URLS.getWebpackPath(URLS.WEBPACK_MODULES_SLUG)} />
            <Packages jobs={jobs} path={URLS.getWebpackPath(URLS.WEBPACK_PACKAGES_SLUG)} />
          </Router>
        </div>
      )}
    </div>
  );
};

Webpack.defaultProps = {
  sources: [],
  runs: [],
  jobs: [],
};

Webpack.propTypes = {
  sources: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  addSource: PropTypes.func.isRequired,
  removeSource: PropTypes.func.isRequired,
  runs: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
    rawData: PropTypes.shape({
      webpack: PropTypes.shape({
        assets: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          size: PropTypes.number,
        })),
      }),
    }),
  })),
};

export default enhance(Webpack);

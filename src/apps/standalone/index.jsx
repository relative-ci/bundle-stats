import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Box } from '@relative-ci/ui/lib-esm/ui/box';
import { Logo } from '@relative-ci/ui/lib-esm/ui/logo';
import { Container } from '@relative-ci/ui/lib-esm/ui/container';
import { Summary } from '@relative-ci/ui/lib-esm/components/summary';
import { BundleAssets } from '@relative-ci/ui/lib-esm/components/bundle-assets';
import { Footer } from '@relative-ci/ui/lib-esm/layout/footer';
import { BundleAssetsTotalsTable } from '@relative-ci/ui/lib-esm/components/bundle-assets-totals-table';
import { BundleModules } from '@relative-ci/ui/lib-esm/components/bundle-modules';

import css from './styles.css';

const Header = () => (
  <div className={css.header}>
    <Logo
      className={css.headerWebpackLogo}
      kind="webpack"
      as="a"
      href="http://webpack.org.js"
      target="_blank"
      rel="noopener noreferrer nofollow"
    />
    <h1 className={css.headerTitle}>
      Bundle Stats
    </h1>
    <Logo
      className={css.headerGithubLogo}
      kind="github"
      as="a"
      href="https://github.com/relative-ci/webpack-bundle-stats"
      target="_blank"
      rel="noopener noreferrer nofollow"
    />
  </div>
);

const StandaloneApp = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className={css.root}>
        <Header />
        <div className={css.main}>
          <Container>
            <div className={css.empty}>
              No data available.
            </div>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className={css.root}>
      <Header />
      <div className={css.main}>
        <Container>
          <Summary data={jobs[0].summary} />
        </Container>
        <Container>
          <Box>
            <h2>Totals</h2>
            <BundleAssetsTotalsTable jobs={jobs} />
          </Box>
        </Container>
        <Container>
          <Box>
            <h2>Assets</h2>
            <BundleAssets jobs={jobs} />
          </Box>
        </Container>
        <Container>
          <h2>Modules</h2>
          <BundleModules
            currentRawData={get(jobs, '[0].rawData')}
            baselineRawData={get(jobs, '[1].rawData')}
            job={jobs[0]}
          />
        </Container>
      </div>
      <Footer className={css.footer} />
    </div>
  );
};

StandaloneApp.defaultProps = {
  jobs: [],
};

StandaloneApp.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })),
};

export default StandaloneApp;

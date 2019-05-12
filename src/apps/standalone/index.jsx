import PropTypes from 'prop-types';
import {
  Container, Summary, BundleAssets, BundleAssetsTotalsTable, BundleModules,
} from '@relative-ci/ui';

import css from './styles.css';

const Header = () => (
  <Container className={css.header}>
    <h1 className={css.title}>
      Webpack bundle stats
    </h1>
  </Container>
);

const StandaloneApp = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div>
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
    <div>
      <Header />
      <div className={css.main}>
        <Container>
          <Summary data={jobs[0].summary} />
        </Container>
        <Container>
          <h2>Totals</h2>
          <BundleAssetsTotalsTable jobs={jobs} />
        </Container>
        <Container>
          <h2>Assets</h2>
          <BundleAssets jobs={jobs} />
        </Container>
        <Container>
          <h2>Modules</h2>
          <BundleModules jobs={jobs} />
        </Container>
      </div>
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

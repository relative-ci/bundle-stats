import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Container } from '@relative-ci/ui/lib-esm/ui/container';
import { Summary } from '@relative-ci/ui/lib-esm/components/summary';
import { BundleAssets } from '@relative-ci/ui/lib-esm/components/bundle-assets';
import { BundleAssetsTotalsTable } from '@relative-ci/ui/lib-esm/components/bundle-assets-totals-table';
import { BundleModules } from '@relative-ci/ui/lib-esm/components/bundle-modules';

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
          <BundleModules
            currentRawData={get(jobs, '[0].rawData')}
            baselineRawData={get(jobs, '[1].rawData')}
            job={jobs[0]}
          />
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

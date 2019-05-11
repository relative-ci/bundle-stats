import PropTypes from 'prop-types';
import {
  Container, Summary, BundleAssets, BundleAssetsTotalsTable, BundleModules,
} from '@relative-ci/ui';

const StandaloneApp = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <Container>
        <p>No data available.</p>
      </Container>
    );
  }

  return (
    <div>
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
